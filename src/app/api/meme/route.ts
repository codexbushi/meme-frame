import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame'
import { NextRequest, NextResponse } from 'next/server'

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  const body: FrameRequest = await req.json()

  const { untrustedData } = body

  const newSearchParams = new URLSearchParams({
    text: untrustedData.inputText,
  })

  if (id === 'a') {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/a?${newSearchParams}`,
        },
        buttons: [
          {
            label: 'Start Over 🔄',
          },
        ],
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      })
    )
  }

  return new NextResponse(
    getFrameHtmlResponse({
      image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/meme/b?${newSearchParams}`,
        aspectRatio: '1:1',
      },
      buttons: [
        {
          label: 'Start Over 🔄',
        },
      ],
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    })
  )
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req)
}

export const dynamic = 'force-dynamic'
