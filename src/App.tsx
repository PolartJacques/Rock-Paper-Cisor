import { FunctionComponent, useEffect, useState } from 'react'
import './App.css'
import { Button } from './Components'
var md5 = require('md5')

const DRAW = "Égalité"
const COMPUTER_WIN = "L'ordinateur à gagné"
const PLAYER_WIN = "Vous avez gagné"

enum Choice {
  Pierre = "Pierre",
  Papier = "Papier",
  Ciseaux = "Ciseaux"
}

const matchResult = {
  [Choice.Pierre]: { [Choice.Pierre]: DRAW, [Choice.Papier]: PLAYER_WIN, [Choice.Ciseaux]: COMPUTER_WIN },
  [Choice.Papier]: { [Choice.Pierre]: COMPUTER_WIN, [Choice.Papier]: DRAW, [Choice.Ciseaux]: PLAYER_WIN },
  [Choice.Ciseaux]: { [Choice.Pierre]: PLAYER_WIN, [Choice.Papier]: COMPUTER_WIN, [Choice.Ciseaux]: DRAW },
}

const getRandomChoice = (): Choice => {
  const enumValues = Object.values(Choice) as Choice[]
  return enumValues[Math.floor(Math.random() * enumValues.length)]
}

const App: FunctionComponent = () => {

  const [computerChoice, setComputerChoice] = useState<Choice>(Choice.Ciseaux)
  const [playerChoice, setPlayerChoice] = useState<Choice>(Choice.Ciseaux)
  const [nonce, setNonce] = useState<string>("")
  const [result, setResult] = useState<string | null>("")

  const hash = md5(computerChoice + nonce)
  const isGameOver = result != null;

  const setNewGame = () => {
    setComputerChoice(getRandomChoice())
    setNonce(Math.random().toString().split(".")[1])
    setResult(null)
  }

  const play = (playerChoice: Choice) => {
    if (isGameOver) return
    setPlayerChoice(playerChoice);
    setResult(matchResult[computerChoice][playerChoice])
  }

  useEffect(() => {
    setNewGame()
  }, [])

  return (
    <div className='container'>
      <div className='app'>
        <h1 className='title'>Pierre Papier Ciseaux</h1>
        <p>L'ordinateur à fait son choix...</p>
        <p>{hash}</p>
        {isGameOver ? (
          <div>
            <h2>{result}</h2>
            <p>Vous avez choisi {playerChoice}</p>
            <p>L'ordinateur à choisi {computerChoice}</p>
            <p>nonce : {nonce}</p>
            <p>{computerChoice + nonce} : {hash}</p>
            <Button onClick={setNewGame}>Rejouer</Button>
          </div>
        ) : (
          <div className='buttons'>
            <Button onClick={() => play(Choice.Pierre)}>Pierre</Button>
            <Button onClick={() => play(Choice.Papier)}>Papier</Button>
            <Button onClick={() => play(Choice.Ciseaux)}>Ciseaux</Button>
          </div>
        )}
        </div>
    </div>
  )
}

export default App
