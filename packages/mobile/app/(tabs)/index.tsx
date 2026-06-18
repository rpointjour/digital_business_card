import { ScrollView, View, Text, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { profile } from '@rjp/shared'

const BG = '#08080a'
const ACCENT = '#c9960c'
const MUTED = 'rgba(255,255,255,0.45)'
const CARD_BG = 'rgba(255,255,255,0.05)'
const BORDER = 'rgba(255,255,255,0.08)'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require('../../assets/briefcase-clean.png')}
          style={styles.icon}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.greeting}>{profile.greeting}</Text>
        </View>

        <View>
          <Text style={styles.name}>{profile.name}</Text>
        </View>

        <View style={styles.rolesRow}>
          {profile.roles.map((role) => (
            <View key={role} style={styles.roleChip}>
              <Text style={styles.roleText}>{role}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.bio}>{profile.summary}</Text>
        </View>

        <View style={styles.statsRow}>
          {profile.stats.slice(0, 2).map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.statCard, styles.statCardWide]}>
          <Text style={styles.statValueSmall}>{profile.stats[2].value}</Text>
          <Text style={styles.statLabel}>{profile.stats[2].label}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40 },
  icon: { width: 110, height: 110, marginBottom: 24 },
  greeting: {
    fontSize: 13,
    color: ACCENT,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  name: {
    fontSize: 38,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
    lineHeight: 44,
    marginBottom: 20,
  },
  rolesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 },
  roleChip: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  roleText: { fontSize: 12, color: MUTED, fontWeight: '500' },
  divider: { height: 1, backgroundColor: BORDER, marginBottom: 24 },
  bio: { fontSize: 15, color: MUTED, lineHeight: 24, marginBottom: 32 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statCardWide: { flex: 0, marginTop: 12 },
  statValue: { fontSize: 20, fontWeight: '700', color: ACCENT, marginBottom: 4 },
  statValueSmall: { fontSize: 15, fontWeight: '700', color: ACCENT, marginBottom: 4 },
  statLabel: { fontSize: 10, color: MUTED, textAlign: 'center', letterSpacing: 0.5 },
})
