import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Homepage from './pages/Homepage'
import Demo from './components/demo'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/demo' element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
