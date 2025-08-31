import React from 'react'
import { MdSearch } from 'react-icons/md'
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoHome } from "react-icons/go";

const Navbar = () => {
  const currentUserData = useSelector((state)=>state.currentUser.value)
  console.log(currentUserData?.displayName)

  const dispatch = useDispatch()

  const handleLogout =()=>{
    localStorage.removeItem('userInfo')
    dispatch(clearUserInfo())
  }

  return (
    <div>
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-600">My Notes</h1>
        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md w-72">
          <MdSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search notes..."
            className="bg-transparent outline-none flex-1"
          />
        </div>
          <div className='flex gap-[20px]'>
            <Link to={'/bin'}><RiDeleteBin6Line className='text-[25px] cursor-pointer'/></Link>
            <Link to={'/'} ><GoHome className='text-[25px] cursor-pointer'/></Link>
          </div>
        <div className='flex items-center gap-[10px]'>
          <div className='IMG w-[40px] h-[40px] bg-gray-200 rounded-full overflow-hidden'><img src={currentUserData?.photoURL} alt='img' /></div>
          <h2 className='text-[17px] font-semibold font-'>{currentUserData?.displayName}</h2>
          <Link to={'/login'}><IoIosLogOut onClick={handleLogout} className='text-3xl text-red-600 cursor-pointer'/></Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar