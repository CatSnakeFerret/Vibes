import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes, // use Routes instead of Switch
  Route,
  Navigate,
} from 'react-router-dom';
import LoginSignup from './LoginSignup.jsx';
import UserPage from './UserPage.jsx';
import SearchPage from './SearchPage.jsx'; // import the SearchPage

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('AL3');

  /*fetch('/api/checkIfReturningUser')
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      //setUsername(data);
      setIsLoggedIn(true);
    });

  /*.then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(true);
        setUsername(data);
      });*/

  return (
    <Router>
      <Routes>
        <Route
          path='/login-signup'
          element={
            !isLoggedIn ? (
              <LoginSignup
                onLogin={() => setIsLoggedIn(true)}
                setUser={(name) => setUsername(name)}
              />
            ) : (
              <Navigate to='/user' replace />
            )
          }
        />
        <Route
          path='/user'
          element={
            isLoggedIn ? (
              <UserPage username={username} />
            ) : (
              <Navigate to='/login-signup' replace />
            )
          }
        />
        {/* add the route for SearchPage */}
        <Route
          path='/search'
          element={<SearchPage username={username} />}
        />{' '}
        <Route path='*' element={<Navigate to='/login-signup' replace />} />
      </Routes>
    </Router>
  );
};

export default App;
