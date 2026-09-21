import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Share, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Clipboard from 'expo-clipboard'
import * as WebBrowser from 'expo-web-browser'
import * as Haptics from 'expo-haptics'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { useState } from 'react'
import { profile, socialLinks } from '@rjp/shared'
import type { SocialLink } from '@rjp/shared'

const BG = '#08080a'
const ACCENT = '#c9960c'
const MUTED = 'rgba(255,255,255,0.45)'
const CARD_BG = 'rgba(255,255,255,0.05)'
const BORDER = 'rgba(255,255,255,0.08)'

type IconName = React.ComponentProps<typeof Ionicons>['name']

const SOCIAL_ICONS: Record<SocialLink['icon'], IconName> = {
  linkedin: 'logo-linkedin',
  github: 'logo-github',
  youtube: 'logo-youtube',
}

const SOCIAL_COLORS: Record<SocialLink['icon'], string> = {
  linkedin: '#0a66c2',
  github: '#ffffff',
  youtube: '#ff0000',
}

export default function ContactScreen() {
  const [copied, setCopied] = useState(false)

  async function handleEmailPress() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    await Clipboard.setStringAsync(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  async function handleShare() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    await Share.share({
      message: `Check out ${profile.name}'s portfolio: https://rpointjour.github.io/digital_business_card/`,
      url: 'https://rpointjour.github.io/digital_business_card/',
    })
  }

  async function handleSocialPress(link: SocialLink) {
    // YouTube deep-links into the YouTube app (or falls back to browser) the same
    // way project demo videos do — WebBrowser's in-app browser didn't reliably
    // open YouTube links on Android.
    if (link.icon === 'youtube') {
      Linking.openURL(link.url)
    } else {
      WebBrowser.openBrowserAsync(link.url)
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.sectionLabel}>04. Connect</Text>
          <Text style={styles.heading}>Let's Connect</Text>
          <Text style={styles.subheading}>
            Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is open.
          </Text>
        </View>

        <View>
          <TouchableOpacity style={styles.emailBtn} onPress={handleEmailPress} activeOpacity={0.75}>
            <Ionicons name={copied ? 'checkmark-circle' : 'mail-outline'} size={18} color={ACCENT} />
            <Text style={styles.emailBtnText}>
              {copied ? 'Copied to clipboard!' : 'Say Hello →'}
            </Text>
          </TouchableOpacity>
          {copied && (
            <Text style={styles.emailAddress}>{profile.email}</Text>
          )}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.75}>
            <Ionicons name="share-outline" size={18} color={ACCENT} />
            <Text style={styles.actionBtnText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.socialHeading}>Find me online</Text>
          <View style={styles.socialList}>
            {socialLinks.map((link) => (
              <TouchableOpacity
                key={link.name}
                style={styles.socialRow}
                onPress={() => handleSocialPress(link)}
                activeOpacity={0.7}
              >
                <View style={styles.socialIcon}>
                  <Ionicons name={SOCIAL_ICONS[link.icon]} size={20} color={SOCIAL_COLORS[link.icon]} />
                </View>
                <Text style={styles.socialName}>{link.name}</Text>
                <Ionicons name="chevron-forward" size={16} color={MUTED} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.footer}>Built & designed by {profile.name}</Text>
          <Text style={styles.version}>v{Constants.expoConfig?.version}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  content: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40, maxWidth: 640, alignSelf: 'center', width: '100%' },
  sectionLabel: {
    fontSize: 12,
    color: ACCENT,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heading: { fontSize: 32, fontWeight: '700', color: '#ffffff', marginBottom: 12 },
  subheading: { fontSize: 15, color: MUTED, lineHeight: 24, marginBottom: 32 },
  emailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  emailBtnText: { fontSize: 15, color: ACCENT, fontWeight: '500' },
  emailAddress: { fontSize: 12, color: MUTED, marginTop: 8, marginLeft: 4 },
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingVertical: 14,
  },
  actionBtnText: { fontSize: 15, color: ACCENT, fontWeight: '500' },
  divider: { height: 1, backgroundColor: BORDER, marginVertical: 28 },
  socialHeading: { fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 16 },
  socialList: {
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  socialIcon: { width: 32, alignItems: 'center', marginRight: 12 },
  socialName: { flex: 1, fontSize: 15, color: '#ffffff', fontWeight: '500' },
  footer: { fontSize: 12, color: MUTED, textAlign: 'center', marginTop: 8 },
  version: { fontSize: 11, color: MUTED, textAlign: 'center', marginTop: 4 },
})
