import Image from "next/image";
import countries from "./countries.json"

export default function Home() {
  const country = countries[Math.floor(Math.random() * countries.length)];
  const options = [country]
  while (options.length < 4) {
    let option = countries[Math.floor(Math.random() * countries.length)];
    if (options.some(opt => opt.country === option.country)) {
      continue
    }
    options.push(option)
  }
  options.sort(() => Math.random() - 0.5)
  return (
      <div>
        <h1>Where are we?</h1>
          <Image
              src={country.svg}
              alt={"Where are we?"}
              width={200}
              height={200}
          />
          {
            options.map((option, i) => (
                <button key={i}
                 >
                  {option.country}
                </button>
            ))
          }
      </div>
  )
}
