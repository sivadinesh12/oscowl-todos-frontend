import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [upadteTodo, setUpdateTodo] = useState(false);
  const [updateInput, setUpdateInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      navigate("/login");
    }

    const fetchTodos = async () => {
      const url = "https://oscowl-todos-assignment.onrender.com/gettodos";
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setTodos(data || []);
        } else {
          console.error("Failed to fetch todos");
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (todoInput.trim() === "") {
      alert("Please enter a valid todo");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify({ todo: todoInput }),
    };

    const url = "https://oscowl-todos-assignment.onrender.com/newtodo";

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTodos([...todos, data]);
        setTodoInput("");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to add todo");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt_token");
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    };

    const url = "https://oscowl-todos-assignment.onrender.com/deletetodo";

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete todo");
    }
  };

  const handleUpadteTodo = async (id) => {
    if (updateInput.trim() === "") {
      alert("Please enter a valid todo");
      return;
    }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify({ id, todo: updateInput }),
    };
    const url = "https://oscowl-todos-assignment.onrender.com/updatetodo";
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, todo: updateInput } : todo
          )
        );
        setUpdateTodo(false);
        setUpdateInput("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="home-bg">
      <h1 style={{ color: "#cb7fe0", fontSize: "50px", textAlign: "center" }}>
        Todos
      </h1>
      <div className="home-input-container">
        <input
          type="text"
          className="home-input"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button className="add-todo" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      {todos.length === 0 ? (
        <p className="no-todos">No tasks to be done</p>
      ) : (
        <ul className="todos-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              {upadteTodo ? (
                <input
                  type="text"
                  className="update-input"
                  onChange={(e) => setUpdateInput(e.target.value)}
                  value={updateInput}
                />
              ) : (
                <p>{todo.todo}</p>
              )}
              <div>
                {upadteTodo ? (
                  <button
                    className="save-btn"
                    onClick={() => handleUpadteTodo(todo.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="update-btn"
                    onClick={() => setUpdateTodo(!upadteTodo)}
                  >
                    Update
                  </button>
                )}
                <button
                  className="delete-todo-btn"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
