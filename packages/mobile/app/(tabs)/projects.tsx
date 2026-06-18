import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { projects } from '@rjp/shared'
import type { Project } from '@rjp/shared'

const BG = '#08080a'
const ACCENT = '#c9960c'
const MUTED = 'rgba(255,255,255,0.45)'
const CARD_BG = 'rgba(255,255,255,0.05)'
const BORDER = 'rgba(255,255,255,0.08)'

const THUMBNAILS: Record<string, ReturnType<typeof require>> = {
  'stock_home.jpg':      require('../../assets/stock_home.jpg'),
  'distance_reader.jpg': require('../../assets/distance_reader.jpg'),
  'voxl.png':            require('../../assets/voxl.png'),
  'turtlebot3.jpg':      require('../../assets/turtlebot3.jpg'),
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

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
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
            onPress={() => router.push(`/project/${item.id}`)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  list: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40 },
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
})
