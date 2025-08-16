import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'

const SingleNote = () => {
  return (
    <>
       <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                   <h2 className="font-semibold text-lg mb-2">Note Title</h2>
                   <p className="text-gray-600 text-sm mb-4">
                     This is a sample note content. You can write anything here...
                   </p>
                   <div className="flex justify-end space-x-2">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                        <MdEdit size={20} />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <MdDelete size={20} />
                        </button>
                   </div>
        </div>
    </>
  )
}

export default SingleNote