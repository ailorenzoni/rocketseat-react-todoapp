import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare, FiArrowUp, FiArrowDown } from "react-icons/fi";

import { MdDragIndicator } from "react-icons/md";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

const defaultTasks = [
  {
    id: 1,
    title: "nova tarefa 1",
    isComplete: false,
  },
  {
    id: 2,
    title: "nova tarefa 2",
    isComplete: false,
  },
  {
    id: 3,
    title: "nova tarefa 3",
    isComplete: false,
  },
];

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle) {
      const newTask = {
        id: Math.floor(Math.random() * 100),
        title: newTaskTitle,
        isComplete: false,
      };

      setTasks((oldTask) => [...oldTask, newTask]);

      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const updatedTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(updatedTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTask = tasks.filter((task) => task.id !== id);
    setTasks(filteredTask);
  }

  function handleOrderTaskUp(index: number) {
    if (index === 0) {
      console.log("zero");
      return;
    }

    const copyTasks = [...tasks];

    const item = copyTasks.splice(index, 1);

    copyTasks.splice(--index, 0, item[0]);

    setTasks(copyTasks);
  }

  function handleOrderTaskDown(index: number) {
    if (index === tasks.length - 1) {
      console.log("zero");
      return;
    }

    const copyTasks = [...tasks];

    const item = copyTasks.splice(index, 1);

    copyTasks.splice(++index, 0, item[0]);

    setTasks(copyTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task, index, news) => (
            <li key={index} draggable="true" className="drag">
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <button type="button" data-testid="up-task-order">
                  <MdDragIndicator size={16} />
                </button>

                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <div className="buttons-container">
                <button
                  type="button"
                  data-testid="up-task-order"
                  disabled={index === tasks.length - 1}
                  onClick={() => handleOrderTaskDown(index)}
                >
                  <FiArrowDown size={16} />
                </button>
                <button
                  type="button"
                  data-testid="up-task-order"
                  disabled={index === 0}
                  onClick={() => handleOrderTaskUp(index)}
                >
                  <FiArrowUp size={16} />
                </button>
                <button
                  type="button"
                  data-testid="remove-task-button"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  <FiTrash size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
