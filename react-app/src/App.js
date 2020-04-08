import React, { useState, useEffect } from 'react';

import AuthApiService from './api-services/auth.js';

import AppRouter from './routes';

import './App.scss';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  // componentDidMount
  useEffect(() => {
    AuthApiService.getAuth()
    .then(
      (result) => {
        setLoggedIn(true);
      },
      (error) => {
        setLoggedIn(false);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('loggedIn ' + loggedIn);

  return (
    <div className="App">
      <AppRouter loggedIn={loggedIn}></AppRouter>
    </div>
  );
}

export default App;
