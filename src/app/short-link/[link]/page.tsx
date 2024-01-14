"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import Banner from "./components/Banner"

export default function ShortLinkRedirect() {
  const [Title, setTitle] = useState("")
  const [LinkExterno, setLinkExterno] = useState("")
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
        setLinkExterno(largeLink)
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
        <title>
          {Title != "" ? Title : window.location.pathname} - Speedy Shortly
        </title>
      </head>

      <section className="w-ful h-screen grid place-items-center">
        <div className="text-center flex flex-col gap-3">
          <Banner />
          <h1 className="text-4xl font-bold">
            Redireccionando a el link. Dale click al link...
          </h1>
          <a
            href={LinkExterno}
            className="p-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded"
          >
            Ir al link
          </a>
        </div>
      </section>
    </>
  )
}
