import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './pages/RegistrationForm '
import app from './Firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Home from './pages/Home'


function App() {

  return (
    <>
     <Home />
     <ToastContainer></ToastContainer>
    </>
  )
}

export default App
