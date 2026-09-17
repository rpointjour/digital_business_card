import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Animated,
  LayoutAnimation,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import * as Haptics from 'expo-haptics'
import * as Contacts from 'expo-contacts/legacy'
import { Asset } from 'expo-asset'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { useCallback, useEffect, useRef, useState } from 'react'
import { profile, socialLinks, skills } from '@rjp/shared'
import type { Skill } from '@rjp/shared'

const profilePhoto = require('../../assets/profile.jpg')

const BG = '#08080a'
const ACCENT = '#c9960c'
const MUTED = 'rgba(255,255,255,0.45)'
const CARD_BG = 'rgba(255,255,255,0.05)'
const BORDER = 'rgba(255,255,255,0.08)'

const CHAT_API_URL = Constants.expoConfig?.extra?.chatApiUrl as string | undefined
const GITHUB_URL = CHAT_API_URL ? `${CHAT_API_URL}/github` : undefined

type GithubEvent = {
  id: string
  type: string
  repoName: string
  createdAt: string
  detail: string
}

type GithubRepo = {
  name: string
  htmlUrl: string
  description: string | null
  language: string | null
  stars: number
  pushedAt: string
}

const EVENT_ICONS: Record<string, IconName> = {
  PushEvent: 'arrow-up-circle-outline',
  CreateEvent: 'add-circle-outline',
  PullRequestEvent: 'git-pull-request-outline',
  IssuesEvent: 'alert-circle-outline',
  WatchEvent: 'star-outline',
  ForkEvent: 'git-branch-outline',
  PublicEvent: 'globe-outline',
}

type IconName = React.ComponentProps<typeof Ionicons>['name']

function eventLabel(event: GithubEvent): string {
  const repo = event.repoName.split('/')[1] ?? event.repoName
  switch (event.type) {
    case 'PushEvent':
      return `Pushed to ${repo}`
    case 'CreateEvent':
      return `${event.detail[0].toUpperCase()}${event.detail.slice(1)} in ${repo}`
    case 'PullRequestEvent':
      return `${event.detail[0].toUpperCase()}${event.detail.slice(1)} in ${repo}`
    case 'IssuesEvent':
      return `${event.detail[0].toUpperCase()}${event.detail.slice(1)} in ${repo}`
    case 'WatchEvent':
      return `Starred ${repo}`
    case 'ForkEvent':
      return `Forked ${repo}`
    case 'PublicEvent':
      return `Made ${repo} public`
    default:
      return `${event.type.replace('Event', '')} in ${repo}`
  }
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function openLink(url: string) {
  WebBrowser.openBrowserAsync(url)
}

const STAT_DETAILS: Record<string, string> = {
  'Years Experience': 'Firmware, communication systems, and machine learning — from drone platforms to RFID applications.',
  'Focus': 'A growing focus on machine learning, layered on a foundation of embedded software engineering.',
  'Domains': 'From low-level embedded C to polished mobile and web apps — the full stack of bringing ideas to life.',
}

type QuickAccessTile = {
  label: string
  icon: IconName
  route: '/chat' | '/projects'
  params?: Record<string, string>
}

const QUICK_ACCESS_TILES: QuickAccessTile[] = [
  { label: 'ChatRJP', icon: 'chatbubble-outline', route: '/chat' },
  { label: 'Projects', icon: 'briefcase-outline', route: '/projects', params: { scrollTo: 'top' } },
  { label: 'Feedback', icon: 'chatbubbles-outline', route: '/projects', params: { scrollTo: 'feedback' } },
]

function StatCard({ label, value }: { label: string; value: string }) {
  const [expanded, setExpanded] = useState(false)

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded((e) => !e)
  }

  return (
    <TouchableOpacity style={styles.statCard} onPress={toggle} activeOpacity={0.75}>
      <View style={styles.statCardHeader}>
        <Text style={styles.statValue}>{value}</Text>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={MUTED} />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      {expanded && STAT_DETAILS[label] && (
        <Text style={styles.statDetail}>{STAT_DETAILS[label]}</Text>
      )}
    </TouchableOpacity>
  )
}

function SkillChip({ skill }: { skill: Skill }) {
  const scale = useRef(new Animated.Value(1)).current

  function handlePress() {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.88, useNativeDriver: true, speed: 50, bounciness: 0 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 16, bounciness: 10 }),
    ]).start()
    if (skill.url) WebBrowser.openBrowserAsync(skill.url)
  }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity style={styles.skillChip} onPress={handlePress} activeOpacity={0.85}>
        <Text style={[styles.skillChipText, skill.color ? { color: skill.color } : undefined]}>
          {skill.name}
        </Text>
        {skill.url && <Text style={styles.skillChipArrow}> ↗</Text>}
      </TouchableOpacity>
    </Animated.View>
  )
}

function EventRow({ event }: { event: GithubEvent }) {
  return (
    <TouchableOpacity
      style={styles.eventRow}
      onPress={() => openLink(`https://github.com/${event.repoName}`)}
      activeOpacity={0.7}
    >
      <Ionicons name={EVENT_ICONS[event.type] ?? 'ellipse-outline'} size={18} color={ACCENT} />
      <View style={styles.eventText}>
        <Text style={styles.eventLabel} numberOfLines={2}>{eventLabel(event)}</Text>
        <Text style={styles.eventTime}>{timeAgo(event.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  )
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <TouchableOpacity
      style={styles.repoCard}
      onPress={() => openLink(repo.htmlUrl)}
      activeOpacity={0.75}
    >
      <Text style={styles.repoName}>{repo.name}</Text>
      {repo.description && (
        <Text style={styles.repoDescription} numberOfLines={2}>{repo.description}</Text>
      )}
      <View style={styles.repoMetaRow}>
        {repo.language && <Text style={styles.repoMeta}>● {repo.language}</Text>}
        <Text style={styles.repoMeta}>★ {repo.stars}</Text>
        <Text style={styles.repoMeta}>{timeAgo(repo.pushedAt)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  const router = useRouter()
  const [events, setEvents] = useState<GithubEvent[]>([])
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSaveContact() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    const { status } = await Contacts.requestPermissionsAsync()
    if (status !== 'granted') return

    const [firstName, ...rest] = profile.name.split(' ')
    try {
      const contactData: Contacts.Contact = {
        contactType: Contacts.ContactTypes.Person,
        name: profile.name,
        firstName,
        lastName: rest.join(' '),
        jobTitle: profile.roles[0],
        emails: [{ email: profile.email, label: 'work', id: '0' }],
        ...(Platform.OS === 'ios' ? {
          urlAddresses: [
            { url: profile.portfolioPdfUrl, label: 'Portfolio', id: '0' },
            ...socialLinks.map((link, i) => ({ url: link.url, label: link.name, id: String(i + 1) })),
          ],
          note: profile.summary,
        } : {}),
      }
      if (Platform.OS === 'ios') {
        const asset = await Asset.fromModule(profilePhoto).downloadAsync()
        if (asset.localUri) contactData.image = { uri: asset.localUri }
      }
      await Contacts.addContactAsync(contactData)
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      console.error('Save contact failed:', e)
    }
  }

  const fetchGithub = useCallback(async () => {
    if (!GITHUB_URL) return
    try {
      const res = await fetch(GITHUB_URL)
      const data = await res.json()
      setEvents(data.events ?? [])
      setRepos(data.repos ?? [])
    } catch {
      // Keep whatever's already showing.
    }
  }, [])

  useEffect(() => {
    fetchGithub().finally(() => setLoading(false))
  }, [fetchGithub])

  async function handleRefresh() {
    setRefreshing(true)
    await fetchGithub()
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={ACCENT} />
        }
      >
        <View style={styles.bioCard}>
          <Image source={profilePhoto} style={styles.photo} resizeMode="cover" />
          <View style={styles.bioText}>
            <Text style={styles.name}>{profile.name}</Text>
            <View style={styles.rolesRow}>
              {profile.roles.slice(0, 2).map((role) => (
                <View key={role} style={styles.roleChip}>
                  <Text style={styles.roleText}>{role}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.summary}>{profile.summary}</Text>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveContact} activeOpacity={0.75}>
              <Ionicons name={saved ? 'checkmark-circle' : 'person-add-outline'} size={14} color={ACCENT} />
              <Text style={styles.saveBtnText}>{saved ? 'Saved!' : 'Save to Contacts'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tilesRow}>
          {QUICK_ACCESS_TILES.map((tile) => (
            <TouchableOpacity
              key={tile.label}
              style={styles.tile}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                router.push(tile.params ? { pathname: tile.route, params: tile.params } : tile.route)
              }}
              activeOpacity={0.75}
            >
              <Ionicons name={tile.icon} size={24} color={ACCENT} />
              <Text style={styles.tileLabel}>{tile.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bar-chart-outline" size={16} color={ACCENT} />
            <Text style={styles.sectionHeading}>Stats</Text>
          </View>
          <View style={styles.statsRow}>
            {profile.stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash-outline" size={16} color={ACCENT} />
            <Text style={styles.sectionHeading}>Skills</Text>
          </View>
          <View style={styles.skillsGrid}>
            {skills.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
            ))}
          </View>
        </View>

        {loading && (
          <ActivityIndicator size="small" color={ACCENT} style={styles.loadingSpinner} />
        )}

        {repos.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="folder-outline" size={16} color={ACCENT} />
              <Text style={styles.sectionHeading}>Repositories</Text>
            </View>
            {repos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </View>
        )}

        {events.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="pulse-outline" size={16} color={ACCENT} />
              <Text style={styles.sectionHeading}>Recent Activity</Text>
            </View>
            <View style={styles.eventsCard}>
              {events.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  content: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40, maxWidth: 640, alignSelf: 'center', width: '100%' },
  bioCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 16,
  },
  photo: { width: 64, height: 64, borderRadius: 14 },
  bioText: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: '#ffffff', marginBottom: 6 },
  rolesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  roleChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  roleText: { fontSize: 10, color: ACCENT, fontWeight: '500' },
  summary: { fontSize: 12, color: MUTED, lineHeight: 17, marginBottom: 10 },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveBtnText: { fontSize: 11, color: ACCENT, fontWeight: '500' },
  tilesRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  tile: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    paddingVertical: 18,
  },
  tileLabel: { fontSize: 12, color: '#ffffff', fontWeight: '600' },
  statsRow: { gap: 10 },
  statCard: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
  },
  statCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statValue: { fontSize: 18, fontWeight: '700', color: ACCENT },
  statLabel: { fontSize: 12, color: MUTED, marginTop: 2 },
  statDetail: { fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 19, marginTop: 10 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skillChipText: { fontSize: 13, color: ACCENT, fontWeight: '500' },
  skillChipArrow: { fontSize: 12, color: ACCENT },
  loadingSpinner: { marginTop: 24 },
  section: { marginTop: 28 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionHeading: { fontSize: 13, color: ACCENT, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '600' },
  repoCard: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  repoName: { fontSize: 15, fontWeight: '600', color: '#ffffff', marginBottom: 4 },
  repoDescription: { fontSize: 13, color: MUTED, lineHeight: 19, marginBottom: 10 },
  repoMetaRow: { flexDirection: 'row', gap: 14 },
  repoMeta: { fontSize: 12, color: MUTED },
  eventsCard: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  eventText: { flex: 1 },
  eventLabel: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 19, marginBottom: 2 },
  eventTime: { fontSize: 11, color: MUTED },
})
