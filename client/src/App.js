import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Menu from "./components/Menu";
import Expenses from "./components/Expenses";
import AddExpense from "./components/AddExpense";
import Income from "./components/Income";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/expenses" component={Expenses} />
        <Route exact path="/createExpense" component={AddExpense} />
        <Route exact path="/income" component={Income} />
        <Route exact path="/dash" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
