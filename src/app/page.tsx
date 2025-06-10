'use client'

import buildInfo from "./build.json"
import countries from "./countries.json"
import {useState} from "react";

const buildDate = new Date(buildInfo.buildTime).toLocaleDateString("sv-SE")
const buildDateTime = new Date(buildInfo.buildTime).toLocaleString("sv-SE")
const countryNameIndexMap = new Map(countries.map((country, index) => [country.name, index]))

interface Country {
    name: string
    svg: string
    tags: string[]
}

interface AnsweredQuestion {
    question: Question
    answer: Country
}

interface Question {
    country: Country
    options: Country[]
}

type History = AnsweredQuestion[]

function chooseRandomCountry(history: History): Country {
    const numberOfCorrectGuesses = countries.map(_ => 0)
    for (const answeredQuestion of history) {
        if (answeredQuestion.question.country.name === answeredQuestion.answer.name) {
            const index = countryNameIndexMap.get(answeredQuestion.question.country.name)!!
            numberOfCorrectGuesses[index] += 1
        }
    }

    const weights = numberOfCorrectGuesses.map(it => Math.pow(0.5, it))
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const probabilities = weights.map(it => it / totalWeight)

    const randomValue = Math.random()
    let accumulatedProbability = 0
    let chosenIndex = 0
    for (let index = 0; index < probabilities.length; index++) {
        const probability = probabilities[index]
        accumulatedProbability += probability
        if (accumulatedProbability >= randomValue) {
            chosenIndex = index
            break
        }
    }

    return countries[chosenIndex]
}

function createRandomQuestion(history: History): Question {
    const country = chooseRandomCountry(history)
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
    options.sort(() => Math.random())
    return {
        country,
        options,
    }
}

export default function Home() {
    const [history, setHistory] = useState<History>([])
    const [question, setQuestion] = useState(() => createRandomQuestion(history))
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [answer, setAnswer] = useState<Country>()
    const {country, options} = question

    const submitAnswer = (answer: Country) => {
        setHistory(it => [...it, {question, answer}])
        setAnswer(answer)
        setTotal(it => it + 1)
        if (answer === country) {
            setScore(it => it + 1)
        }
    }

    const onNewGameClick = function () {
        const nextQuestion = createRandomQuestion(history);
        setQuestion(nextQuestion)
        setAnswer(undefined)
        setLoading(nextQuestion.country.name !== question.country.name)
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
