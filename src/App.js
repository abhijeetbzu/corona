import React from 'react';
import './App.css';

import { ToastContainer } from "react-toastify";
import Home from './Home'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000}></ToastContainer>
      <Home></Home>
    </div>
  );
}

export default App;
