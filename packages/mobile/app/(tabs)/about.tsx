import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as WebBrowser from 'expo-web-browser'
import { profile, skills } from '@rjp/shared'

const profilePhoto = require('../../assets/profile.jpg')

const BG = '#08080a'
const ACCENT = '#c9960c'
const MUTED = 'rgba(255,255,255,0.45)'
const CARD_BG = 'rgba(255,255,255,0.05)'
const BORDER = 'rgba(255,255,255,0.08)'

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.sectionLabel}>01. About</Text>
          <Text style={styles.heading}>About Me</Text>
        </View>

        <View style={styles.photoWrapper}>
          <Image source={profilePhoto} style={styles.photo} resizeMode="cover" />
        </View>

        {profile.bio.map((paragraph, i) => (
          <View key={i}>
            <Text style={styles.bio}>{paragraph}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View>
          <Text style={styles.skillsHeading}>Tech Stack</Text>
          <View style={styles.chipsGrid}>
            {skills.map((skill) => (
              <TouchableOpacity
                key={skill.name}
                style={styles.chip}
                onPress={() => skill.url && WebBrowser.openBrowserAsync(skill.url)}
                activeOpacity={skill.url ? 0.7 : 1}
              >
                <Text style={[styles.chipText, !skill.url && styles.chipTextMuted, skill.color ? { color: skill.color } : undefined]}>
                  {skill.name}
                </Text>
                {skill.url && <Text style={[styles.chipArrow, skill.color ? { color: skill.color } : undefined]}> ↗</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  content: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40 },
  sectionLabel: {
    fontSize: 12,
    color: ACCENT,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 24,
  },
  bio: {
    fontSize: 15,
    color: MUTED,
    lineHeight: 26,
    marginBottom: 16,
  },
  photoWrapper: { alignSelf: 'center', marginVertical: 28 },
  photo: {
    width: 200,
    height: 250,
    borderRadius: 20,
  },
divider: { height: 1, backgroundColor: BORDER, marginVertical: 28 },
  skillsHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  chipsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: { fontSize: 13, color: ACCENT, fontWeight: '500' },
  chipTextMuted: { color: MUTED },
  chipArrow: { fontSize: 12, color: ACCENT },
})
