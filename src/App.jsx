import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard =[
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function printGameBoard(currentBoard) {
  for(const row of currentBoard){
    let rowValue="";
    for(const col of row){
      rowValue+=",";
      rowValue+=col;
    }
    console.log(rowValue);
  }
}

function App() {
  const [players, setPlayers] = useState({
    X : "Player 1",
    O : "Player 2" 
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = [...initialGameBoard.map(array=>[...array])];

  for (const turn of gameTurns){
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  }
  // printGameBoard(gameBoard);

  let winner = null;
  for (const combination of WINNING_COMBINATIONS){
    const firstWinningSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondWinningSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdWinningSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstWinningSymbol && 
      firstWinningSymbol === secondWinningSymbol && 
      firstWinningSymbol === thirdWinningSymbol){
        winner = players[firstWinningSymbol];
        // console.log(winner);
        break;
    }
  }

  const hasDraw = gameTurns.length == 9 && !winner;

  function switchPlayers(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { key:rowIndex+""+colIndex, 
          square: {row: rowIndex, col: colIndex}, 
          player: currentPlayer},
        ...prevTurns];

      return updatedTurns;
    })
  }

  function reset(){
    setGameTurns([]);
  }

  function handleSavePlayerName(symbol, playerName){
    setPlayers(prevPlayers => ( 
      {
        ...prevPlayers,
        [symbol] : playerName,
      }
    ));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onSave={handleSavePlayerName} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onSave={handleSavePlayerName} />
        </ol>
        {(winner || hasDraw) && <GameOver onClick={reset} winner={winner} />}
        <GameBoard onSelectSquare={switchPlayers} board={gameBoard}/>
      </div>
      <Logs turns={gameTurns}/>
    </main>
  );
}

export default App
