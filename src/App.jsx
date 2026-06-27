import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Pages/signup'
import Login from './Pages/login'
import Resorts from './Pages/resorts'
import ResortDetails from './Pages/ResortDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/resorts' element={<Resorts/>}/>
        <Route path='/resort/:id' element={<ResortDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

