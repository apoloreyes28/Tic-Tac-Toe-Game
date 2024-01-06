import { useState } from 'react';

/*
Cada componente Square mantiene una parte del estado del juego. 
Para comprobar si hay un ganador en un juego de tres en raya, sería necesario 
que Board conozca de alguna manera el estado de cada uno de los 9 componentes Square.

El mejor enfoque es almacenar el estado del juego en el componente principal Board 
en lugar de cada Square. El componente Board puede decirle a cada Square qué mostrar 
pasando un prop, como lo hizo cuando pasó un número a cada cuadrado.

Elevar el estado a un componente principal es común cuando se refactorizan los 
componentes de React.
*/
function Square({ value, onSquareClick }) {
  return (
    // creamos una forma de actualizar el estado
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
  /*
  El componente Square() va recibir el prop: value, del componente Board(). 
  
  Esto requerirá eliminar el seguimiento de estado del componente Square(), 
  el value y el onClick del botón.

  Cada cuadrado ahora recibirá un valueaccesorio que será 'X', 'O' o null
  para cuadrados vacíos.
  */
}

export default function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  /*
  Declaramos una variable de estado: squares, cuyo nombre predeterminado 
  sea una matriz de 9 valores nulos correspondientes a los 9 cuadrados

  Array(9).fill(null) crea una matriz con nueve elementos y establece cada 
  uno de ellos en null.

  Cada entrada de la matriz corresponde al valor de un cuadrado. 
  Cuando completes el tablero más tarde, la matriz squares se verá así:

  ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
  */

  function handleClick(i) {
    const nextSquares = squares.slice();

    nextSquares[i] = "X";
    // índice del cuadrado a actualizar

    setSquares(nextSquares);
  }
  /*
  La función handleClick() crea una copia de la matriz squares (nextSquares) 
  con el método de JS: slice()

  Llamar a la función setSquares le permite a React saber que el estado del 
  componente ha cambiado. Esto activará una nueva representación de los 
  componentes que usan el estado squares(Board), así como de sus componentes 
  secundarios (los componentes Square que componen el tablero).
  */

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

         {/* 
         Aquí () => handleClick(0) hay una función de flecha, que es una forma 
         más corta de definir funciones. => Cuando se hace clic en el cuadrado, 
         se ejecutará el código después de la "flecha", llamando a handleClick(0).
         */}

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