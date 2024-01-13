"use client"
import React, { useEffect, useState } from "react"
import { Link } from "../types/Link"

export default function ShortLinks() {
  const [shortLinks, setShortLinks] = useState<Array<Link>>([])
  const getShortLinks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/short-link?idUsuario=${window.localStorage.getItem(
          "uuid"
        )}`,
        {
          method: "GET",
          headers: {}
        }
      )

      if (response.ok) {
        const { shortLinks } = await response.json()
        console.log(shortLinks)
        setShortLinks(shortLinks)
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    getShortLinks()
  }, [])

  return (
    <section className="flex justify-center flex-col gap-4">
      {shortLinks.map((shortLink) => (
        <article
          key={shortLink.idlink}
          className="p-4 border-2 max-w-[60%] m-auto rounded flex flex-col gap-3  text-left"
        >
          <a
            href={`${window.location.origin}/${shortLink.idlink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >{`${window.location.origin}/${shortLink.idlink}`}</a>
          <a
            href={`${shortLink.large_link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left ml-4"
          >{`${shortLink.large_link}`}</a>
        </article>
      ))}
    </section>
  )
}