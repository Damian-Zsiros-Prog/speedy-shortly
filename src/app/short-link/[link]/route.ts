// app${request.nextUrl.origin}/api/short/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const link = request.nextUrl.pathname.split("/").pop()
  try {
    const response = await fetch(
      `${request.nextUrl.origin}/api/short-link?id=${link}`,
      {
        method: "GET",
        headers: {}
      }
    )

    if (response.ok) {
      const result = await response.json()
      const { shortLinkInfo } = result
      console.log(result)
      const { large_link: largeLink } = shortLinkInfo
      return NextResponse.redirect(largeLink)
    }
    return NextResponse.redirect(request.nextUrl.origin)
  } catch (err) {
    console.error(err)
  }
}
