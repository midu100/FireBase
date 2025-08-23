import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './pages/RegistrationForm '
import app from './Firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LayoutOne from './layout/LayoutOne'



function App() {
  const myRoute =createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<LayoutOne />} >
         <Route index element={<Home />} />
         
      </Route>
         <Route path='/login' element={<Login />} />
         <Route path='/register' element={<RegistrationForm />} />
    </Route>
  ))

  return (
    <>
    <RouterProvider router={myRoute} />
     <ToastContainer></ToastContainer>
    </>
  )
}

export default App
