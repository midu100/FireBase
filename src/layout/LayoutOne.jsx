import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Home from '../pages/Home'
import RegistrationForm from '../pages/RegistrationForm '
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const LayoutOne = () => {
  const reduxData = useSelector((state)=>state.currentUser.value)
  const navigate = useNavigate()

  useEffect(()=>{
    if(reduxData === null){
      navigate('/login')
    }
  },[])
  return (
    <div>
         <Navbar />
        <Outlet />
    </div>
  )
}

export default LayoutOne