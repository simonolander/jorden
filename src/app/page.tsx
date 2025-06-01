'use client'

import countries from "./countries.json"
import {useState} from "react";

interface Country {
    country: string,
    svg: string,
}

interface GameState {
    country: Country,
    options: Country[],
    answer: Country | undefined
}

function newState(): GameState {
    const country = countries[Math.floor(Math.random() * countries.length)]
    const options = [country]
    while (options.length < 4) {
        let option = countries[Math.floor(Math.random() * countries.length)];
        if (options.some(opt => opt.country === option.country)) {
            continue
        }
        options.push(option)
    }
    options.sort(() => Math.random() - 0.5)
    return {
        country,
        options,
        answer: undefined
    }
}

export default function Home() {
    const [state, setState] = useState(newState)
    const {country, options, answer} = state

    const setAnswer = (answer: Country) => {
        setState({...state, answer})
    }

    return (
        <div className="root">
            <div>
                <img src={country.svg} alt="A map with a region highlighted in green"/>
            </div>
            <div>
                {options.map((option, i) => (
                    <button key={i} onClick={() => setAnswer(option)}>{option.country}</button>
                ))}
                {answer &&
                    <>
                        {answer === country ? <div>You got it!</div> : <div>Nope!</div>}
                        <button onClick={() => setState(newState)}>New game</button>
                    </>
                }
            </div>
        </div>
  )
}
