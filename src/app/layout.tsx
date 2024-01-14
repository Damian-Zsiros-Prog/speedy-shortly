import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import GoogleAnalitycs from "./components/GoogleAnalitycs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Speedy Shortly",
  description:
    "Speedy Shortly, tu compañero ágil en la web. Acorta tus enlaces de forma instantánea y sin complicaciones. Experimenta la velocidad sin igual de Speedy Shortly, el acortador que simplifica tus URL de manera rápida y eficiente. ¡Sin registros, solo resultados veloces para compartir tus enlaces de manera ágil y sencilla!",
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        alt: "Og Image of Speedy Shortly",
        type: "image/png",
        width: 1200,
        height: 720
      }
    ]
  },
  keywords: ["shortlink", "speedy shortly", "shortly", "link"],
  authors: [{ name: "Damian Zsiros", url: "https://www.damianzsiros.com/" }],
  creator: "Damian Zsiros",
  publisher: "Damian Zsiros"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleAnalitycs />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
