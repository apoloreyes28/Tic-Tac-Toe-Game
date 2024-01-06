import { useState } from 'react';

// cambie { value } = prop, por useState() = hook, ya que un prop nos permite 
// pasar información estatica, mientras que un hook nos permite recordar cosas.
function Square() {

  const [value, setValue] = useState(null);
  // value almacena el valor y setValue es una función que se puede utilizar para 
  // cambiar el valor. null es el valor inicial para esta variable de estado: value

  function handleClick() {
 // console.log('clicked!');
    setValue('X');
  }
  // declaramos una función que se va ejecutar cada vez que 
  // demos click en el botón (escuche el evento)

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

/*
Al llamar a esta función set() desde un controlador (evento) onClick(), 
le estás diciendo a React que vuelva a renderizarla.


Cada Square() tiene su propio estado: lo almacenado en value para cada Square() 
es completamente independiente de los demás. Cuando llamas a una función set() 
en un componente, React actualiza automáticamente los componentes secundarios
internos también.
*/