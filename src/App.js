import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    /*
    Llamarás calculateWinner(squares) a la función Board del componente handleClick 
    para comprobar si un jugador ha ganado.
    */

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // nextSquares[i] = "X";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  /*
  Para avisar a los jugadores cuando el juego ha terminado, puedes mostrar 
  texto como "Ganador: X" o "Ganador: O". Para hacerlo, agregará una sección 
  status al componente Board. 
  
  El estado mostrará el ganador si el juego ha terminado y si el juego continúa, 
  mostrarás qué jugador es el siguiente turno
  */
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
Ahora que los jugadores pueden turnarse, querrás mostrar cuándo se gana el 
juego y no hay más turnos que hacer. Para hacer esto, agregará una función 
auxiliar llamada calculateWinnerque toma una matriz de 9 cuadrados, busca 
un ganador y devuelve 'X', 'O'o nullsegún corresponda. 

No importa si define calculateWinnerantes o después de Board. 
*/

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
    /* 
    const [a, b, c] = lines[i];
    Desestructura el array en la posición i del array lines. 
    
    Cada elemento de lines es en sí mismo un array de tres números que 
    representan las posiciones en el tablero que deben ser evaluadas para 
    determinar si hay un ganador. 

    a, b y c ahora son variables que contienen esas tres posiciones.


    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    Comprueba si la posición 'a' en el array squares tiene un valor 
    (es diferente de null, undefined, false, 0, o una cadena de texto vacía) 
    y si el valor en squares[a] es igual al valor en squares[b] y al valor 
    en squares[c]. 
    
    Si estas condiciones son verdaderas, significa que hay tres símbolos iguales 
    en línea, y por lo tanto, hay un ganador. 

    return squares[a];
    En caso de que haya un ganador, la función devuelve el símbolo que ha ganado 
    (puede ser 'X' o 'O').
    */ 
  }
  
  return null;
}
/*
La función calculateWinner() se encarga de verificar si hay un ganador en 
el juego, basándose en el estado actual del tablero representado por el 
array squares.

Primero, se define un array llamado lines, que contiene todas las combinaciones 
posibles de índices en el tablero que podrían formar una línea ganadora. 

Cada subarray en lines representa una línea posible. Por ejemplo, [0, 1, 2] 
indica que si los valores en las posiciones 0, 1 y 2 del array squares son 
iguales, entonces hay un ganador.

  [0, 1, 2]   O O O
  [3, 4, 5]   O O O  
  [6, 7, 8]   O O O

  [0, 3, 6]
   O
   O
   O   

  [1, 4, 7]
      O
      O
      O

  [2, 5, 8]
         O
         O
         O

  [0, 4, 8]
   O
      O
         O

  [2, 4, 6]
         O
      O
   O
  
Luego, la función calculateWinner() recorre cada una de estas líneas posibles 
mediante un bucle for. Para cada línea, se extraen los índices a, b y c. 

La función verifica si en el array squares, los valores en estas posiciones 
son todos iguales y no son nulos (indicando que una ficha ha sido colocada 
en esas posiciones). 

Si esta condición se cumple, se retorna el valor de la ficha ganadora 
(ya sea 'X' o 'O'), en caso contrario la función retorna null.
*/