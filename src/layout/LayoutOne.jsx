import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Home from '../pages/Home'
import RegistrationForm from '../pages/RegistrationForm '
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const LayoutOne = () => {
  const currentUserData = useSelector((state)=>state.currentUser.value)
  const navigate = useNavigate()

  useEffect(()=>{
    if(currentUserData === null){
      navigate('/')
    }
  },[])
  return (
    <div>
     
        <Outlet />
    </div>
  )
}

export default LayoutOne