import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {LandingRoute, PrivateRoute} from './Authentication/PrivateRoute'
import Navbar from './uiLayouts/Navbar/Navbar'
import Landing from './Pages/Landing/Index'
import Signup from './Pages/signup'
import Login from './Pages/login'
import Home from './Pages/home/Index'
import Resorts from './Pages/resorts'
import ResortDetails from './Pages/ResortDetails'
import Profile from './Pages/Profile';
import Cart from './Pages/Cart/Cart'
import Edit from './Pages/Edit/Edit'
import Success from './Pages/Sucess/Sucess'
import Footer from './uiLayouts/Footer/Footer'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={
          <LandingRoute>
            <Landing />
          </LandingRoute>
          } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/resorts' element={
          <PrivateRoute>
            <Resorts />
          </PrivateRoute>
        } />
        <Route path='/resort/:id' element={
          <PrivateRoute>
            <ResortDetails />
          </PrivateRoute>
        } />
        <Route path='/cart' element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }/>
        <Route path='/edit' element={
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        }/>
        <Route path='/success' element={
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        }/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

