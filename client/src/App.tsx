import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SecretPage from './components/SecretPage';

function App() {
  return (
    <div className="bg-indigo-800">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/secret">
            <SecretPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
