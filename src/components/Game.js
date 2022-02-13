import React from 'react'
import Button from './Button'
import Image from './Image'

const Game = (props) => {
    const lettersLeft = props.lettersLeft;
    const lettersLeftButton = lettersLeft.map((letter) =>
    <li key={letter + 'left'}>
        <Button letter={letter} onClick={props.letterClicked}/>
    </li>
    );

    const lettersUsed = props.lettersUsed;
    const letterUsedButton = lettersUsed.map((letter) =>
    <li key={letter+'clicked'}>
        <Button letter={letter}/>
    </li>
    );
    const location = props.location;
  return (
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
        <button className='reset-btn' name = 'reset' onClick={props.reset}>RESET</button>
    </div>
  )
}

export default Game