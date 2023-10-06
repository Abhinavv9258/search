import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Homepage from './pages/Homepage'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
