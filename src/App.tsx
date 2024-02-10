import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import {
  appendSpreadsheetData,
  deleteSpreadsheetRow,
  getSpreasheetData,
  updateSpreadsheetData,
} from "./api/sheets";

interface Todo {
  id: number; // Unique identifier for the todo within the list
  value: string; // Text content of the todo
  isCompleted: boolean; // Flag indicating if the todo is completed
}

function App() {
  // to store the todos in state
  const [todos, setTodos] = useState<Todo[]>([]);
  // to store the current todo input value in state
  const [todo, setTodo] = useState<string>("");

  // load the todos from the spreadsheet when the app loads
  const loadTodos = async () => {
    // load the todos from the spreadsheet
    const response = await getSpreasheetData();
    const todos = response.values.map((t: string[]) => ({
      id: parseInt(t[0]),
      value: t[1],
      isCompleted: t[2] === "TRUE",
    }));
    setTodos(todos);
  };

  useEffect(() => {
    console.log(`Loading todos...`);
    loadTodos();
  }, []);

  // function to add a todo to the list
  const addTodo = (todo: string) => {
    // if the todo is empty, don't add it to the list
    if (!todo.trim()) return;
    // store the todo in state
    const todoToAdd: Todo = {
      id: Date.now(),
      value: todo.trim(),
      isCompleted: false,
    };

    setTodos((prev) => [...prev, todoToAdd]);
    // clear the todo input value
    setTodo("");
    // store it in the spreadsheet
    appendSpreadsheetData([
      todoToAdd.id,
      todoToAdd.value,
      todoToAdd.isCompleted.toString(),
    ]);
  };

  // function to remove a todo from the list
  const removeTodo = (id: number) => {
    // remove the todo from the list
    setTodos((prev) =>
      prev.filter((p, index) => {
        if (p.id === id) {
          deleteSpreadsheetRow(index);
          return false;
        } else return true;
      })
    );
  };

  // function to toggle the isCompleted flag of a todo
  const toggleTodo = (id: number) => {
    // toggle the isCompleted flag of the todo
    console.log(`toggling todo with id: ${id}`);
    setTodos((prev) =>
      prev.map((p, index) => {
        if (p.id === id) {
          const updatedTodo = { ...p, isCompleted: !p.isCompleted };
          updateSpreadsheetData(index, [
            updatedTodo.id,
            updatedTodo.value,
            updatedTodo.isCompleted.toString(),
          ]);
          return updatedTodo;
        } else {
          return p;
        }
      })
    );
  };

  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      {/* Input Area to add new todos */}
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          addTodo(todo);
        }}
      >
        <input
          className="todo-input"
          type="text"
          name="todo"
          placeholder="Add a todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          autoFocus
        />
        <button className="submit-btn" type="submit">
          Add
        </button>
      </form>
      {/* Area to render the todos */}
      <ul className="todos">
        {todos.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.isCompleted}
              onChange={() => {
                toggleTodo(t.id);
              }}
            />
            <span className="todo">{t.value}</span>
            <button
              type="button"
              className="delete-btn"
              onClick={(e) => {
                e.preventDefault();
                removeTodo(t.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
