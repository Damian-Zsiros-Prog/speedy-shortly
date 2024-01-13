import { randomUUID } from "crypto"
import CookieUUID from "./components/CookieUUID"
import ShortLinkForm from "./components/ShortLinkForm"
import ShortLinks from "./components/ShortLinks"
import Image from "next/image"

export default function Home() {
  const id = randomUUID()
  return (
    <>
      <header className="relative  w-full min-h-[350px] bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 flex flex-col justify-center items-center">
        <section>
          <CookieUUID uuid={id} />
          <div className="flex flex-col gap-3">
            <h1 className="text-white text-5xl text-center">Speedy Shortly</h1>
            <ShortLinkForm />
            <span className="text-center text-white">
              Hecho por{" "}
              <a
                href="https://github.com/Damian-Zsiros-Prog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gray-100 hover:underline transition"
              >
                Damian Zsiros
              </a>
            </span>
          </div>
        </section>
      </header>
      <main className="w-full flex flex-col justify-center text-center my-6 px-12 gap-8">
        <section className="w-full">
          <main className="flex justify-center flex-col md:flex-row w-full">
            <div className="flex-col ">
              <h2 className="text-4xl font-bold mb-4">Short Links</h2>
              <ShortLinks />
            </div>
            <aside className="justify-center m-auto my-4">
              <h3 className="text-4xl font-bold mb-3">Donaciones</h3>
              <Image
                src={"/qr-donaciones.jpg"}
                alt="QR de donaciones"
                width={300}
                height={500}
              />
            </aside>
          </main>
        </section>
      </main>
    </>
  )
}
