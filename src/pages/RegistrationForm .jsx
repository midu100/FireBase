import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye } from "react-icons/fa";
import BG from '../assets/img/BG1.jpg'
import { FaEyeSlash } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";


const RegistrationForm = () => {
    const auth = getAuth();

    const[showPassword, setShowPassword] = useState(false)
    const[confirmShowPass,setConfirmShowPass] = useState(false)
    const [formData, setFormData]= useState({username:'',email:'',password:'',ConfirmPassword:'',errors:''})

    const [alreadyUser,setAlreadyUser] =useState('')
    const[loading,setLoading]=useState(true)
    // regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    
    // handle-Register
    const handleRegister = (e)=>{
        e.preventDefault()
        if(!formData.username || !formData.email || !formData.password || !formData.ConfirmPassword) return setFormData((prev)=>({...prev,errors:'All feild must be filled-in'}))

            if(!emailRegex.test(formData.email)) return setFormData((prev)=>({...prev,errors:'email is not valid'}))
        if(!passwordRegex.test(formData.password)) return setFormData((prev)=>({...prev,errors:'Choose a Strong Password'}))
        
        if(formData.ConfirmPassword !== formData.password) return setFormData((prev)=>({...prev,errors:'Password does not matched'}))  

            setLoading(!loading)
            
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                

                console.log(user)
                 
                // update profile / username update
                updateProfile(auth.currentUser, { displayName: formData.username, photoURL: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"})
                .then(() => {   
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        console.log('hoise')
                        setLoading(true)

                        toast.info('Email Verification send!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                        });
                                            });
                })
                .catch((error) => {
                // An error occurred
                // ...
                });
                
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                console.log(errorCode)
                setLoading(true)
                if(errorCode === 'auth/email-already-in-use'){
                    console.log('Email already used')
                    setAlreadyUser('Email already used')
                }
            });    
    }



  return (
    <div style={{background:`url(${BG})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Create Your Account</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <p className="text-[18px] font-sans text-red-600 text-center">{formData.errors}</p>
            <p className="text-[18px] font-sans text-red-600 text-center">{alreadyUser}</p>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 focus-within:ring-2 focus-within:ring-indigo-400">
              <FaUser className="text-gray-400 mr-2" />
              <input
                onChange={(e)=>setFormData((prev)=>({...prev,username:e.target.value}))}
                type="text"
                placeholder="Enter your full name"
                className="w-full py-2 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 focus-within:ring-2 focus-within:ring-indigo-400">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
              onChange={(e)=>setFormData((prev)=>({...prev,email:e.target.value}))}
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 focus-within:ring-2 focus-within:ring-indigo-400">
              <FaLock className="text-gray-400 mr-2" />
              <input
              onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full py-2 pr-8 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
              {
                showPassword ?
                <FaEyeSlash onClick={()=>setShowPassword(!showPassword)} />
                :
                <FaEye onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 text-gray-400 " />
              }
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 focus-within:ring-2 focus-within:ring-indigo-400">
              <FaLock className="text-gray-400 mr-2" />
              <input
              onChange={(e)=>setFormData((prev)=>({...prev,ConfirmPassword:e.target.value}))}
                type={confirmShowPass ? 'text' : 'password'}
                placeholder="Re-enter your password"
                className="w-full py-2 pr-8 outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
              {
                confirmShowPass ?
                <FaEyeSlash onClick={()=>setConfirmShowPass(!confirmShowPass)} />
                :
                <FaEye onClick={()=>setConfirmShowPass(!confirmShowPass)} className="absolute right-3 text-gray-400" />
              }
            </div>
          </div>

          {/* Button */}
          {
            loading ?

          <button
            type="submit"
            className="BTN cursor-pointer w-full bg-sky-600 text-white font-medium py-2 rounded-[10px]"
          >
            Register
          </button>

          :

          <button
            type="submit"
            className="BTN cursor-pointer w-full bg-sky-600 text-white font-medium py-2 rounded-[10px]"
          >
            <PulseLoader color="#fff" />
          </button>
          }

          {/* Register Link */}
        <p className="text-center text-gray-600">
           Have an account?{" "}
        
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>

        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
            
