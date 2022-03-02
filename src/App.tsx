import './reset.css';

import React from 'react';

import { Firebase } from './firebase';
import { LoggedInRoutes, LoggedOutRoutes } from './routes';

export const App: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};
