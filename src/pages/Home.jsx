import React, { useEffect, useState } from "react";
import { MdAdd, MdSearch, MdDelete, MdEdit } from "react-icons/md";
import BG from '../assets/img/BG1.jpg'
import Navbar from "../components/Navbar";
import SingleNote from "../components/common/SingleNote";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const Home = () => {
  const db = getDatabase();
  
  // reduxData
  const currentUserData = useSelector((state)=>state.currentUser.value)
  console.log(currentUserData)

  const [allColor,setAllColor] = useState('#fff')
  const[inputValue,setInputValue] = useState('')
  const[noteContent,setNoteContent] = useState('')
  const[color,setColor] = useState('fff')

  // const handleColors = (color)=>{
  //   setAllColor(color)
  // }
   





  // Write data / data pathano hosse
  const handleAdd = ()=>{
    console.log('hea')
    set(push(ref(db, 'allNotes/')), {
      noteHead : inputValue,
      noteContent : noteContent,
      noteColor : color,
      creatorId : currentUserData.uid,
      
    })
    setInputValue('')
    setNoteContent('')
  }

  // // Read data / data newar jnno
  // useEffect(()=>{
  //     const starCountRef = ref(db, 'users/');
  //     onValue(starCountRef, (snapshot) => {
  //       const data = snapshot.val();
  //       console.log(snapshot.val())
  //     });
  // },[])

  // delete data
  const handleDelete = ()=>{
    remove(ref(db,'allTodo/'))
  }


  return (
    <div style={{background:`url(${BG})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} className="min-h-screen bg-gray-100">
      {/* Header */}

      {/* Create Note Section */}
      <section  className="max-w-4xl mx-auto px-4  py-[10px] ">
        
        <div  className={`bg-[${color}] rounded-lg shadow p-4 flex justify-between items-center space-x-3`}>
          <div className="flex flex-col gap-[15px] w-[700px]">

            <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} type="text" placeholder="TITLE..." className="border-none w-full outline-none text-[22px] font-bold" />
            <div className={`${inputValue ? 'visible' : 'hidden'} w-full`}>
              <textarea value={noteContent} onChange={(e)=>setNoteContent(e.target.value)} className="outline-none w-full" placeholder="Take Note..."></textarea>
            </div>

          </div>
          <button onClick={()=>handleAdd()} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full">
            <MdAdd size={24} />
          </button>
        </div>

        <div className="flex gap-[10px] items-center mt-[10px] justify-center">
          <p className="text-[24px] font-medium text-[#c94dec]">Changing Colors:</p>
          <button onClick={()=>setColor('#FFF2EB')} className="w-[40px] border border-[#7c7a7a] hover:shadow-[0px_4px_26px_0px_rgba(0,_0,_0,_0.1)] duration-300 h-[40px] rounded-full bg-[#FFF2EB] cursor-pointer"></button>
          <button onClick={()=>setColor('#80D8C3')} className="w-[40px] border border-[#7c7a7a] hover:shadow-[1px_4px_34px_11px_rgba(34,_197,_94,_0.5)] duration-300 h-[40px] rounded-full bg-[#80D8C3] cursor-pointer"></button>
          <button onClick={()=>setColor('#4DA8DA')} className="w-[40px] border border-[#7c7a7a] hover:shadow-[1px_4px_34px_11px_rgba(59,_130,_246,_0.5)] duration-300 h-[40px] rounded-full bg-[#4DA8DA] cursor-pointer"></button>
          <button onClick={()=>setColor('#00FFDE')} className="w-[40px] border border-[#7c7a7a] hover:shadow-[1px_4px_34px_11px_rgba(34,_197,_94,_0.5)] duration-300 h-[40px] rounded-full bg-[#00FFDE] cursor-pointer"></button>
        </div>

      </section>

      {/* Notes Grid */}
      <section className=" mx-auto px-4 pb-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleNote />
      </section>
    </div>
  );
};

export default Home;
