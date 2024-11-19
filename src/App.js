import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';

const tiles = ["tile-1", "tile-2", "tile-3", "tile-4"]

function App() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [userPlayed, setUserPlayed] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const addColor = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * tiles.length);
    const nextTile = tiles[randomIndex];

    setSequence((prevSequence) => [...prevSequence, nextTile])
  }, [setSequence]);

  const playSequence = useCallback(() => {
    sequence.forEach((tile, index) => {
      let currentTile = document.getElementById(tile);

      const delay = index * 600;

      setTimeout(() => {
        currentTile.classList.add(tile + "-active");
        playSound(tile);
      }, delay);

      setTimeout(() => {
        currentTile.classList.remove(tile + "-active");
      }, delay + 600);
    });
  }, [sequence]);

  const addUserSequence = (tile) => {
    setUserSequence((prevSequence) => [...prevSequence, tile]);
  }

  const resetGame = useCallback(() => {
    setScore(0);
    setSequence([]);
    setUserSequence([]);
    setUserPlayed(false);
    setTimeout(() => {
      setGameOver(false);
    }, 1000);
  }, [setSequence, setUserSequence, setUserPlayed]);

  const playSound = (tile) => {
    const audio1 = new Audio('tile1.mp3');
    const audio2 = new Audio('tile2.mp3');
    const audio3 = new Audio('tile3.mp3');
    const audio4 = new Audio('tile4.mp3');

    switch (tile) {
      default:
        return;
      case "tile-1":
        audio1.play();
        return;
      case "tile-2":
        audio2.play();
        return;
      case "tile-3":
        audio3.play();
        return;
      case "tile-4":
        audio4.play();
        return;
    }
  };

  const handleClick = (tile) => {
    playSound(tile);
    addUserSequence(tile);
  }

  const playAgain = useCallback(() => {
    let gameOver = document.getElementById("game-over");
    gameOver.classList.add("game-over-inactive");
    gameOver.classList.remove("game-over-active");

    resetGame();
  }, [resetGame]);

  const hideInstructions = useCallback(() => {
    let instructions = document.getElementById("instructions");
    instructions.classList.remove("instructions-active");
    instructions.classList.add("instructions-inactive");

    setGameOver(false);
    playAgain();
  }, [playAgain, setGameOver]);

  useEffect(() => {
    let currentTile = userSequence.length - 1;

    if (userSequence[currentTile] !== sequence[currentTile]) {
      let gameOver = document.getElementById("game-over");

      gameOver.classList.add("game-over-active");
      gameOver.classList.remove("game-over-inactive");
      setGameOver(true);

    } else if (userSequence.length === sequence.length && sequence.length > 0) {
      setScore((prevScore) => prevScore + 1);
    }
  }, [userSequence, sequence, resetGame]);

  useEffect(() => {
    if (userSequence.length === sequence.length && !userPlayed && !gameOver) {
      addColor();
      setUserPlayed(true);
      setUserSequence([]);
    }
    console.log("Sequence: ", sequence);
    console.log("User Sequence: ", userSequence);
  }, [userSequence, sequence, addColor, userPlayed, gameOver]);

  useEffect(() => {
    if (userPlayed && !gameOver) {
      setUserPlayed(false);
      setTimeout(playSequence, 1000);
    }
  }, [userPlayed, playSequence, gameOver]);

  return (
    <div className="App">
      <div className='background-image'>
        <div className="title">
          <h1 data-text="Simon Says">Simon Says</h1>
        </div>

        <div className="controls">
          <p className="score">Score: {score}</p>
          <p className="audio">
            <FontAwesomeIcon icon={faVolumeMute} size="2x" />
          </p>
        </div>

        <div className="board">
          <div className="board-row">
            <button id="tile-1" className="tile" onClick={() => handleClick("tile-1")}></button>
            <button id="tile-2" className="tile" onClick={() => handleClick("tile-2")}></button>
          </div>

          <div className="board-row">
            <button id="tile-3" className="tile" onClick={() => handleClick("tile-3")}></button>
            <button id="tile-4" className="tile" onClick={() => handleClick("tile-4")}></button>
          </div>
        </div>

        <div className='game-over game-over-inactive' id='game-over'>
          <p className='game-over-text'>Game Over</p>
          <button className='play-again' onClick={playAgain}>Play Again</button>
        </div>

        <div className="instructions instructions-active" id="instructions">
          <p className="instructions-title">How To Play</p>
          <img src="simon-says-logo.png" alt="simon-says-logo" className="simon-says-logo" width={"300px"} />
          <p className="instructions-text">Watch the tiles light up, memorize the sequence, and tap them back in the same order!</p>
          <button className="play-again" onClick={hideInstructions}>Start Game</button>
        </div>

        <div className="reset-control">
          <button className="reset-button" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

