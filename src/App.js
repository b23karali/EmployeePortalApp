import React from "react";
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

import { BrowserRouter } from "react-router-dom";

const App = () =>  {
  const user = useSelector(selectUser);
  return  <BrowserRouter><div> {user ? <Logout /> : <Login />}</div></BrowserRouter>;

}

export default App;
