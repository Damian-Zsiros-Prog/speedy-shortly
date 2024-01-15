import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, response: NextResponse) {
  const router = new URL(request.url)
  const link = router.pathname.split("/").pop()
  try {
    const response = await fetch(`${router.origin}/api/short-link?id=${link}`, {
      method: "GET",
      headers: {}
    })

    if (response.ok) {
      const result = await response.json()
      const { shortLinkInfo } = result
      const { large_link: largeLink } = shortLinkInfo
      return NextResponse.redirect(largeLink)
    }
  } catch (err) {
    let error_response = {
      status: "error",
      message: err
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
