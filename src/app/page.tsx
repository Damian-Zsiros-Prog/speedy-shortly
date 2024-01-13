import { randomUUID } from "crypto"
import CookieUUID from "./components/CookieUUID"
import ShortLinkForm from "./components/ShortLinkForm"
import ShortLinks from "./components/ShortLinks"

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
          </div>
        </section>
      </header>
      <main className="w-full flex flex-col justify-center text-center my-6">
        <section>
          <h2 className="text-4xl font-bold mb-4">Short Links</h2>
          <ShortLinks />
        </section>
      </main>
    </>
  )
}
