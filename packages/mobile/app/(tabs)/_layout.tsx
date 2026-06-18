import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { ColorValue } from 'react-native'

const ACCENT = '#c9960c'
const TAB_BG = '#0c0c0a'
const INACTIVE = 'rgba(255,255,255,0.35)'

type IoniconsName = React.ComponentProps<typeof Ionicons>['name']

function icon(active: IoniconsName, inactive: IoniconsName) {
  return ({ color, focused }: { color: ColorValue; focused: boolean }) => (
    <Ionicons name={focused ? active : inactive} size={22} color={color as string} />
  )
}

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const tabBarHeight = 54 + insets.bottom

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: TAB_BG,
          borderTopColor: 'rgba(255,255,255,0.07)',
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingBottom: insets.bottom || 10,
        },
        tabBarActiveTintColor: ACCENT,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: icon('home', 'home-outline'),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: icon('person', 'person-outline'),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: icon('briefcase', 'briefcase-outline'),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: icon('mail', 'mail-outline'),
        }}
      />
    </Tabs>
  )
}
