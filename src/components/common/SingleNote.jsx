import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import Home from '../../pages/Home';
import NoteHead from './NoteHead';
import { editInfo } from '../../slice/UserInfoSlice';
import { LuPin } from "react-icons/lu";
import { LuPinOff } from "react-icons/lu";

const SingleNote = () => {
  const db = getDatabase();
  const currentUserData = useSelector((state)=>state.currentUser.value)
  const [allNote,setAllNote]= useState([])
  const [edit , setEdit] = useState('')
  console.log(edit)
  const[pin, setPin]=useState({})

  const [loading, setLoading] = useState(true)


  // ---------------------------------------
  const dispatch = useDispatch()
 

  // read data
  useEffect(()=>{
    const starCountRef = ref(db, 'allNotes/');
       onValue(starCountRef, (snapshot) => {
        console.log(snapshot.val())  //all note er moddhe koiti note royeche
        let myArr = []

        snapshot.forEach((item)=>{
          // console.log(item)
          if(item.val().creatorId === currentUserData.uid){
            myArr.push({Key : item.key , notes : item.val()})
          }
          
        })
        setAllNote(myArr)
        setLoading(false);   // data আসার পর skeleton off

      });
  },[])


  // delete data
  const handleRemove = (data)=>{
    console.log(data)
    set(push(ref(db, 'removeNotes/')), {
          noteHead : data.notes.noteHead,
          noteContent : data.notes.noteContent,
          noteColor : data.notes.noteColor,
          creatorId : currentUserData.uid,
          
    })

    remove(ref(db,'allNotes/' + data.Key))
  }

  // edit--------------------------------------
  const handleEdit=(editData)=>{
    dispatch(editInfo(editData))
    localStorage.setItem('localEdit' , JSON.stringify(editData))
  }

  // pin
  const handlePin = (pinKey)=>{
    setPin((prev)=>({
      ...prev , 
      [pinKey] : !prev[pinKey]

    }))
  }


  return (
    <>

    {
      loading ?

      <div className='flex '>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        
      </div>

      :
      allNote.length === 0 ? 
        // data লোড হয়ে গেছে কিন্তু note নাই
        <p className="text-center text-[#000] text-[30px] font-semibold w-full">No notes found !</p>
      
      :
      
            allNote.map((item,i)=>(
        // console.log(item)
       <div key={i} className={`bg-[${item.notes.noteColor}] p-4 rounded-lg shadow hover:shadow-lg transition`}>
                   <h2 className="font-semibold text-lg mb-2">{item.notes.noteHead}</h2>
                   <p className="text-[#000] text-m mb-4">
                     {item.notes.noteContent}
                   </p>
                   <div className="flex justify-end space-x-2">
                        <button onClick={()=>handleEdit(item)} className="p-2 text-[#000] hover:bg-blue-50 rounded-full">
                        <MdEdit size={20} />
                        </button>
                        <button onClick={()=>handleRemove(item)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <MdDelete size={20} />
                        </button>

                        {
                          pin[item.Key] ?
                          <button onClick={()=>handlePin(item.Key)} className="p-2 text-red-500 bg-red-50 rounded-full">
                            <LuPinOff />
                          </button>

                          :

                          <button onClick={()=>handlePin(item.Key)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                            <LuPin />
                          </button>
                        }

                   </div>
        </div>
            )

      )

    }
    


    </>
  )
}

export default SingleNote