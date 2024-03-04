import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame'
import { NextResponse } from 'next/server'

async function getResponse(): Promise<NextResponse> {
  return new NextResponse(
    getFrameHtmlResponse({
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
  )
}

export async function POST(): Promise<Response> {
  return getResponse()
}

export const dynamic = 'force-dynamic'
