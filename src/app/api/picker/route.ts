import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame'
import { NextRequest, NextResponse } from 'next/server'

async function getResponse(req: NextRequest): Promise<NextResponse> {
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
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      })
    )
  }

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
        aspectRatio: '1:1',
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
