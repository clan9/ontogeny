import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import SigninAdmin from "./components/SigninAdmin";
import Menu from "./components/Menu";
import MenuForAdmin from "./components/MenuForAdmin";
import ToggleAdmin from "./components/ToggleAdmin";
import DeleteUser from "./components/DeleteUser";
import Expenses from "./components/Expenses";
import AddExpense from "./components/AddExpense";
import EditExpense from "./components/EditExpense";
import Income from "./components/Income";
import AddIncome from "./components/AddIncome";
import EditIncome from "./components/EditIncome";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signinAdmin" component={SigninAdmin} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/menuForAdminUser" component={MenuForAdmin} />
        <Route exact path="/deleteUser" component={DeleteUser} />
        <Route exact path="/toggleAdmin" component={ToggleAdmin} />
        <Route exact path="/expenses" component={Expenses} />
        <Route exact path="/createExpense" component={AddExpense} />
        <Route exact path="/editExpense/:id" component={EditExpense} />
        <Route exact path="/income" component={Income} />
        <Route exact path="/createIncome" component={AddIncome} />
        <Route exact path="/editIncome/:id" component={EditIncome} />
        <Route exact path="/dash" component={Dashboard} />
        <Route exact path="/dashAdmin" component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
