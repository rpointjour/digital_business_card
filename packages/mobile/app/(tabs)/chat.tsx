import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Haptics from 'expo-haptics'
import { useRef, useState } from 'react'
import { profile, projects, socialLinks } from '@rjp/shared'

const BG = '#08080a'
const ACCENT = '#c9960c'
const MUTED = 'rgba(255,255,255,0.45)'
const CARD_BG = 'rgba(255,255,255,0.05)'
const BORDER = 'rgba(255,255,255,0.08)'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const SYSTEM_PROMPT = `You are a portfolio assistant for ${profile.name}, an Embedded & ML Engineer.
Answer visitor questions about his experience, skills, projects, and background.
Be concise, friendly, and helpful. Only answer questions relevant to ${profile.name.split(' ')[0]}'s portfolio.

Profile: ${JSON.stringify({
  name: profile.name,
  roles: profile.roles,
  bio: profile.bio,
  stats: profile.stats,
  email: profile.email,
})}

Projects: ${JSON.stringify(
  projects.map((p) => ({
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    techStack: p.techStack,
  }))
)}

Social: ${JSON.stringify(socialLinks.map((s) => ({ name: s.name, url: s.url })))}`

const STARTER_PROMPTS = [
  'What projects have you worked on?',
  "What's your experience?",
  'How can I contact you?',
]

const CHAT_API_URL = Constants.expoConfig?.extra?.chatApiUrl as string | undefined

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<FlatList>(null)

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      if (!CHAT_API_URL) throw new Error('Chat is not configured')

      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: nextMessages }),
      })

      if (!res.ok) throw new Error(`Request failed (${res.status})`)

      const data = await res.json()
      const reply: string = data?.content?.[0]?.text ?? "Sorry, I didn't catch that."

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't reach the assistant right now. Try again in a bit." },
      ])
    } finally {
      setLoading(false)
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100)
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={styles.header}>
          <Text style={styles.sectionLabel}>Chat</Text>
          <Text style={styles.heading}>ChatRJP</Text>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Ask me anything about {profile.name.split(' ')[0]}'s work, background, or projects.
              </Text>
              <View style={styles.chipsWrap}>
                {STARTER_PROMPTS.map((prompt) => (
                  <TouchableOpacity
                    key={prompt}
                    style={styles.chip}
                    onPress={() => sendMessage(prompt)}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.chipText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
              ]}
            >
              <Text style={[styles.bubbleText, item.role === 'user' && styles.bubbleTextUser]}>
                {item.content}
              </Text>
            </View>
          )}
          ListFooterComponent={
            loading ? (
              <View style={[styles.bubble, styles.bubbleAssistant, styles.bubbleLoading]}>
                <ActivityIndicator size="small" color={ACCENT} />
              </View>
            ) : null
          }
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask a question..."
            placeholderTextColor={MUTED}
            onSubmitEditing={() => sendMessage(input)}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => sendMessage(input)}
            activeOpacity={0.75}
            disabled={loading}
          >
            <Ionicons name="arrow-up" size={20} color={BG} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  flex: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 12, maxWidth: 640, alignSelf: 'center', width: '100%' },
  sectionLabel: {
    fontSize: 12,
    color: ACCENT,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heading: { fontSize: 28, fontWeight: '700', color: '#ffffff' },
  messageList: { paddingHorizontal: 24, paddingBottom: 16, maxWidth: 640, alignSelf: 'center', width: '100%', flexGrow: 1 },
  emptyState: { flex: 1, justifyContent: 'center', paddingTop: 40 },
  emptyText: { fontSize: 15, color: MUTED, lineHeight: 24, marginBottom: 20, textAlign: 'center' },
  chipsWrap: { gap: 10 },
  chip: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  chipText: { fontSize: 14, color: ACCENT, fontWeight: '500' },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    maxWidth: '85%',
  },
  bubbleUser: {
    backgroundColor: ACCENT,
    alignSelf: 'flex-end',
  },
  bubbleAssistant: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    alignSelf: 'flex-start',
  },
  bubbleLoading: { paddingVertical: 14, paddingHorizontal: 18 },
  bubbleText: { fontSize: 15, color: '#ffffff', lineHeight: 21 },
  bubbleTextUser: { color: BG, fontWeight: '500' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    maxWidth: 640,
    alignSelf: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 15,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
