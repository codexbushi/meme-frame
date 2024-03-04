import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame'
import { Message, getSSLHubRpcClient } from '@farcaster/hub-nodejs'
import { NextRequest, NextResponse } from 'next/server'

const HUB_URL = 'https://hub-grpc.pinata.cloud'
const client = HUB_URL ? getSSLHubRpcClient(HUB_URL) : undefined

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  const body: FrameRequest = await req.json()

  let validatedMessage: Message | undefined = undefined
  try {
    const frameMessage = Message.decode(
      Buffer.from(body?.trustedData?.messageBytes || '', 'hex')
    )
    const result = await client?.validateMessage(frameMessage)
    if (result && result.isOk() && result.value.valid) {
      validatedMessage = result.value.message
    }

    // Also validate the frame url matches the expected url
    // let urlBuffer = validatedMessage?.data?.frameActionBody?.url || []
    // const urlString = Buffer.from(urlBuffer).toString('utf-8')
    // if (validatedMessage && !urlString.startsWith(process.env['HOST'] || '')) {
    //   return res.status(400).send(`Invalid frame url: ${urlBuffer}`)
    // }
  } catch (e) {}

  if (!validatedMessage) {
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

  let inputTextBuffer = validatedMessage?.data?.frameActionBody?.inputText || []
  const inputTextString = Buffer.from(inputTextBuffer).toString('utf-8')

  const newSearchParams = new URLSearchParams({
    text: inputTextString,
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
