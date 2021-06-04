import {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import "../styles/Characters.css";
import Search from "./Search";
import useCharacters from "../hooks/useCharacters.js"

const initialState = {
  favorites: [],
};

const API = 'https://rickandmortyapi.com/api/character'

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "APP_TO_FAVORITE":
      if (state.favorites.find((item) => item.id === action.payload.id)) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (items) => items.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);


  // Usamos nuestro custom hook creado con useState y useEfect para separar la
  // logica de nuestros componentes
  const characters = useCharacters(API)

  
  // useEffect se ejecuta despues del primer renderizado de la pagina
  // es el lugar ideal para hacer un llamada a una api. Este recibe dos
  // parametros el primero lo que va hacer y el segundo lo que va a estar
  // escuchando a que cambie para volverse a ejecutar
  /* useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []); */


  // Esta funcion nos añade al array de favorites el character que le se pase
  // por parametro (favorite) y lo añade con la ayuda de el useReducer
  const handleClickAdd = (favorite) => {
    dispatch({ type: "APP_TO_FAVORITE", payload: favorite });
  };


  // Esta funcion elimina los personajes de favoritos mediante el id
  // que estos tengan
  const handleClickRemove = (id) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  };



  // Esta funcion me captura el evento onChange y lo incerta en el estado
  // search creado anteriormente. Cambios el evento onChange con el uso de
  // useRef para capturar lo que se escribe en el input de una forma mas amigable
  // y con menos bugs
  /* const handleSearch = () => {
    setSearch(searchInput.current.value);
  }; */



  //Cada vez que hacemos un render se vuelve a construir las referencias a las
  // funciones La solución para este problema es usar useCallback el cual solo
  // genera una referencia para una función, es decir que memoriza la funcion
  // a través de la lista de dependencias que mandamos cuando lo generamos,
  // estamos indicando cuando debe volver a memorizar esa función, es decir cuando 
  // cambien esos valores, esto es útil cuando se transfieren callbacks a 
  //componentes hijos optimizados que dependen de la igualdad de referencia 
  //para evitar renders innecesarios
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);


  // Esta funcion toma lo que se a introducido en el search y filtra los characters
  // por su name que este search tenga incluido ignorando mayusculas
  /* const filteredUsers = characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }); */


  // Usamos useMemo para hacer memoizacion, esto nos permite almacenar los resultados de una función
  // para que, en caso de enviar los mismo argumentos que antes, ésta no haga los cálculos otra
  // vez sino que devuelva el resultado que registró antes.
  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <main>
      <h1>{favorites.favorites.length ? "Favorites" : ""}</h1>
      <div className="Characters-favorites">
        {favorites.favorites.map((favorite) => (
          <div key={favorite.id} className="Character-favotire">
            <h5>{favorite.name}</h5>
            <img
              className="favorites"
              src={favorite.image}
              alt={favorite.name}
            />
            <button
              className="boton-borrar"
              type="button"
              onClick={() => handleClickRemove(favorite.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <h1>Characters</h1>
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      <div className="Characters">
        {filteredUsers.map((character) => (
          <div key={character.id} className="Characters-container">
            <img src={character.image} alt="" />
            <h1>{character.name}</h1>
            <h5>Especies: {character.species}</h5>
            <h5>Status: {character.status}</h5>
            <h5>Origin: {character.origin.name}</h5>
            <button
              type="button"
              onClick={() => handleClickAdd(character)}
              className="boton-añadir"
            >
              add to Favorites
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Characters;

// En la mayor parte del tiempo no deberias molestarte en optimizar re-renders
// inncesarios con useMemo. Usalo siempre en cuando el rendering toma una gran
// cantidad de tiempo como en interacciones muy altas (Graphs/Charts/Animations/etc.)
