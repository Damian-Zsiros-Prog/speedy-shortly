"use client"
import { useEffect } from "react"
interface Props {
  uuid: string
}
export default function CookieUUID({ uuid }: Props) {
  useEffect(() => {
    if (window.localStorage.getItem("uuid") == undefined) {
      window.localStorage.setItem("uuid", uuid)
    }
  }, [uuid])

  return <div></div>
}
