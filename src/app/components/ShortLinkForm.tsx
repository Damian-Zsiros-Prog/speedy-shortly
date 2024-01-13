"use client"
import { randomUUID } from "crypto"
import React, { useState } from "react"
import { generarUUID } from "../utils/generateUUID"
export default function ShortLinkForm() {
  const [linkLarge, setLinkLarge] = useState("")
  const onClick = async () => {
    const expresionRegularURL = /^(ftp|http|https):\/\/[^ "]+$/
    if (linkLarge != "" && expresionRegularURL.test(linkLarge)) {
      try {
        const id = generarUUID()
        const response = await fetch(`/api/short-link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            largeLink: linkLarge,
            idUsuario: window.localStorage.getItem("uuid")
          })
        })

        if (response.ok) {
          setLinkLarge(`${window.location.origin}/${id}`)
          window.location.href = ""
        }
      } catch (err) {
        console.error(err)
      }
    } else {
      alert("Ingrese una url valida")
    }
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkLarge(e.target.value)
  }
  return (
    <div className="bg-white rounded flex items-center justify-center w-full p-3 mt-3 gap-3">
      <label htmlFor="shortLinkInput" className="text-center">
        <span className="">🔗</span>
      </label>
      <input
        type="text"
        name=""
        id="shortLinkInput"
        className=" w-full outline-none bg-transparent"
        placeholder="Paste your url for short link"
        onChange={onChange}
        value={linkLarge}
      />
      <button
        type="button"
        className="p-3 bg-blue-500 rounded text-sm min-w-[6rem] text-white hover:bg-blue-800 transition"
        onClick={onClick}
      >
        Short link
      </button>
    </div>
  )
}
