
import Game from './components/Game';
import Help from './components/Help';
import Home from './components/Home';
import { useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
                    "V", "W", "X", "Y", "Z"];
  const [lettersLeft, setLettersLeft] = useState(alphabet);
  const [lettersUsed, setLettersUsed] = useState([]);
  const desiredWord = "FANTASTIC";
  const [userWord, setWord] = useState(makeUserWord(desiredWord));
  const [currentImg, setImg] = useState(require("./images/state1.GIF"));
  const [turns, setTurns] = useState(0);
  const [correctLetters, setCorrect] = useState("");

  function makeUserWord (desiredWord) {
    let userWordStr = "_".repeat(desiredWord.length);
    const userWord = Array.from(userWordStr);
    return userWord
  }
  function userWordShow (userWord) {
    let userWordShow = "";
    for (let i=0; i < userWord.length; i++) {
      userWordShow += userWord[i] + " ";
    }
    return userWordShow;
  }
  function changeLettersLeft(clickedLetter) {
    let lettersLeftOld = lettersLeft;
    const index = lettersLeftOld.indexOf(clickedLetter);

    lettersLeftOld.splice(index, 1);
    setLettersLeft(lettersLeftOld);
  }
  const letterClicked = (clickedLetter) => {
    
    if (desiredWord.includes(clickedLetter.value)) {
      let newUserWord = "";
      for (let i=0; i < userWord.length; i++) {
        if (desiredWord[i] === clickedLetter.value || correctLetters.includes(desiredWord[i])) {
          newUserWord += desiredWord[i];
        }
        else {
          newUserWord += "_";
        }
      }
      if(!newUserWord.includes("_")) {
        alert("Congratulations! You win...")
      }
      setCorrect(correctLetters + clickedLetter.value);

      setWord(newUserWord);
    }
    else {
      const newTurn = turns+1;
      setTurns(newTurn);
      setImg(require("./images/state" + (newTurn + 1) + ".GIF"));
      if (newTurn === 10) {
        alert("Game over!");
      }
    }
  changeLettersLeft(clickedLetter.value);
  let newLettersUsed = lettersUsed;
  newLettersUsed.push(clickedLetter.value);
  }

  const reset = () => {
    setLettersLeft(alphabet);
    setLettersUsed([]);
    setWord(makeUserWord(desiredWord));
    setImg(require("./images/state1.GIF"));
    setTurns(0);
    setCorrect("");
  }
  
  return (
    <BrowserRouter>
      <div className='container'>
        <Header/>
      </div>
      <Routes>
        <Route path='/game' element={
        <Game userWord = {userWordShow(userWord)} lettersLeft={lettersLeft} lettersUsed={lettersUsed}
        location={currentImg} letterClicked={letterClicked} reset={reset}/>
        }/>
        <Route path='/' element={<Home/>}/>
        <Route path='/help' element={<Help/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
