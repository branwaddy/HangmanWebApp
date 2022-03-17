import raw from './textFiles/dictionary.txt'
import Game from './components/Game';
import Help from './components/Help';
import Home from './components/Home';
import { useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  // List of characters in alphabet
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
                    "V", "W", "X", "Y", "Z", "-"];
  // States
  // State for letters chosen by user, empty array as default 
  const [lettersUsed, setLettersUsed] = useState([]);
  // State for letters the user hasnt chosen, whole alphabet as default
  const [lettersLeft, setLettersLeft] = useState(alphabet);
  // State for word to be guessed
  const [desiredWord, setDesiredWord] = useState("");
  // State for how much of the word has been guessed by user, will start as a series of hyphens which will be displayed on page
  const [userWord, setWord] = useState("");
  // State for url of hangman image that is being displayed, default is first image
  const [currentImg, setImg] = useState(require("./images/state1.GIF"));
  // State for counter of how many turns user has had
  const [turns, setTurns] = useState(0);
  // State stores correct letters guessed as string
  const [correctLetters, setCorrect] = useState("");

  // Async function
  const asyncFunction = async () => {
    // Awaits fetch of list of words, then uses list to make desiredWord. desiredWord must be converted to uppercase
    const wordsList = await fetchList();
    const loweCaseWord = makeDesiredWord(wordsList);
    const newWord = loweCaseWord.toUpperCase();
    // Set state of desiredWord
    setDesiredWord(newWord);
  }

  // Do asyncFunction on render of page
  useEffect(() =>{
    asyncFunction();
  }, []);

  // startGame triggers on click of start button, set userWord state that will be displayed as hyphens
  function startGame(){
    setWord(makeUserWord(desiredWord));
  }

  // Fetch dictionary, return as array
  async function fetchList() {
    // 'raw' imported in line 1 from dictionary.txt file, fetched and converted to text and then to array using split 
    const r = await fetch(raw)
    const text = await r.text();
    const newText = text.split("\n");
    return newText;
  }

  // Uses dictionary and chooses and returns a random word from this array
  function makeDesiredWord(wordsList) {
    const randomElement = wordsList[Math.floor(Math.random() * wordsList.length)];
    return randomElement;
  }

  // Create the userWord using desiredWord
  function makeUserWord (desiredWord) {
    // Create a series of hypens that is as long as desiredWord
    let userWordStr = "_".repeat(desiredWord.length);
    // Convert string to array and return
    const userWord = Array.from(userWordStr);
    return userWord
  }
  // For displaying userWord, iterate through userWord and add a space between each character as the hyphens display better
  function userWordShow (userWord) {
    let userWordShow = "";
    for (let i=0; i < userWord.length; i++) {
      userWordShow += userWord[i] + " ";
    }
    return userWordShow;
  }
  // Function gets the letter that user has clicked, and then splices it from array and sets the state
  function changeLettersLeft(clickedLetter) {
    let lettersLeftOld = lettersLeft;
    const index = lettersLeftOld.indexOf(clickedLetter);

    lettersLeftOld.splice(index, 1);
    setLettersLeft(lettersLeftOld);
  }

  // Function handles onClick of letter button event
  const letterClicked = (clickedLetter) => {
    // Check if letter is in desiredWord
    if (desiredWord.includes(clickedLetter.value)) {
      // Build new userWord 
      let newUserWord = "";
      for (let i=0; i < desiredWord.length; i++) {
        /* Iterate through desiredWord and check if EITHER the iterated letter is the newly guessed letter (clickedletter) OR
        if the letter has already been guessed (is in correctLtters).*/
        if (desiredWord[i] === clickedLetter.value || correctLetters.includes(desiredWord[i])) {
          // Then add iterated letter to newUserWord
          newUserWord += desiredWord[i];
        }
        else {
          // Else add hyphen
          newUserWord += "_";
        }
      }
      // If there are no hypens in newUserWord (all letters have been guessed), declare user a winner
      if(!newUserWord.includes("_")) {
        alert("Congratulations! You win...")
      }
      // Add clicked letter to correctLetters 
      setCorrect(correctLetters + clickedLetter.value);
      // Set newUserWord in state
      setWord(newUserWord);
    }
    // If clickedLetter is wrong, go to next turn
    else {
      // Add 1 to turn counter
      const newTurn = turns+1;
      setTurns(newTurn);
      // Set new hangman image
      setImg(require("./images/state" + (newTurn + 1) + ".GIF"));
      // Check if 10 turns have been takem, if so the user loses and declare the game over
      if (newTurn === 10) {
        alert("Game over!");
        // Show word
        setWord(desiredWord);
      }
    }
  // Whether user guessed right or not, clicked letter gets removed from lettersLeft and added to letterUsed
  changeLettersLeft(clickedLetter.value);
  let newLettersUsed = lettersUsed;
  newLettersUsed.push(clickedLetter.value);
  }

  // On click of reset button, reset all buttons back to default state
  const reset = () => {
    setLettersLeft(alphabet);
    setLettersUsed([]);
    setImg(require("./images/state1.GIF"));
    setTurns(0);
    setCorrect("");
    asyncFunction();
  }
  
  return (
    // Render and establish routes
    <BrowserRouter>
      <div className='container'>
        <Header/>
      </div>
      <Routes>
        <Route path='/game' element={
        <Game userWord = {userWordShow(userWord)} lettersLeft={lettersLeft} lettersUsed={lettersUsed}
        location={currentImg} letterClicked={letterClicked} reset={reset}/>
        }/>
        <Route path='/' element={<Home startGame={startGame}/>}/>
        <Route path='/help' element={<Help/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
