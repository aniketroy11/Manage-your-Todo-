import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const useTodo = useContext(TodoContext);
  const {addTodo} = useTodo;
  
  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({todo, complete: false })
    setTodo("");
  };

  return (
    <form
      onSubmit={add}
      className="flex justify-center items-center gap-3 mt-5 text-black"
    >
      <input
        className=" w-[500px] h-[30px] text-black font-medium p-2"
        placeholder="Write something"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-500 p-1 w-[60px] text-black font-semibold"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
