import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from '../src/components/form/form'
import './App.css'


function App() {
  return (
    <div> 
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />}/>
        </Routes>
       </BrowserRouter>
    </div>
   
  );
}
export default App
