import React, { useState } from 'react'
import { useEffect } from 'react';

const Paste = () => {
    // create components
    const[notes , setNotes] = useState([]);
    const[title , setTitle] = useState("");
    const[description , setDescription] = useState("");
    const[selectednote , setSelectedNote] = useState(null);
    const[editNote , setEditNote] = useState(null);
    const[editTitle , setEditTitle] = useState("");
    const[editDescription , setEditDescription] = useState("");

    // fetching data from local storage
    
    useEffect(()=>{
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    } , [])
    
    
    // store in local data : 

    useEffect(()=>{
        localStorage.setItem("notes" , JSON.stringify(notes));
    } , [notes])
 
    // function add notes

    function addNote(){
        if(title && description){
            const newNote = { id : Date.now() , title , description};
            setNotes([...notes , newNote]);
            setTitle("");
            setDescription("");
        }
    }

    // delete note

    function deleteNote(id){
        if(window.confirm("Are you sure you want to delete : ")){

            const updatedNotes = notes.filter(note => note.id !== id)
            setNotes(updatedNotes);
            localStorage.setItem("notes" , JSON.stringify(updatedNotes))
        }
    }

    function editNoteHandler(note) {
        setEditNote(note);
        setEditTitle(note.title);
        setEditDescription(note.description);
    }
    
    function updateNote() {
        if (editTitle && editDescription) {
            const updatedNotes = notes.map((note) =>
                note.id === editNote.id
                    ? { ...note, title: editTitle, description: editDescription }
                    : note
            );
            setNotes(updatedNotes);
            localStorage.setItem("notes", JSON.stringify(updatedNotes)); // ✅ Save changes to storage
            setEditNote(null); // ✅ Close modal after saving
        }
    }
    


  return (

    <div className='flex justify-center items-center flex-col'>
        
        <div className='heading mt-2 font-bold text-xl text-blue-500 '>
        NOTE PHILE
        </div>

    <main className='flex-grow p-6 flex flex-col items-center overflow-y-auto pb-20'>

    

<input type="text" 
placeholder='Title'
value={title}
name='title'
onChange={(e)=> setTitle(e.target.value)}
className='w-80 h-10 bg-slate-300  border-2 mt-4 border-gray-600 rounded-md px-4 py-2 font-semibold outline-none'
/>

<textarea name="description" id="description" 
value={description}
placeholder='Whats on your mind ?...' 
onChange={(e) => setDescription(e.target.value)}
className='w-80 h-36 bg-slate-300 border-2 border-gray-600 rounded-md px-4 py-2 font-semibold   outline-none mt-4'
></textarea>
<button onClick={ addNote} className='px-3 py-2 bg-yellow-300 border border-gray-600 rounded-lg font-semibold mt-2 hover:scale-90 '>
    Create 
</button>
<br /><br />
<p className='text-lg text-gray-400 '>Your created Notes :-</p>


{notes.slice().reverse().map((note)=> (
    <div className='bg-slate-400 border-2 rounded-md w-80 h-20 mt-4 border-gray-600' key={note.id} >
        <h4 className='text-xl px-2'> {note.title} </h4>
        <p className='px-2'> {note.description.substring(0 , 25)}... </p>
        <div className='flex flex-row w-full '>

       
        <button onClick={()=> deleteNote(note.id)} className='ml-2 mb-10 text-red-700 underline '>
            delete
        </button>
        <button onClick={()=> editNoteHandler(note)} className='ml-4 mb-10 text-green-400 underline '>
            Edit
        </button>
        <button onClick={()=>setSelectedNote(note)} className='  ml-32 mb-10 text-yellow-300 text-white underline active:text-blue '>
            
            Read More
        </button>
        </div>
    </div>
))}

    {selectednote && (
        <div className='fixed left-0 top-0 w-full h-full bg-slate-300 text-black font-semibold   justify-center items-center'> 
        <h4 className='ml-5 mt-5 font-semibold'>
          Title :   {selectednote.title}
        </h4>
        
        <p className='ml-5 mt-4 '>
          Description :    {selectednote.description}
        </p>

            <button onClick={()=>setSelectedNote(null)} className='px-4 py-2 border-b-4 border-black rounded-lg mt-5 ml-5 font-semibold text-black bg-yellow-400 active:scale-90  transition-all duration-100 '>
                Go Back
            </button>

      

        </div>
    )}

{editNote && (
        <div className='fixed left-0 top-0 w-full h-full bg-yellow-100 text-black font-semibold flex flex-col justify-center items-center'>
          <input type="text"
          value={editTitle}
          onChange={(e)=> setEditTitle(e.target.value)}
          className="w-80 h-10 bg-gray-200 text-black border-2 -mt-96 border-gray-600 rounded-md px-4 py-2 font-semibold outline-none "
          />

                <textarea name="editDescription" id=""
                value={editDescription}
                onChange={(e)=>setEditDescription(e.target.value)}
                 className="w-80 h-36 bg-gray-200 text-black border-2 border-gray-600 rounded-md px-4 py-2 font-semibold outline-none mt-8"
                ></textarea>
                    <div className='space-x-20'>

                    <button onClick={()=>setEditNote(null)} className='px-4 py-2 border-b-4 border-black rounded-lg mt-5 ml-5 font-semibold text-black bg-yellow-400 active:scale-90  transition-all duration-100 '>
                Cancel
            </button>
                    
                    <button onClick={updateNote} className="px-4 py-2 bg-green-500 border-b-4 border-black rounded-lg font-semibold hover:scale-90 transition-all duration-300 mt-10">
                        Save changes
                    </button>

             
            </div>
             </div>
        )}

    </main>

    <footer className="bg-blue-100 w-full flex justify-center items-center h-14 mt-auto px-2 bottom-0 fixed space-x-10">
                <p>© 2025 NOTE PHILE. All rights reserved</p>
                <p>Created by:- ROHIT SINGH RAJPUT</p>
            </footer>
    </div>
  )
}

export default Paste
