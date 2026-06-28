import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing/Index'
import Signup from './Pages/signup'
import Login from './Pages/login'
import Resorts from './Pages/resorts'
import ResortDetails from './Pages/ResortDetails'
import Profile from './Pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/resorts' element={<Resorts/>}/>
        <Route path='/resort/:id' element={<ResortDetails/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

