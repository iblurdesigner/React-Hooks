import React, {useState, useEffect} from 'react'
import '../styles/characters.css'

const Characters = () => {

    const [characters, setCharacters] = useState([])

    useEffect( () => {
        fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => setCharacters(data.results))
    }, [])

    return (
        <div className="Characters">
            {characters.map( character => {
                return(
                    <div className="card">
                        <img src={character.image} alt={character.name}/>
                        <h2>{character.name}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default Characters
