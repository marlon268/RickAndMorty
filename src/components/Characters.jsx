import { useState, useEffect, useReducer, useMemo } from "react";
import "../styles/Characters.css";

const initialState = {
  favorites: [],
};

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
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleClickAdd = (favorite) => {
    dispatch({ type: "APP_TO_FAVORITE", payload: favorite });
  };
  const handleClickRemove = (id) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  };

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
      <div className="Characters">
        {characters.map((character) => (
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

// ips hopital al frente de asotrumas, antes de las 5
