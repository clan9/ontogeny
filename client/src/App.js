import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dash" component={Dashboard} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
