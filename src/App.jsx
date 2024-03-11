import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Todoprovider } from './contexts'
import { useEffect } from 'react'
import TodoForm from './components/Todoform'
import Todoitem from './components/Todoitem'

function App() {
  const[todos,setTodos] = useState([])

  const addtodo= (todo) => {
    setTodos((prev) => [{id:Date.now(),...todo},...prev])
  }
  const updatedtodo = ( id , todo)=>{
    setTodos((prev)=> prev.map((prevtodo)=>(prevtodo.id===id ? todo: prevtodo)))
  }
  
  const deletetodo =(id)=>{
    setTodos((prev)=>prev.filter((prevtodo)=>(prevtodo.id!==id )))
  }

  const togglecomplete=(id)=>{
    setTodos((prev)=> prev.map((prevtodo)=>(prevtodo.id===id? {...prevtodo,completed:!prevtodo.completed}:prevtodo)))
  }

  useEffect(()=>{
   const todos = JSON.parse(localStorage.getItem("todos"))
   if(todos && todos.length>0){
    setTodos(todos)
   }
  },[])
  
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
    console.log(todos)
  },[todos])
  return (
    <Todoprovider value={{todos,addtodo,updatedtodo,deletetodo,togglecomplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl px-4 py-3 mx-auto text-white rounded-lg shadow-md">
                    <h1 className="mt-2 mb-8 text-2xl font-bold text-center">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm></TodoForm>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                            <Todoitem todo={todo}></Todoitem>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </Todoprovider>
  )
}

export default App
