import { useState } from 'react';

/*
Almacenamiento de un historial de movimientos

Si mutaste elsquares matriz, implementar el viaje en el tiempo sería muy difícil.

Sin embargo, slice() crea una nueva copia de la matriz squares después de cada 
movimiento y la tratabas como inmutable. Esto le permitirá almacenar todas las 
versiones anteriores delsquares matriz y navegar entre los giros que ya han ocurrido.

Almacenará las matrices squares anteriores en otra matriz llamada history, que 
almacenará como una nueva variable de estado. 

La matriz history representa todos los estados del tablero, desde el primero 
hasta el último movimiento, y tiene una forma como esta:

[
  // Before first move
  [null, null, null, null, null, null, null, null, null],
  // After first move
  [null, null, null, null, 'X', null, null, null, null],
  // After second move
  [null, null, null, null, 'X', null, null, null, 'O'],
  // ...
]
*/

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// export default, este ya nos es el componente de nivel superior 
// del archivo: index.js, ahora es Game()
function Board({ xIsNext, squares, onPlay }) {
  /*
  El componente Board está completamente controlado por los props que recibe. 
  Cambiamos el componente Board para que admita tres props: xIsNext, squares y 
  una nueva función onPlay() que Board puede llamar con la matriz de cuadrados 
  actualizada cuando un jugador realiza un movimiento.

  El componente Board está totalmente controlado por los props que le pasa el 
  componente Game. 
  */

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


/*
Creamos un nuevo componente de nivel superior llamado Game para mostrar una 
lista de movimientos pasados. Ahí es donde colocarás elhistory estado que 
contiene todo el historial del juego.

Colocar el estado history en el componente Game le permitirá eliminar el 
estado squares de su componente secundario Board. Así como “levantó el estado” 
del componente Square al componente Board, ahora lo elevará del componente Board
al nivel superior Game. 

Esto le da al componente Game control total sobre los datos de Board, y le permite 
indicarle que Board renderice giros anteriores desde history.
*/

export default function Game() {

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  /*
  agregamos los estados para rastrear qué jugador es el siguiente 
  y el historial de movimientos.

  [Array(9).fill(null)] es una matriz con un solo elemento, que a su vez es 
  una matriz de 9 nulls.
  */

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  /*
  Creamos una función handlePlay() dentro del componente Game que será llamada 
  por el componente Board para actualizar el juego. Pase xIsNext y currentSquares 
  como props de handlePlay para el componente Board.
  

  La función handlePlay() necesita actualizar el estado de Game para activar 
  una nueva representación, pero ya no tiene una función setSquares a la que 
  pueda llamar; ahora está usando la variable de estado history para almacenar 
  esta información. Querrá actualizar history agregando la matriz squares 
  actualizada como una nueva entrada del historial. 
  
  También desea alternar xIsNext, tal como solía hacer Board.
  */

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
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