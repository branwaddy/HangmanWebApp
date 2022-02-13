import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <h1>HANGMAN</h1>
        <Link to='/help'><button className='btn' name = 'help'>HELP</button></Link>
    </div>
  )
}

export default Header