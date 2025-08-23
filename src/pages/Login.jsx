// Login.jsx
import React, { useState } from "react";
import { FaEnvelope, FaEyeSlash, FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import BG from '../assets/img/BG1.jpg'
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Slide, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userInfo } from "../slice/UserInfoSlice";

const Login = () => {
  const auth = getAuth();

  const dispatch =useDispatch()
  const navigate = useNavigate()
  const[error,setError]=useState('')
 const[showPassword, setShowPassword] = useState(false)
     // regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const [formData,setFormData]=useState({
    email:'',
    password:'',
    emailError:'',
    passwordError:''   
   })

   const handleLogin =()=>{
     if(!formData.email || !formData.password) return setError('All feilds must be filled')
     if(!emailRegex.test(formData.email)) return setError('Email is not valid')
     if(!passwordRegex.test(formData.password)) return setError('invalid password')
     console.log('done')

     signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log(user)
              // ...
              if(user.emailVerified === false) return toast.warn('Your email is not verified', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Slide,
                  });


              dispatch(userInfo(user))
              localStorage.setItem('userInfo' , JSON.stringify(user))
              navigate('/notes')
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode)
              // error msg
              toast.warn('Your email or password is incorrect!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
                });
            });

   }
  return (
    <div style={{background:`url(${BG})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Please log in to your account
        </p>

        <p className="text-red-500 text-center">{error}</p>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input onChange={(e)=>setFormData((prev)=>({...prev,email:e.target.value}))}
              type="email"
              placeholder="Enter your email"
              className="flex-1 outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
            <FaLock className="text-gray-400 mr-3" />
            <input onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="flex-1 outline-none text-gray-700"
            />
            {
              showPassword ?
              <FaEyeSlash onClick={()=>setShowPassword(!showPassword)} />
              :
              <FaEye onClick={()=>setShowPassword(!showPassword)} className="text-gray-400 cursor-pointer" />

            }
          </div>
        </div>

        {/* Login Button */}
        <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;