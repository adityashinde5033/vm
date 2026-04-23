import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vm.ketoy.dev'),
  title: {
    default: 'KetoyVM · Server-Driven UI Runtime for Android · Ship Kotlin, Update in Seconds',
    template: '%s · KetoyVM',
  },
  description:
    'KetoyVM is a Kotlin execution runtime for Android that lets you ship Jetpack Compose, coroutines, ViewModels, Hilt, Room and Navigation inside a .ktx bundle. Push app updates over-the-air to every device in 60 seconds without Play Store round-trip, DSL, or schema. The Hermes of Kotlin and Compose.',
  keywords: [
    'KetoyVM', 'Ketoy VM', 'Server Driven UI', 'Server-Driven UI Android', 'Remote Compose',
    'Jetpack Compose runtime', 'Kotlin execution runtime', 'Android code push', 'OTA Android updates',
    'ship app updates in seconds', 'ship app updates quickly', 'skip Play Store review',
    'Android over the air updates', 'Compose over the air', 'Kotlin bundle', '.ktx bundle',
    'Ketoy Bytecode', 'KBC', 'Hermes for Kotlin', 'React Native alternative Android',
    'mobile code push', 'instant app updates', 'CodePush Kotlin', 'SDUI',
    'server driven UI framework', 'Kotlin DSL free', 'Android runtime', 'Android CI CD',
    'continuous delivery Android', 'hot reload Android', 'feature flags Android',
    'remote rendering Android', 'Jetpack Compose server driven',
  ],
  authors: [{ name: 'KetoyVM' }],
  applicationName: 'KetoyVM',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: { canonical: 'https://vm.ketoy.dev/' },
  openGraph: {
    type: 'website',
    siteName: 'KetoyVM',
    title: 'KetoyVM · Server-Driven UI Runtime for Android',
    description:
      'Ship plain Kotlin with Jetpack Compose, coroutines, ViewModels, Hilt, Room, and Navigation inside a .ktx bundle. Push updates to every Android device in 60 seconds. No Play Store. No DSL.',
    url: 'https://vm.ketoy.dev/',
    images: [{
      url: 'https://vm.ketoy.dev/assets/vol-img.png',
      alt: 'KetoyVM: a Kotlin execution runtime for Android, named for a volcanic island in the Kurils',
    }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KetoyVM · Server-Driven UI Runtime for Android',
    description:
      'Ship plain Kotlin, update every Android device in 60 seconds. Full Jetpack Compose, Coroutines, Hilt, Room delivered as a .ktx bundle. No Play Store round-trip.',
    images: [{ url: 'https://vm.ketoy.dev/assets/vol-img.png', alt: 'KetoyVM: Kotlin execution runtime for Android' }],
  },
  icons: {
    icon: '/assets/ketoy_logo.png',
    apple: '/assets/ketoy_logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#08090a',
  width: 'device-width',
  initialScale: 1,
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'KetoyVM',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Android',
      description:
        'KetoyVM is a Kotlin execution runtime for Android that lets teams ship Jetpack Compose, Coroutines, ViewModels, Hilt, Room and Navigation over-the-air as a .ktx bundle, updating every device in about 60 seconds without a Play Store release.',
      url: 'https://vm.ketoy.dev/',
      image: 'https://vm.ketoy.dev/assets/vol-img.png',
      softwareVersion: '0.1',
      keywords:
        'KetoyVM, Server Driven UI, Remote Compose, Kotlin runtime, Android OTA updates, Jetpack Compose, code push, Ketoy Bytecode, .ktx bundle',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/PreOrder' },
      publisher: { '@type': 'Organization', name: 'Ketoy', url: 'https://ketoy.dev', email: 'support@ketoy.dev' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is KetoyVM?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KetoyVM is a Kotlin execution runtime for Android that runs Ketoy Bytecode compiled from plain Kotlin source, including Jetpack Compose, coroutines, ViewModels, Hilt, Room and Navigation, delivered as a .ktx bundle.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I ship Android app updates in seconds?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Write Kotlin, run ./gradlew ketoyBundle, upload the resulting .ktx to Ketoy Cloud, and the KetoyRuntime on every device fetches and executes the new bundle in about 60 seconds without Play Store review or binary split.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is KetoyVM a server-driven UI framework?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'KetoyVM is stronger than a server-driven UI DSL: it executes real Kotlin on device with native Jetpack Compose rendering, real coroutine semantics and real ViewModel lifecycles, so you keep full-surface Compose without a custom schema.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this like CodePush or Hermes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "What Hermes is to React Native's JavaScript, KetoyVM is to Kotlin and Compose: a purpose-built execution runtime, not a script interpreter wedged into a different stack.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
