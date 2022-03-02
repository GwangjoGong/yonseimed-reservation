import './reset.css';

import React from 'react';

import { Firebase } from './firebase';
import { LoggedInRoutes, LoggedOutRoutes } from './routes';

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};
