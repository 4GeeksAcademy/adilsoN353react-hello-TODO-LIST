import React, { useState } from "react";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDo, setToDo] = useState([]);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      setToDo([...toDo, inputValue]);
      setInputValue("");
    }
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
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
            <button className="button" onClick={addTask}>
              Add
            </button>
          </div>
        </li>
        {toDo.length === 0 ? (
          <li><strong>No tasks, add tasks</strong></li>
        ) : (
          toDo.map((item, index) => (
            <li key={index} className="task-item">
              <span>{item}</span>
              <i
                className="fas fa-trash-alt"
                onClick={() => setToDo(toDo.filter((_, currentIndex) => index !== currentIndex))}
              ></i>
            </li>
          ))
        )}
      </ul>
      <div className="task-counter">
        <p> <strong>Total tasks</strong>: {toDo.length}</p>
      </div>
    </div>
  );
};

export default ToDoList;