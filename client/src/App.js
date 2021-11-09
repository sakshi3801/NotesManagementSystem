import React, { useContext } from "react";
import { Context } from "./context/Context.js";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navpage.js";
import Homepage from "./components/Homepage.js";
import Profile from "./components/Profile.js";
import About from "./components/About.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Errorpage from "./components/Errorpage.js";
// import { First, Second, Third, Fourth } from "./components/years";
import Ece from "./components/branch/Ece";
import Cse from "./components/branch/Cse";

const App = () => {
  const {user} = useContext(Context);
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">{user ? <Homepage/>: <Login/>}</Route>
        <Route path="/profile">{user ? <Profile/>: <Login/>}</Route>
        <Route path="/about"><About /></Route>
        <Route path="/ece">{user ? <Ece/>: <Login/>}</Route>
        <Route path="/cse">{user ? <Cse/>: <Login/>}</Route>
        <Route path="/login">{user ? <Homepage/>: <Login/>}</Route>
        <Route path="/register">{user ? <Homepage/>: <Register/>}</Route>
        <Route>
          <Errorpage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
