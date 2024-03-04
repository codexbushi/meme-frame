import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame'
import { NextRequest, NextResponse } from 'next/server'

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  const body: FrameRequest = await req.json()

  const binaryData = new Uint8Array(
    body.trustedData.messageBytes
      .match(/.{1,2}/g)!
      .map((byte) => parseInt(byte, 16))
  )

  const response = await fetch('https://hub.pinata.cloud/v1/validateMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: binaryData,
  }).then((r) => r.json())

  const isValid = response.valid

  if (!isValid) {
    const searchParams = new URLSearchParams({
      title: 'Invalid Farcaster Id',
    })

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Try Again',
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
        },
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/redirect`,
      })
    )
  }

  const { message } = response

  const newSearchParams = new URLSearchParams({
    text: JSON.stringify(message.data.frameActionBody),
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
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/redirect`,
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
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/redirect`,
    })
  )
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req)
}

export const dynamic = 'force-dynamic'
