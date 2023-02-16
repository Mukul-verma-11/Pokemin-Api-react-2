import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import './components/style.css'


function App() {

  const [pokemons, setPokemons] = useState([])
  const [order, setOrder] = useState('')
  const [search,setSearch] = useState('')
  const [next,setNext] = useState(0)
  
  const getPoke = async () => {
    
    let results = []

    await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=` + `${next}` +`&limit=20`).then(
      async res => {
        for (let a of res.data.results) {
          await axios.get(a.url).then(
            resp => {
              results.push(resp.data)
            }
          )
        }
        setPokemons(results)
      }
    )
  }

  useEffect(() => {
    getPoke()

  }, [next])
  

  // console.log(pokemons);

  const handleNext = () => {
    setNext(next + 20)
  }

  const handleSort = () => {
    const arr = pokemons

    if (order == 'asc') {
      arr.sort((a, b) => {
      return a['name'] > b['name'] ? -1 : 1
    })
    setOrder('des')
  }
  
  else {
    arr.sort((a, b) => {
      return a['name'] > b['name'] ? 1 : -1
    })
    setOrder('asc')
    }

    setPokemons([...arr])
  }

  const handleChange = e => {
    
    setSearch(e.currentTarget.value)

  }

  return (
    <div className="App">

      <button onClick={handleSort} value={search} >Sort</button> <br/>
      <button onClick={handleNext} value={search} >Next</button> <br/>

      <input onChange={handleChange} />
      
      {pokemons.filter(pokemon => pokemon.name.includes(search)).map(pokemon => <Card
        name={pokemon.name}
        image={pokemon.sprites.front_default}
        weight={pokemon.weight}
        height={pokemon.height}
      />)}
      
    </div>
  );
}

export default App;
