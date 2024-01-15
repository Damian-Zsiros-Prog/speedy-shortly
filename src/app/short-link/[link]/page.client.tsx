"use client"
import React, { useEffect, useState } from "react"
import Banner from "./components/Banner"
import { useRouter } from "next/navigation"
interface Props {
  info: () => Promise<Info>
}
interface Info {
  link?: string
  title?: string
}
export default function Page({ info }: Props) {
  const [Info, setInfo] = useState<Info>({})
  const getInfo = async () => {
    info().then((data) => {
      setInfo(data)

      window.location.href = data.link ?? ""
    })
  }
  useEffect(() => {
    getInfo()
  }, [])

  return (
    <>
      <section className="w-ful h-screen grid place-items-center">
        <div className="text-center flex flex-col gap-3">
          <Banner />
          <h1 className="text-4xl font-bold">
            Redireccionando a el link. Dale click al link...
          </h1>
          <a
            href={Info.link}
            className="p-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded"
          >
            Ir al link
          </a>
        </div>
      </section>
    </>
  )
}
