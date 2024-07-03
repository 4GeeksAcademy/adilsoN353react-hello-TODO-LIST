import React, { useEffect, useState } from "react";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://playground.4geeks.com/todo/users/adilson353");
        if (response.status === 404) {
          console.log("Usuario no existe, hay que crearlo");
          await createUser();
        }
        await getTasks();
      } catch (error) {
       
      }
    })();
  }, []);

  async function createUser() {
    try {
      const response = await fetch("https://playground.4geeks.com/todo/users/adilson353", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: "adilson353",
        }),
      });
      if (response.status !== 201) {
        
      }
    } catch (error) {
    
    }
  }

  const getTasks = async () => {
    
    const response = await fetch("https://playground.4geeks.com/todo/users/adilson353");
    const data = await response.json();
    setToDo(data.todos || []); 
  };
  

  const addTask = async (e) => {
    try {
      if (e.key === "Enter" && inputValue.trim() !== "") {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/adilson353",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: inputValue,
            done: false,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setInputValue("");
        getTasks();
      }
      
    }
  } catch (error) {
  
      }
  };

  const deleteOne = async (id) => {
 
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    });

    // Manejar la respuesta del servidor
    if (response.ok) {
      
      getTasks(); // Actualizar la lista de tareas después de la eliminación
    } 
  };

  const deleteAll = async () => {
    // Crear una lista de promesas para eliminar todas las tareas
    const promises = toDo.map((item) => {
      return fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
        method: "DELETE",
      });
    });

    // Esperar a que todas las promesas se resuelvan
    const responses = await Promise.all(promises);
    responses.forEach((response, index) => {
      if (!response.ok) {
       
      }
    });

    // Obtener las tareas actualizadas después de eliminar todas
    getTasks();
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center pt-5"><strong>To Do List</strong></h1>
      <ul>
        <li>
          <div className="input-container">
            <input
              type="text"
              placeholder="Add Task"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              onKeyDown={addTask}
            />
            <button className="button1" onClick={() => addTask({ key: "Enter" })}>
              Add
            </button>
          </div>
        </li>
        {toDo.length === 0 ? (
          <li><strong>No tasks, add tasks</strong></li>
        ) : (
          toDo.map((item, index) => (
            <li key={index} className="task-item">
              <span>{item.label}</span>
              <i
                className="fas fa-trash-alt icono"
                onClick={() => deleteOne(item.id)}
              ></i>
            </li>
          ))
        )}
      </ul>
      <div className="task-counter">
        <p><strong>Total tasks</strong>: {toDo.length}</p>
      </div>
      <div className="button">
        <button onClick={deleteAll} className="btn btn-outline-danger" type="button">
          Delete All
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
