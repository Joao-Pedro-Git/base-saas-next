// components/add-todo.tsx
"use client";
import { useState } from "react";

interface AddTodoProps {
  handleAddTodo: (text: string) => void;
}

export default function AddTodo({ handleAddTodo }: AddTodoProps) {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    handleAddTodo(text.trim());
    setText("");
  };

  return (
    <div className="mb-4 flex space-x-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Escreva seu todo..."
      />
      <button
        onClick={submit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Adicionar
      </button>
    </div>
  );
}
