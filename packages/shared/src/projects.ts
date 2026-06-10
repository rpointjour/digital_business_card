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
    id: 'stock-app',
    title: 'Stock App',
    subtitle: 'Android Studio',
    description: 'An Android application for browsing and tracking stock market data in real time.',
    techStack: ['Java', 'Android Studio', 'REST API'],
    thumbnail: 'stock_home.jpg',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/m-GYSwUPJE8',
    links: [],
  },
  {
    id: 'distance-reader',
    title: 'Distance Reader',
    subtitle: 'Embedded Systems',
    description: 'An embedded system that measures and displays distance using an ultrasonic sensor.',
    techStack: ['Embedded C', 'Ultrasonic Sensor', 'STM32'],
    thumbnail: 'distance_reader.jpg',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/w-XhrnkmF6g',
    links: [],
  },
  {
    id: 'voxl-drone',
    title: 'VOXL Drone Platform',
    subtitle: 'Drone Systems',
    description: 'Development work on the VOXL flight controller platform for autonomous drone applications.',
    techStack: ['C++', 'ROS', 'Computer Vision', 'Linux'],
    thumbnail: 'voxl.png',
    youtubeEmbedUrl: null,
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
]
