import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, useLocalSearchParams } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '@rjp/shared'
import type { Project } from '@rjp/shared'

const BG = '#08080a'
const ACCENT = '#c9960c'
const MUTED = 'rgba(255,255,255,0.45)'
const CARD_BG = 'rgba(255,255,255,0.05)'
const BORDER = 'rgba(255,255,255,0.08)'

const THUMBNAILS: Record<string, number> = {
  'alexa_relay.jpg':     require('../../assets/alexa_relay.jpg'),
  'distance_reader.jpg': require('../../assets/distance_reader.jpg'),
  'ble_relay.jpg':       require('../../assets/ble_relay.jpg'),
  'turtlebot3.jpg':      require('../../assets/turtlebot3.jpg'),
}

const CHAT_API_URL = Constants.expoConfig?.extra?.chatApiUrl as string | undefined
const GUESTBOOK_URL = CHAT_API_URL ? `${CHAT_API_URL}/guestbook` : undefined
const FEEDBACK_PREVIEW_COUNT = 5

type FeedbackEntry = {
  id: number
  name: string
  message: string
  created_at: string
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

function ProjectCard({ project, onPress }: { project: Project; onPress: () => void }) {
  const thumb = THUMBNAILS[project.thumbnail]

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      {thumb && (
        <Image source={thumb} style={styles.thumbnail} resizeMode="cover" />
      )}
      <View style={styles.body}>
        <View style={styles.cardHeader}>
          <Text style={styles.subtitle}>{project.subtitle}</Text>
          {project.youtubeEmbedUrl && (
            <View style={styles.videoBadge}>
              <Text style={styles.videoBadgeText}>▶ Video</Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{project.description}</Text>
        <View style={styles.techRow}>
          {project.techStack.slice(0, 3).map((tech) => (
            <View key={tech} style={styles.techChip}>
              <Text style={styles.techText}>{tech}</Text>
            </View>
          ))}
          {project.techStack.length > 3 && (
            <Text style={styles.techMore}>+{project.techStack.length - 3}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function ProjectsScreen() {
  const router = useRouter()
  const { scrollTo } = useLocalSearchParams<{ scrollTo?: string }>()
  const listRef = useRef<FlatList>(null)

  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])
  const [nameInput, setNameInput] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState<string | null>(null)

  const fetchFeedback = useCallback(async () => {
    if (!GUESTBOOK_URL) return
    try {
      const res = await fetch(GUESTBOOK_URL)
      const data = await res.json()
      setFeedback(data.entries ?? [])
    } catch {
      // Keep whatever feedback is already showing.
    }
  }, [])

  useEffect(() => {
    fetchFeedback().finally(() => {
      if (scrollTo === 'feedback') {
        // Wait a tick for the footer's layout (including fetched feedback) to settle.
        requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }))
      } else if (scrollTo === 'top') {
        requestAnimationFrame(() => listRef.current?.scrollToOffset({ offset: 0, animated: true }))
      }
    })
  }, [fetchFeedback, scrollTo])

  async function handlePostFeedback() {
    const name = nameInput.trim()
    const message = messageInput.trim()
    if (!name || !message || posting || !GUESTBOOK_URL) return

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setPosting(true)
    setPostError(null)

    try {
      const res = await fetch(GUESTBOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, message }),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)

      const data = await res.json()
      setFeedback((prev) => [data.entry, ...prev])
      setNameInput('')
      setMessageInput('')
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch {
      setPostError("Couldn't post your feedback. Try again in a bit.")
    } finally {
      setPosting(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        ref={listRef}
        data={projects}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.sectionLabel}>02. Projects</Text>
            <Text style={styles.heading}>Featured Projects</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              router.push(`/project/${item.id}`)
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <View style={styles.feedbackCard}>
            <View style={styles.feedbackHeader}>
              <Ionicons name="chatbubbles-outline" size={16} color={ACCENT} />
              <Text style={styles.feedbackHeading}>Feedback</Text>
            </View>

            <TextInput
              style={styles.feedbackInput}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Your name"
              placeholderTextColor={MUTED}
              maxLength={40}
            />
            <TextInput
              style={[styles.feedbackInput, styles.feedbackMessageInput]}
              value={messageInput}
              onChangeText={setMessageInput}
              placeholder="What do you think of these projects?"
              placeholderTextColor={MUTED}
              maxLength={300}
              multiline
            />
            {postError && <Text style={styles.feedbackError}>{postError}</Text>}
            <TouchableOpacity
              style={[styles.feedbackPostBtn, (!nameInput.trim() || !messageInput.trim()) && styles.feedbackPostBtnDisabled]}
              onPress={handlePostFeedback}
              activeOpacity={0.75}
              disabled={posting || !nameInput.trim() || !messageInput.trim()}
            >
              {posting ? (
                <ActivityIndicator size="small" color={BG} />
              ) : (
                <Text style={styles.feedbackPostBtnText}>Post</Text>
              )}
            </TouchableOpacity>

            {feedback.slice(0, FEEDBACK_PREVIEW_COUNT).map((entry) => (
              <View key={entry.id} style={styles.feedbackEntry}>
                <View style={styles.feedbackEntryHeader}>
                  <Text style={styles.feedbackEntryName}>{entry.name}</Text>
                  <Text style={styles.feedbackEntryTime}>{timeAgo(entry.created_at)}</Text>
                </View>
                <Text style={styles.feedbackEntryMessage}>{entry.message}</Text>
              </View>
            ))}
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  list: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40, maxWidth: 640, alignSelf: 'center', width: '100%' },
  header: { marginBottom: 24 },
  sectionLabel: {
    fontSize: 12,
    color: ACCENT,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heading: { fontSize: 32, fontWeight: '700', color: '#ffffff' },
  separator: { height: 16 },
  card: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 180,
  },
  body: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  subtitle: { fontSize: 11, color: ACCENT, letterSpacing: 2, textTransform: 'uppercase' },
  videoBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  videoBadgeText: { fontSize: 11, color: ACCENT },
  title: { fontSize: 20, fontWeight: '600', color: '#ffffff', marginBottom: 8 },
  description: { fontSize: 14, color: MUTED, lineHeight: 21, marginBottom: 14 },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  techChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  techText: { fontSize: 11, color: ACCENT },
  techMore: { fontSize: 11, color: MUTED },
  feedbackCard: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  feedbackHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  feedbackHeading: { fontSize: 13, color: ACCENT, letterSpacing: 2, textTransform: 'uppercase', fontWeight: '600' },
  feedbackInput: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 10,
  },
  feedbackMessageInput: { minHeight: 70, textAlignVertical: 'top' },
  feedbackError: { fontSize: 12, color: '#ff6b6b', marginBottom: 10 },
  feedbackPostBtn: {
    backgroundColor: ACCENT,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 4,
  },
  feedbackPostBtnDisabled: { opacity: 0.4 },
  feedbackPostBtnText: { fontSize: 14, color: BG, fontWeight: '600' },
  feedbackEntry: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 12,
    marginTop: 12,
  },
  feedbackEntryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  feedbackEntryName: { fontSize: 13, color: ACCENT, fontWeight: '600' },
  feedbackEntryTime: { fontSize: 11, color: MUTED },
  feedbackEntryMessage: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 19 },
})
