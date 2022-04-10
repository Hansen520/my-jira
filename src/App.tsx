import React from 'react';
import { useAuth } from 'screens/context/auth-context'
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from 'unauthenticated-app/index'
import './App.css';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      { user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
