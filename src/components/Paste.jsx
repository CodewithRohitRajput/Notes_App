import React, { useState } from 'react'
import { useEffect } from 'react';

const Paste = () => {
    // create components
    const[notes , setNotes] = useState([]);
    const[title , setTitle] = useState("");
    const[description , setDescription] = useState("");
    const[selectednote , setSelectedNote] = useState(null);

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

   


  return (
    <div className='flex justify-center items-center flex-col'>
    


<input type="text" 
placeholder='Title'
value={title}
name='title'
onChange={(e)=> setTitle(e.target.value)}
className='w-80 h-10 bg-slate-300 border-2 border-gray-600 rounded-md px-4 py-2 font-semibold outline-none'
/>

<textarea name="description" id="description" 
value={description}
placeholder='Whats on your mind ?...' 
onChange={(e) => setDescription(e.target.value)}
className='w-80 h-36 bg-slate-300 border-2 border-gray-600 rounded-md px-4 py-2 font-semibold   outline-none mt-4'
></textarea>
<button onClick={ addNote} className='px-3 py-2 bg-yellow-300 border border-gray-600 rounded-lg font-semibold mt-2'>
    Create 
</button>
<br /><br />
<p className='text-lg text-gray-400 '>Your created Notes :-</p>
{notes.slice().reverse().map((note)=> (
    <div className='bg-slate-400 border-2 rounded-md w-80 h-20 mt-4 border-gray-600' key={note.id} >
        <h4 className='text-xl px-4'> {note.title} </h4>
        <p className='px-4'> {note.description.substring(0 , 25)}... </p>
        <button onClick={()=>setSelectedNote(note)} className='  ml-56 mt-0 text-yellow-300 text-white underline '>
            
            Read More
        </button>
    </div>
))}

    {selectednote && (
        <div className='fixed left-0 top-0 w-full h-full bg-slate-300 text-black font-semibold   justify-center items-center'> 
        <h4 className='ml-5 mt-5'>
          Title :   {selectednote.title}
        </h4>
        
        <p className='ml-5 mt-1'>
           Description :  {selectednote.description}
        </p>

            <button onClick={()=>setSelectedNote(null)} className='px-4 py-2 border border-black rounded-md mt-5 ml-5 font-semibold text-white bg-red-700'>
                Close
            </button>

        </div>
    )}

    </div>
  )
}

export default Paste
