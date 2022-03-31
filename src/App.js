import './App.scss';
import Die from './components/die';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const die1 = dice[0].value
    const allSameValue = dice.every(die => die.value === die1)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push({ value: Math.floor(Math.random() * 7), isHeld: false, id: nanoid() })
    }
    return arr
  }

  function rollDice() {
    if (tenzies) {
      setRolls(0)
      setTenzies(prev => !prev)
      setDice(allNewDice())
    } else {
      setRolls(prev => prev + 1)
      setDice(oldDice => oldDice.map(die => {
        return !die.isHeld ? { ...die, value: Math.floor(Math.random() * 7) } : die
      }))
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id
        ? { ...die, isHeld: !die.isHeld }
        : die
    })
    )
  }

  const diceElements = dice.map(die => {
    return <Die
      id={die.id}
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  })

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-wrapper">
          {diceElements}
        </div>
        <button className="roll-btn" onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
        <span className='rolls'>{rolls} Roll{rolls === 1 ? null : 's'}</span>
      </main>
    </div>
  );
}

export default App;
