function Square({ value }) {
  // indica que al componente Square 
  // se le puede pasar un prop llamado value

  return <button className="square">{ value }</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">

        {/* modifico esta etiqueta: <button className="square">1</button>
            en un nuevo componente 
            mucho mas corto y mas 
            facil de manipular.  */}

        <Square value="1"  />
        <Square value="2"  />
        <Square value="3"  />

        {/* <Square/> paso a ser <Square value="1"/> 
             ya que aqui le pasamos un prop: { value } */}

      </div>
      <div className="board-row">
        <Square value="4"  />
        <Square value="5"  />
        <Square value="6"  />
      </div>
      <div className="board-row">
        <Square value="7"  />
        <Square value="8"  />
        <Square value="9"  />
      </div>
    </>
  );
}