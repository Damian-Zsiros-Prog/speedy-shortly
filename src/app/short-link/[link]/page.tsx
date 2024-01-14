"use client"

import Head from "next/head"
import { useEffect, useState } from "react"

export default function ShortLinkRedirect() {
  const [Title, setTitle] = useState("")
  const router = window?.location
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
        setTitle(new URL(largeLink).pathname)
        window.location.href = largeLink
      } else {
        return (window.location.href = window.location.origin)
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    redirectShortLink()
  }, [])

  return (
    <>
      <head>
        <title>{Title}</title>
      </head>
      <div className="w-ful h-screen grid place-items-center">
        <h1 className="text-4xl font-bold">
          Redirigiendo. Espera unos segundos...
        </h1>
      </div>
    </>
  )
}
