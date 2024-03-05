import { useState } from 'react'
import {TodoProvider} from './contexts/TodoContext'
import TodoForm from './components/TodoForm';
import { useEffect } from 'react';
import TodoItem from './components/TodoItem';



function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev]);
  }

  const updateTodo = (id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ? todo : prevTodo))
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>prev.filter((prevTodo)=>prevTodo.id!==id))
  }

  const toggleComplete = (id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ? {...prevTodo,complete:!prevTodo.complete } : prevTodo))
  }




  useEffect(()=>{
     const todos = JSON.parse(localStorage.getItem("todos"))
     if(todos && todos.length>0){
      setTodos(todos);
     }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos,setTodos]);

  console.log(todos);

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className='bg-black min-h-screen flex justify-center  text-white'>
        <div className=' flex flex-col mt-10'>
          <h1 className='text-2xl bg-green-400  px-10 p-2 rounded-md text-center'>Manage your work</h1>
          <div>
            {/* form */}
            <TodoForm/>
          </div>
          <div>
            {/* all todos */}
            {/* <TodoItem todo={todos} /> */}
            {
              todos.map((todo)=>(
                <div key={todo.id}>
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
