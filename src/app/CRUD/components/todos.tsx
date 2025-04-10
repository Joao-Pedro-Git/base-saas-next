// components/todo.tsx
"use client";

import { useState } from "react";
import { todoType } from "../types/todo-type";
import AddTodo from "./add-todo";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "../actions/todo-actions";

interface TodosProps {
  todos: todoType[];
}

export default function Todos({ todos }: TodosProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = async (text: string) => {
    const id = Math.floor(1000 + Math.random() * 9000);
    await addTodo(id, text);
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
  };

  const handleEditTodo = async (id: number, newText: string) => {
    if (!newText.trim()) return;
    await editTodo(id, newText.trim());
    setEditingId(null);
  };

  const handleToggleTodo = async (id: number) => {
    await toggleTodo(id);
  };

  return (
    <div>
      <AddTodo handleAddTodo={handleAddTodo} />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-2 border rounded ${
              todo.done ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {editingId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border p-1 rounded w-full mr-2"
                autoFocus
              />
            ) : (
              <span>{todo.text}</span>
            )}

            <div className="flex space-x-2 ml-2">
              {editingId === todo.id ? (
                <button
                  onClick={() => handleEditTodo(todo.id, editText)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Salvar
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.text);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
              )}

              <button
                onClick={() => handleToggleTodo(todo.id)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                {todo.done ? "Desfazer" : "Feito"}
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
