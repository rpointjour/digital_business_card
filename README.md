# RJP Portfolio

<img src="https://github.com/user-attachments/assets/6c4eab96-8efb-42c8-bcc8-fa5dd59d2663" alt="RJP Port logo" 
  style="width:25%;height:25%"  />


A full-stack personal portfolio — web app + native iOS/Android mobile app — built as a pnpm monorepo.

**Live site:** https://rpointjour.github.io/digital_business_card

---

## What's Inside

| Package | Stack | Description |
|---|---|---|
| `packages/web` | React 18, Vite, Tailwind CSS 4, Framer Motion | Portfolio web app, deployed to GitHub Pages |
| `packages/mobile` | Expo SDK 54, React Native 0.81, expo-router | iOS + Android native app |
| `packages/shared` | TypeScript | Shared profile data, projects, skills |

---

## Mobile App

### Screens

**Home** — Name, roles, bio summary, stats

**About Me** — Profile photo, full bio, color-coded tech stack chips with in-app browser links

**Projects** — Project cards with thumbnails; video projects open YouTube in-app, others link to the full portfolio PDF

**Connect** — Social links (LinkedIn, GitHub, YouTube, Blog) with colored icons, opens in-app browser

### Tech
- Expo SDK 54 · expo-router 6 · React Native 0.81
- `expo-web-browser` for in-app browser links
- `react-native-safe-area-context` for dynamic tab bar height (Android nav bar)
- EAS Build + EAS Submit for store distribution

### Screenshots

> Add screenshots here after taking them from the device. Suggested path: `docs/screenshots/`

| Home | About Me | Projects | Connect |
|------|----------|----------|---------|
| *(screenshot)* | *(screenshot)* | *(screenshot)* | *(screenshot)* |

### Download
- **iOS** — [App Store](https://apps.apple.com) *(add link once public)*
- **Android** — [Google Play](https://play.google.com) *(add link once public)*

---

## Web App

Built with React + Vite + Tailwind CSS 4. Framer Motion for animations. Deployed via GitHub Pages.

### Screenshots

> Add web screenshots here.

---

## Project Structure

```
digital_business_card/
├── packages/
│   ├── web/          # React + Vite web portfolio
│   ├── mobile/       # Expo React Native app
│   └── shared/       # Shared TS data (profile, projects, skills)
├── package.json      # pnpm workspace root
└── pnpm-workspace.yaml
```

---

## Local Development

### Prerequisites
- Node.js 18+
- pnpm
- Expo Go app on your device (for mobile dev)

### Web

```bash
pnpm install
pnpm start          # starts Vite dev server
```

### Mobile

```bash
cd packages/mobile
pnpm start          # starts Expo dev server
# then scan QR code with Expo Go
```

To run on a specific platform:

```bash
pnpm ios      # iOS
pnpm android  # Android
```

### Deploy Web

```bash
pnpm deploy   # builds and pushes to GitHub Pages
```

---

## Mobile Build & Release (EAS)

```bash
cd packages/mobile

# Production build (both platforms)
eas build --platform all --profile production

# Submit to stores
eas submit --platform all --profile production
```

App config: [`packages/mobile/app.json`](packages/mobile/app.json)
EAS config: [`packages/mobile/eas.json`](packages/mobile/eas.json)

- **iOS bundle ID:** `com.rjpdev.portfolio`
- **Android package:** `com.rjpdev.portfolio`
- **EAS project:** `22eb7709-1e2b-4312-a32c-7e12f53e7d00`

---

## Shared Data

All profile content lives in `packages/shared/src/` and is consumed by both web and mobile:

- `profile.ts` — name, bio, summary, stats, links
- `projects.ts` — project list with thumbnails and video URLs
- `skills.ts` — tech stack with optional color coding

---

## License

Personal portfolio — all rights reserved.
