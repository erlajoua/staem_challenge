import React, { useEffect, useState } from 'react';

import './App.css';

import { Carousel } from './components/carousel'
import { Header } from './components/header'
import { List } from './components/list'

import { getGames } from './utils/supabase';
import { DEFAULT_OPTIONS } from './utils/const';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames(setGames, DEFAULT_OPTIONS);
  }, [])

  return (
    <div className="App">
      <Header />
      {games.length > 0 && 
        <>
          <Carousel games={games} />
          <List games={games} />
        </>
      }
    </div>
  );
}

export default App;
