import React from 'react'
import { Link } from 'react-router-dom'
const Help = () => {
  return (
    <div>
      <h2>INSTRUCTIONS</h2>
      <p>Guess the word/phrase before your man gets hung!</p><p> Click any letter to get started. You have 10 tries.</p>
      <p>Available letters and used letters are displayed.</p>
      <Link to='/game'><button className='btn' name = 'game'>BACK TO GAME</button></Link>
    </div>
  )
}

export default Help