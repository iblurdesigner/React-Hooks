import React, {useState, useEffect, useReducer, useMemo} from 'react'
import '../styles/characters.css'

const initialState = {
    favorites: []
}

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        default:
            return state;
    }
}

const Characters = () => {

    const [characters, setCharacters] = useState([]);
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

    useEffect( () => {
        fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => setCharacters(data.results))
    }, [])

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
    }

    return (
        <div className="Characters">

            {favorites.favorites.map(favorite => {
                return (
                    <li key={favorite.id}>
                        {favorite.name}
                    </li>
                )
            })}

            {characters.map( character => {
                return(
                    <div className="item" key={character.id}>
                        <div className="card" >
                            <img src={character.image} alt={character.name}/>
                            <h3>{character.name}</h3>
                            <button type="button" onClick={() => handleClick(character)}>Agregar a Favorito</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Characters
