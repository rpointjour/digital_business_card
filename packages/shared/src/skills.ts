export type Skill = {
  name: string
  url: string | null
}

export const skills: Skill[] = [
  { name: 'Machine Learning', url: 'https://rjpdev-machine-learningpad.web.app/' },
  { name: 'Raspberry Pi',     url: 'https://rjpdev-pi-launchpad.web.app' },
  { name: 'BLE',              url: null },
  { name: 'ESP32',            url: 'https://rjpdev-esp32-launchpad.web.app' },
  { name: 'STM32',            url: 'https://rjpdev-stm32-launchpad.web.app' },
  { name: 'Python',           url: null },
  { name: 'C / C++',          url: null },
  { name: 'React',            url: null },
  { name: 'ROS',              url: null },
]
