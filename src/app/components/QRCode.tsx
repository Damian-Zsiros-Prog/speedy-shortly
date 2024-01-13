import React from "react"
import { useQRCode } from "next-qrcode"

interface Props {
  link: string
}

export default function QRCode({ link }: Props) {
  const { Canvas } = useQRCode()
  return (
    <Canvas
      text={link}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {}
      }}
    />
  )
}
