export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  techStack: string[]
  thumbnail: string
  youtubeEmbedUrl: string | null
  links: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    id: 'alexa-pi-iot',
    title: 'Alexa Raspberry Pi IoT',
    subtitle: 'IoT / Voice Control',
    description: 'A custom Alexa Skill that triggers a relay-controlled motor on the Pi through a Cloudflare Tunnel.',
    techStack: ['Raspberry Pi', 'Flask', 'ASK SDK', 'Cloudflare Tunnel', 'Porkbun DNS'],
    thumbnail: 'alexa_relay.jpg',
    youtubeEmbedUrl: null,
    links: [],
  },
  {
    id: 'raspberry-pi-ble',
    title: 'Raspberry Pi BLE',
    subtitle: 'Embedded Systems',
    description: 'A Raspberry Pi BLE GATT server that triggers a relay-controlled motor from phone and watch app.',
    techStack: ['Raspberry Pi', 'Bluetooth LE (GATT)', 'Python', 'Swift', 'watchOS'],
    thumbnail: 'ble_relay.jpg',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/1ljtuc9dyV4',
    links: [],
  },
  {
    id: 'turtlebot',
    title: 'TurtleBot3 Navigation',
    subtitle: 'Robotics / ROS',
    description: 'Autonomous navigation and mapping with TurtleBot3 Waffle Pi using ROS and SLAM.',
    techStack: ['ROS', 'Python', 'SLAM', 'Raspberry Pi'],
    thumbnail: 'turtlebot3.jpg',
    youtubeEmbedUrl: null,
    links: [],
  },
  {
    id: 'distance-reader',
    title: 'Distance Reader',
    subtitle: 'Embedded Systems',
    description: 'An embedded system that measures and displays distance using an ultrasonic sensor.',
    techStack: ['Embedded C', 'Ultrasonic Sensor', 'Arduino'],
    thumbnail: 'distance_reader.jpg',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/w-XhrnkmF6g',
    links: [],
  },
]
