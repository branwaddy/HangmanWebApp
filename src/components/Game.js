import React from 'react'
import Button from './Button'
import Image from './Image'
import { Link } from 'react-router-dom';

const Game = (props) => {
    // Get lettersLeft and map this array as a list of Buttons and pass various props
    const lettersLeft = props.lettersLeft;
    const lettersLeftButton = lettersLeft.map((letter) =>
    <li key={letter + 'left'}>
        <Button letter={letter} onClick={props.letterClicked}/>
    </li>
    );
    // Do the same with lettersUsed
    const lettersUsed = props.lettersUsed;
    const letterUsedButton = lettersUsed.map((letter) =>
    <li key={letter+'clicked'}>
        <Button letter={letter}/>
    </li>
    );
    // Location is location of hangman image
    const location = props.location;
  return (
    /* Render userWord as heading, then image, then lettersLeft, then lettersUsed, then reset buttonwhich links to Home page and
    triggers reset function*/
    <div>
        <h1>{props.userWord}</h1>
        <Image location={location}/>
        <br/>
        <h2>Pick a letter!</h2>
        <ul>{lettersLeftButton }</ul>
        
        <br/>
        <h2>Letters used:</h2>
        <ul>{letterUsedButton}</ul>
        <br />
        <Link to='/'><button className='reset-btn' name = 'reset' onClick={props.reset}>RESET</button></Link>
    </div>
  )
}

export default Game