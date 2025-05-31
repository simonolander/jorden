import Image from "next/image";
import countries from "./countries.json"

export default function Home() {
  const country = countries[Math.floor(Math.random() * countries.length)];
  const options = [country]
  while (options.length < 4) {
    let option = countries[Math.floor(Math.random() * countries.length)];
    if (option == country) {
      continue
    }
    options.push(option)
  }
  return (
      <div
          className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold text-center sm:text-left">Where is this?</h1>
          <Image
              src={country.svg}
              alt={"The country to guess"}
              width={200}
              height={200}
          />
          <ul className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            {options.map((option, i) => (
                <li key={i} className="mb-2 tracking-[-.01em]">{option.country}</li>
            ))}
          </ul>
        </main>
      </div>
  )
}
