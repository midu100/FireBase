import React from "react";
import { MdAdd, MdSearch, MdDelete, MdEdit } from "react-icons/md";
import BG from '../assets/img/BG1.jpg'
import Navbar from "../components/Navbar";
import SingleNote from "../components/common/SingleNote";

const NotesHome = () => {
  return (
    <div style={{background:`url(${BG})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} className="min-h-screen bg-gray-100">
      {/* Header */}
      <Navbar />

      {/* Create Note Section */}
      <section  className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Take a note..."
            className="flex-1 border-none outline-none"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full">
            <MdAdd size={24} />
          </button>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleNote />
        <SingleNote />
        <SingleNote />
        <SingleNote />
        <SingleNote />
        <SingleNote />
        <SingleNote />
        <SingleNote />
      </section>
    </div>
  );
};

export default NotesHome;
