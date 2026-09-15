export interface Env {
  ANTHROPIC_API_KEY: string
  ADMIN_SECRET: string
  GITHUB_TOKEN: string
  RATE_LIMITER: RateLimit
  GUESTBOOK_RATE_LIMITER: RateLimit
  DB: D1Database
}

const MODEL = 'claude-haiku-4-5-20251001'
const MAX_TOKENS = 512
const MAX_MESSAGES = 30
const MAX_MESSAGE_CHARS = 2000
const MAX_SYSTEM_CHARS = 4000

const MAX_NAME_CHARS = 40
const MAX_COMMENT_CHARS = 300
const GUESTBOOK_PAGE_SIZE = 50

const GITHUB_USERNAME = 'rpointjour'
const GITHUB_CACHE_TTL = 600 // 10 minutes

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, x-admin-key',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...CORS_HEADERS },
  })
}

function clientIp(request: Request): string {
  return request.headers.get('cf-connecting-ip') ?? 'unknown'
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  const { success } = await env.RATE_LIMITER.limit({ key: clientIp(request) })
  if (!success) {
    return json({ error: 'Too many requests, slow down.' }, 429)
  }

  let payload: { system?: unknown; messages?: unknown }
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const { system, messages } = payload
  if (typeof system !== 'string' || system.length > MAX_SYSTEM_CHARS) {
    return json({ error: 'Invalid system prompt' }, 400)
  }
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return json({ error: 'Invalid messages' }, 400)
  }
  for (const m of messages) {
    if (
      typeof m !== 'object' || m === null ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      m.content.length > MAX_MESSAGE_CHARS
    ) {
      return json({ error: 'Invalid message shape' }, 400)
    }
  }

  // Model and token cap are enforced server-side, never taken from the client,
  // so a caller who finds this URL can't run up cost on a bigger model/response.
  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages,
    }),
  })

  if (!anthropicRes.ok) {
    const detail = await anthropicRes.text()
    return json({ error: 'Upstream error', detail }, 502)
  }

  const data = await anthropicRes.json()
  return json(data)
}

async function handleGuestbookList(env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    'SELECT id, name, message, created_at FROM comments ORDER BY created_at DESC LIMIT ?'
  )
    .bind(GUESTBOOK_PAGE_SIZE)
    .all()

  return json({ entries: results })
}

async function handleGuestbookPost(request: Request, env: Env): Promise<Response> {
  const { success } = await env.GUESTBOOK_RATE_LIMITER.limit({ key: clientIp(request) })
  if (!success) {
    return json({ error: 'Too many comments, slow down.' }, 429)
  }

  let payload: { name?: unknown; message?: unknown }
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const message = typeof payload.message === 'string' ? payload.message.trim() : ''

  if (!name || name.length > MAX_NAME_CHARS) {
    return json({ error: 'Invalid name' }, 400)
  }
  if (!message || message.length > MAX_COMMENT_CHARS) {
    return json({ error: 'Invalid message' }, 400)
  }

  const result = await env.DB.prepare(
    'INSERT INTO comments (name, message) VALUES (?, ?) RETURNING id, name, message, created_at'
  )
    .bind(name, message)
    .first()

  return json({ entry: result }, 201)
}

async function handleGuestbookDelete(request: Request, env: Env, id: string): Promise<Response> {
  if (request.headers.get('x-admin-key') !== env.ADMIN_SECRET) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const numericId = Number(id)
  if (!Number.isInteger(numericId)) {
    return json({ error: 'Invalid id' }, 400)
  }

  await env.DB.prepare('DELETE FROM comments WHERE id = ?').bind(numericId).run()
  return json({ ok: true })
}

type GithubEvent = {
  id: string
  type: string
  repo: { name: string }
  created_at: string
  payload?: {
    ref_type?: string
    action?: string
  }
}

type GithubRepo = {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
}

function eventDetail(event: GithubEvent): string {
  switch (event.type) {
    case 'PushEvent':
      return 'pushed'
    case 'CreateEvent':
      return `created ${event.payload?.ref_type ?? 'repository'}`
    case 'PullRequestEvent':
      return `${event.payload?.action ?? 'updated'} a pull request`
    case 'IssuesEvent':
      return `${event.payload?.action ?? 'updated'} an issue`
    case 'WatchEvent':
      return 'starred'
    case 'ForkEvent':
      return 'forked'
    case 'PublicEvent':
      return 'made public'
    default:
      return ''
  }
}

async function handleGithubFeed(request: Request, env: Env): Promise<Response> {
  const cache = caches.default
  const cacheKey = new Request(new URL('/github', request.url).toString(), request)

  const cached = await cache.match(cacheKey)
  if (cached) return cached

  const headers = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'rjp-port-chat-proxy',
  }

  const [eventsRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10&type=owner`, { headers }),
  ])

  if (!eventsRes.ok || !reposRes.ok) {
    return json({ error: 'Upstream error' }, 502)
  }

  const rawEvents = await eventsRes.json<GithubEvent[]>()
  const rawRepos = await reposRes.json<GithubRepo[]>()

  const events = rawEvents.map((e) => ({
    id: e.id,
    type: e.type,
    repoName: e.repo.name,
    createdAt: e.created_at,
    detail: eventDetail(e),
  }))

  const repos = rawRepos
    .filter((r) => !r.fork)
    .map((r) => ({
      name: r.name,
      htmlUrl: r.html_url,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }))

  const response = json({ events, repos })
  response.headers.set('Cache-Control', `public, max-age=${GITHUB_CACHE_TTL}`)

  await cache.put(cacheKey, response.clone())

  return response
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    const url = new URL(request.url)

    if (url.pathname === '/' || url.pathname === '') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
      return handleChat(request, env)
    }

    if (url.pathname === '/guestbook') {
      if (request.method === 'GET') return handleGuestbookList(env)
      if (request.method === 'POST') return handleGuestbookPost(request, env)
      return json({ error: 'Method not allowed' }, 405)
    }

    if (url.pathname === '/github') {
      if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405)
      return handleGithubFeed(request, env)
    }

    const deleteMatch = url.pathname.match(/^\/guestbook\/(\d+)$/)
    if (deleteMatch) {
      if (request.method !== 'DELETE') return json({ error: 'Method not allowed' }, 405)
      return handleGuestbookDelete(request, env, deleteMatch[1])
    }

    return json({ error: 'Not found' }, 404)
  },
}
