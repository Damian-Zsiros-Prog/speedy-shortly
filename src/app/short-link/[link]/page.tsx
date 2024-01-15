"use client"

import { useEffect, useState } from "react"
import Page from "./page.client"
import { useRouter } from "next/navigation"

export default function ShortLinkRedirect() {
  const router = window?.location
  const routerUser = useRouter()
  const redirectShortLink = async () => {
    const link = router.pathname.split("/").pop()
    try {
      const response = await fetch(
        `${router.origin}/api/short-link?id=${link}`,
        {
          method: "GET",
          headers: {}
        }
      )

      if (response.ok) {
        const result = await response.json()
        const { shortLinkInfo } = result
        const { large_link: largeLink } = shortLinkInfo
        window.location.href = largeLink
        return {
          link: largeLink as string,
          title: new URL(largeLink).pathname
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Page info={redirectShortLink} />
    </>
  )
}
