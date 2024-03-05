import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

const TodoItem = ({ todo }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const useTodo = useContext(TodoContext);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo;

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsEditable(false);
  };

  const toggle = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-3 shadow-sm shadow-white/50 duration-300 text-black text-xl font-bold ${
        todo.complete ? "bg-green-400" : "bg-blue-600 text-white"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.complete}
        onChange={toggle}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isEditable ? "border-black" : "border-transparent"
        } ${todo.complete ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isEditable}
      />
      {/* Edit, Save Button */}
      <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={()=>{
          if(todo.complete) return ;
          if(isEditable){
            editTodo();
          }
          else{
            setIsEditable((prev)=>!prev)
          }
        }}
        disabled={todo.complete}
      >
        {isEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={()=>deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
