import React, { useState, useEffect } from 'react';

import AppRouter from './routes';

import './App.scss';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  // componentDidMount
  useEffect(() => {
    if (sessionStorage.getItem('AuthToken')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <AppRouter loggedIn={loggedIn}/>
    </div>
  );
}

export default App;
