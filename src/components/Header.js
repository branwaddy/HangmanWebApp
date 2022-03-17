import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  // Header contains name of game as heading and then a help button which links to help route
  return (
    <div className='header'>
        <h1>HANGMAN</h1>
        <Link to='/help'><button className='btn' name = 'help'>HELP</button></Link>
    </div>
  )
}

export default Header