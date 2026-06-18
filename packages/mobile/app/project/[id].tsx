import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { projects, profile } from '@rjp/shared'
import { Ionicons } from '@expo/vector-icons'

const BG = '#08080a'
const ACCENT = '#c9960c'
const MUTED = 'rgba(255,255,255,0.45)'
const CARD_BG = 'rgba(255,255,255,0.05)'
const BORDER = 'rgba(255,255,255,0.08)'

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const navigation = useNavigation()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    if (project) {
      navigation.setOptions({ title: project.title })
    }
  }, [project])

  if (!project) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Project not found.</Text>
        </View>
      </SafeAreaView>
    )
  }

  const youtubeUrl = project.youtubeEmbedUrl
    ? project.youtubeEmbedUrl.replace('/embed/', '/watch?v=')
    : null

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header card */}
        <View style={styles.headerCard}>
          <Text style={styles.subtitle}>{project.subtitle}</Text>
          <Text style={styles.title}>{project.title}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>{project.description}</Text>
        </View>

        {/* Tech stack */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tech Stack</Text>
          <View style={styles.techGrid}>
            {project.techStack.map((tech) => (
              <View key={tech} style={styles.techChip}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* YouTube */}
        {youtubeUrl ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Demo</Text>
            <TouchableOpacity
              style={styles.watchBtn}
              onPress={() => WebBrowser.openBrowserAsync(youtubeUrl)}
              activeOpacity={0.75}
            >
              <Ionicons name="logo-youtube" size={20} color="#ff4444" />
              <Text style={styles.watchBtnText}>Watch on YouTube →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Portfolio</Text>
            <TouchableOpacity
              style={styles.watchBtn}
              onPress={() => WebBrowser.openBrowserAsync(profile.portfolioPdfUrl)}
              activeOpacity={0.75}
            >
              <Ionicons name="document-text-outline" size={20} color={ACCENT} />
              <Text style={styles.watchBtnText}>View Full Portfolio →</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { color: MUTED, fontSize: 16 },
  headerCard: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 11,
    color: ACCENT,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#ffffff', lineHeight: 34 },
  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 13,
    color: MUTED,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  description: { fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 26 },
  techGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  techChip: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  techText: { fontSize: 13, color: ACCENT, fontWeight: '500' },
  watchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignSelf: 'flex-start',
  },
  watchBtnText: { fontSize: 14, color: '#ffffff', fontWeight: '500' },
})
