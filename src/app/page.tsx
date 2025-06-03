'use client'

import buildInfo from "./build.json"
import countries from "./countries.json"
import {useState} from "react";

const buildDate = new Date(buildInfo.buildTime).toLocaleDateString("sv-SE")
const buildDateTime = new Date(buildInfo.buildTime).toLocaleString("sv-SE")

interface Country {
    name: string,
    svg: string,
}

interface GameState {
    country: Country,
    options: Country[],
    answer: Country | undefined
}

function newState(): GameState {
    const country = countries[Math.floor(Math.random() * countries.length)]
    const tag = country.tags[Math.floor(Math.random() * country.tags.length)]
    const options = [country]
    const candidates = countries.filter(it => it.tags.includes(tag))
    while (candidates.length < 6) {
        const candidate = countries[Math.floor(Math.random() * countries.length)]
        if (candidates.some(it => it.name === candidate.name)) {
            continue
        }
        candidates.push(candidate)
    }
    while (options.length < 4) {
        let option = candidates[Math.floor(Math.random() * candidates.length)];
        if (options.some(it => it.name === option.name)) {
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
    const [{country, options, answer}, setState] = useState(newState)
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    const submitAnswer = (answer: Country) => {
        setState(it => ({...it, answer}))
        setTotal(it => it + 1)
        if (answer === country) {
            setScore(it => it + 1)
        }
    }

    const onNewGameClick = function () {
        setState(newState)
        setLoading(true)
    }

    return (
        <div className="root">
            <a className="github-link" href="https://github.com/simonolander/jorden">
                <img src="/github-logo.svg" alt="Source code"/>
            </a>
            <div className="container">
                <img
                    className={`map ${loading ? 'loading' : ''}`}
                    onLoad={() => setLoading(false)}
                    src={country.svg}
                    alt="A map with a region highlighted in green"
                />
                <div className="options">
                    {answer
                        ? (
                            <>
                                {
                                    answer === country
                                        ? (
                                            <p className="success-message">
                                                <span className="correct-country-name">{country.name}</span>, nice!
                                            </p>
                                        )
                                        : (
                                            <p className="error-message">
                                                Not {answer.name}, but <span className="correct-country-name">{country.name}</span>!
                                            </p>
                                        )
                                }
                                <button className="new-game" onClick={() => onNewGameClick()}>Again!</button>
                                <p className="score">You've answered <strong>{score} out of {total}</strong> correctly!</p>
                            </>
                        )
                        : (
                            options.map((option, i) => (
                                <button key={i} onClick={() => submitAnswer(option)}>{option.name}</button>
                            ))
                        )
                    }
                </div>
                <div className="build-info">
                    <p className="commit"><a href="https://github.com/simonolander/jorden">{buildInfo.version}</a></p>
                    <p title={buildDateTime}>{buildDate}</p>
                </div>
            </div>
        </div>
  )
}
