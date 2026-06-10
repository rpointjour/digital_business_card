export type SocialLink = {
  name: string
  url: string
  icon: 'linkedin' | 'github' | 'youtube'
}

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/roody-pointjour/',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/rpointjour',
    icon: 'github',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UC5jL_2GLNFFTLTuoToK9vIg',
    icon: 'youtube',
  },
]
