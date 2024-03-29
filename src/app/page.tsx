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
    <>
      <h1>Meme Generator</h1>
    </>
  )
}
