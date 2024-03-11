import React, { useState } from 'react'
import { usetodocontext } from '../contexts'

function Todoitem({todo}) {
    const {togglecomplete,updatedtodo,deletetodo} = usetodocontext()
    
    const[isEditable,setIseditable]=useState(false) 
    const[todomsg,setTodomsg] = useState(todo.todo)

    const editTodo = () => {
      updatedtodo(todo.id,{...todo,todo:todomsg})
      setIseditable(false)
    }
    const togglecomp =()=>{
      togglecomplete(todo.id)
    }
  return (
    <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
    >
        <input
            type="checkbox"
            className='cursor-pointer'
            checked={todo.completed}
            onChange={togglecomp}
        />
        <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todomsg}
                onChange={(e) => setTodomsg(e.target.value)}
                readOnly={!isEditable}
        />
        {/* Edit, Save Button */}
        <button
                className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded-lg border-black/10 bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isEditable) {
                        editTodo();
                    } else setIseditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded-lg border-black/10 bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deletetodo(todo.id)}
            >
                ❌
            </button>
      
    </div>
  )
}

export default Todoitem
