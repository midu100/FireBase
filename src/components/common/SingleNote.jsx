import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Skeleton from '../Skeleton';
import Home from '../../pages/Home';

const SingleNote = () => {
  const db = getDatabase();
  const currentUserData = useSelector((state)=>state.currentUser.value)
  const [allNote,setAllNote]= useState([])
  const [edit , setEdit] = useState('')

  console.log(edit)

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


  return (
    <>
    {/* <Home editNoteData={edit}/> */}
    {
      allNote.length == 0 ?

      <div className='flex '>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        
      </div>

      :
            allNote.map((item,i)=>(
        // console.log(item)
       <div key={i} className={`bg-[${item.notes.noteColor}] p-4 rounded-lg shadow hover:shadow-lg transition`}>
                   <h2 className="font-semibold text-lg mb-2">{item.notes.noteHead}</h2>
                   <p className="text-[#000] text-m mb-4">
                     {item.notes.noteContent}
                   </p>
                   <div className="flex justify-end space-x-2">
                        <button onClick={()=>setEdit(item)} className="p-2 text-[#000] hover:bg-blue-50 rounded-full">
                        <MdEdit size={20} />
                        </button>
                        <button onClick={()=>handleRemove(item)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <MdDelete size={20} />
                        </button>
                   </div>
        </div>

      ))

    }
    


    </>
  )
}

export default SingleNote