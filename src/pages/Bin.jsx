import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { MdRestore } from "react-icons/md";

const BinPage = () => {
      const db = getDatabase();
      const currentUserData = useSelector((state)=>state.currentUser.value)
      const [allRemoveNote,setAllRemoveNote]= useState([])
console.log(allRemoveNote)
        // read data
        useEffect(()=>{
          const starCountRef = ref(db, 'removeNotes/');
             onValue(starCountRef, (snapshot) => {
              console.log(snapshot.val())  //all note er moddhe koiti note royeche
              let myArr = []
      
              snapshot.forEach((item)=>{
                // console.log(item)
                if(item.val().creatorId === currentUserData.uid){
                  myArr.push({Key : item.key , notes : item.val()})
                }
                
              })
              setAllRemoveNote(myArr)
      
            });
        },[])


        // permanent delete
        const handlePermanentDlt = (data)=>{
            remove(ref(db , 'removeNotes/' + data.Key ))
        }

        // deleteAll
        const handleDeleteAll = ()=>{
            allRemoveNote.map((item)=>{
                remove(ref(db , 'removeNotes/' + item.Key))
            })
        }

        // Data Recover
        const handleRecover = (recoverData)=>{
            set(push(ref(db, 'allNotes/')), {
                      noteHead : recoverData.notes.noteHead,
                      noteContent : recoverData.notes.noteContent,
                      noteColor : recoverData.notes.noteColor,
                      creatorId : currentUserData.uid,
                      
            })
            remove(ref(db , 'removeNotes/' + recoverData.Key))
        }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          🗑️ Deleted Items
        </h2>

        <div>
            <button onClick={handleDeleteAll} className="bg-[#000] text-[#fff] py-[10px] px-[25px] rounded-xl font-semibold cursor-pointer">Delete All</button>
        </div>

        {/* Bin Item Card */}
        {
            allRemoveNote.map((item)=>(
                <div className="mt-[10px] bg-[#000] border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition">
                    
                            <div>
                                <h3 className="text-lg font-semibold text-[#fff]">{item.notes.noteHead}</h3>
                                <p className="text-sm text-[#fff]">{item.notes.noteContent}</p>
                                <span className="text-xs text-[#fff]">Deleted on: 28 Aug 2025</span>
                            </div>

                {/* Actions */}
                <div className="flex items-center gap-[4px] text-xl">
                    <button onClick={()=>handleRecover(item)} className="text-green-600 hover:text-green-700 hover:bg-[#fff] hover:rounded-full p-[5px] duration-[.4s] cursor-pointer">
                    <MdRestore />
                    </button>
                    <button onClick={()=>handlePermanentDlt(item)} className="text-red-600 hover:text-red-700 hover:bg-[#fff] hover:rounded-full p-[5px] duration-[.4s] cursor-pointer">
                    <MdDelete />
                    </button>
                </div>
                </div>
            ))
        }

        {/* Empty Bin Message (Optional) */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          If bin is empty, show this message instead.
        </div>
      </div>
    </div>
  );
};

export default BinPage;
