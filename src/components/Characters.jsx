import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import "../styles/characters.css";
import { Search } from "./Search";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  //use Reducer
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  //use memo
  const [search, setSearch] = useState("");
  //use Ref
  const searchInput = useRef(null);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  //use MEMO
  //   const handleSearch = () => {
  //     setSearch(searchInput.current.value);
  //   };

  //use CallBack reempaza el handleSearch de use MEMO para optimizar
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  // const filteredUsers = characters.filter( (user) => {
  //     return user.name.toLowerCase().includes(search.toLowerCase())
  // })

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="Characters">
      {favorites.favorites.map((favorite) => {
        return <li key={favorite.id}>{favorite.name}</li>;
      })}

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      {filteredUsers.map((character) => {
        return (
          <div className="item" key={character.id}>
            <div className="card">
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <button type="button" onClick={() => handleClick(character)}>
                Agregar a Favorito
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Characters;
