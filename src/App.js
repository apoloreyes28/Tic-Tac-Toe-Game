import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente Jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


export default function Game() {

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
  }


  /*
  Ya tenemos una serie de movimientos en estado history, por lo que ahora 
  necesitamos transformarlos en una serie de elementos de React. 
  
  En JavaScript, para transformar una matriz en otra, puedes usar el método 
  de matriz :map  

  [1, 2, 3].map((x) => x * 2) // [2, 4, 6]

  Usamos map para transformar los movimientos history en elementos de React 
  que representan botones en la pantalla y mostrarás una lista de botones 
  para "saltar = jump" a movimientos pasados. 
  */

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir a la jugada #' + move;
    } else {
      description = 'Reiniciar el juego';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  /*
  A medida que iteras a través de la matriz history dentro de la función 
  que le pasaste map, el argumento 'squares' pasa por cada elemento de history 
  y el argumento 'move' pasa por cada índice de la matriz: 0, 1,2 ,….

  (En la mayoría de los casos, necesitará los elementos reales de la matriz, 
   pero para representar una lista de movimientos solo necesitará índices).

  Para cada movimiento en el historial del juego de tres en raya, creas un 
  elemento de lista <li>que contiene un botón <button>. 
  
  El botón tiene un onClickcontrolador que llama a una función llamada jumpTo()
  (que aún no se ha implementado).
  */

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {

    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}