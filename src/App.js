/*
Los componentes de React deben devolver un único elemento JSX y no varios 
elementos JSX adyacentes.
*/

// Square = cuadrado -> Board() = tablero
export default function Board() {
  return (
      // envolver varios elementos JSX adyacentes
    <>
      <div className="board-row">
                  {/* fila */}

        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
                       {/* cuadrado = 1  2  3, inline-elements */}
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
