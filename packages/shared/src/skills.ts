export type Skill = {
  name: string
  url: string | null
  color?: string
}

export const skills: Skill[] = [
  { name: 'Machine Learning', url: 'https://rjpdev-machine-learningpad.web.app/', color: '#a855f7' },
  { name: 'Raspberry Pi',     url: 'https://rjpdev-pi-launchpad.web.app',         color: '#22c55e' },
  { name: 'BLE',              url: null },
  { name: 'ESP32',            url: 'https://rjpdev-esp32-launchpad.web.app',      color: '#3b82f6' },
  { name: 'STM32',            url: 'https://rjpdev-stm32-launchpad.web.app',      color: '#ffffff' },
  { name: 'Python',           url: null },
  { name: 'C / C++',          url: null },
  { name: 'React',            url: null },
  { name: 'ROS',              url: null },
]
