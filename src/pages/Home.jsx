import React, { useEffect, useState } from "react";
import { MdAdd, MdSearch, MdDelete, MdEdit } from "react-icons/md";
import BG from '../assets/img/BG1.jpg'
import Navbar from "../components/Navbar";
import SingleNote from "../components/common/SingleNote";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import NoteHead from "../components/common/NoteHead";

const Home = () => {
  const db = getDatabase();
  
  return (
    <div style={{background:`url(${BG})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}} className="min-h-screen bg-gray-100">
      <NoteHead />

      {/* Notes Grid */}
      <section className=" mx-auto px-4 pb-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleNote />
      </section>
    </div>
  );
};

export default Home;
