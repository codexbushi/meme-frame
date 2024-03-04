import { getFrameMetadata } from '@coinbase/onchainkit/frame'
import type { Metadata } from 'next'

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'A',
    },
    {
      label: 'B',
    },
  ],
  image: {
    src: `${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`,
  },
  postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/picker`,
})

export const metadata: Metadata = {
  title: 'Meme Generator',
  description: 'Farcaster Frame to generate a customized meme',
  openGraph: {
    title: 'Meme Generator',
    description: 'Farcaster Frame to generate a customized meme',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`],
  },
  other: {
    ...frameMetadata,
  },
}

export default function Page() {
  return (
    <div className="p-12">
      <h1 className="text-2xl md:text-5xl text-center font-bold">
        Meme Generator
      </h1>
      <h2 className="mt-4 text-xl md:text-3xl text-center font-bold">
        A Frame Experiment by{' '}
        <a
          className="text-indigo-400 hover:text-indigo-300"
          href="https://warpcast.com/hunterchang.eth"
        >
          Hunter Chang
        </a>
      </h2>

      <p className="mt-10 text-xl md:text-2xl text-center font-bold">
        Watch my video about{' '}
        <a
          className="text-indigo-400 hover:text-indigo-300"
          href="https://youtu.be/g_pkATT8pYU?si=jY7Ilr7E_M6hrKJB"
        >
          building frames
        </a>
      </p>
    </div>
  )
}
