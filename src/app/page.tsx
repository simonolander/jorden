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
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(0)

    const submitAnswer = (answer: Country) => {
        setState(it => ({...it, answer}))
        setTotal(it => it + 1)
        if (answer === country) {
            setScore(it => it + 1)
        }
    }

    return (
        <div className="root">
            <div className="container">
                <img className="map" src={country.svg} alt="A map with a region highlighted in green"/>
                <div className="options">
                    {answer
                        ? (
                            <>
                                {
                                    answer === country
                                        ? (
                                            <p className="success-message">
                                                <span className="correct-country-name">{country.country}</span>, nice!
                                            </p>
                                        )
                                        : (
                                            <p className="error-message">
                                                Not {answer.country}, but <span className="correct-country-name">{country.country}</span>!
                                            </p>
                                        )
                                }
                                <button className="new-game" onClick={() => setState(newState)}>Again!</button>
                                <p className="score">You've answered <strong>{score} out of {total}</strong> correctly!</p>
                            </>
                        )
                        : (
                            options.map((option, i) => (
                                <button key={i} onClick={() => submitAnswer(option)}>{option.country}</button>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
  )
}
