import React,{useEffect, useState} from 'react'
import Recepie from './recepie';
import logo from './logo.svg';
import './App.css';

function App() {
  //  appID = 'a74f3430';
  //  appKey = 'edcd075bc4125e2dfb3f6b94a84d5993';

  const [recepies, setRecepies] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(()=>{
    getRecepies()
  }, [query])

  const getRecepies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=a74f3430&app_key=edcd075bc4125e2dfb3f6b94a84d5993`);
    const data = await response.json();

    setRecepies(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    
  }

const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch('')
}

  return (
    <div className="App">
      <form onSubmit={getSearch}className="search-form" action="">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button  type="submit" className="search-button">Serch</button>
      </form>
      {recepies.map(recepie=>(
        <Recepie 
        key={recepie.recipe.label}
        title={recepie.recipe.label} calories={recepie.recipe.calories} imag={recepie.recipe.image}/>
      ))}
    </div>
  );
}

export default App;
