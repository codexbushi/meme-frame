import { NextResponse } from 'next/server'

async function getResponse(): Promise<NextResponse> {
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}`, {
    status: 302,
  })
}

export async function POST(): Promise<Response> {
  return getResponse()
}

export const dynamic = 'force-dynamic'
