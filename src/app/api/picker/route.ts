import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame'
import { NextRequest, NextResponse } from 'next/server'

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json()

  const { untrustedData } = body

  if (untrustedData.buttonIndex === 1) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Generate',
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/a`,
        },
        input: {
          text: 'Text',
        },
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/meme?id=a`,
      })
    )
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Generate',
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/b`,
      },
      input: {
        text: 'Text',
      },
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/meme?id=b`,
    })
  )
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req)
}

export const dynamic = 'force-dynamic'
