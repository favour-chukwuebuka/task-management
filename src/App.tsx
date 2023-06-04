import React,  { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskView from "./TaskView";
import TaskForm from "./TaskForm";
import Task from "./type";

const loadTask = ():Task[] => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function App() {
  const [tasks, setTasks] = useState(loadTask());

  const addTask = (task: Task) => {
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (task: Task) => {
    const newTasks = tasks.filter((elem) => elem.title !== task.title);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const totalHours = tasks.reduce((acc, task) => acc + parseInt(task.time), 0);
  const zeroPad = (figure: number| string) => String(figure).padStart(3, "0");
  const getDays =(hours: number) => ((hours/8).toFixed(2))

  return (
    <div className="app">
      <div id="container">
        <h1 className="taskmanagementapp">Task Management App</h1>
        <div className="totaltask">
          <p>Total Task</p>
          <p id="length">{zeroPad(tasks.length)}</p>
        </div>
        <div id="totaldays">
          <p>Total Days</p>
          <p className="totalhours24">{zeroPad(getDays(totalHours))}</p>
        </div>
        <div className="totalhours">
          <p>Total Hours</p>
          <p className="totaldays24">{zeroPad(totalHours)}</p>
        </div>
        <h1 className="todolist">Todo list</h1>
        <TaskForm addTask={addTask} />
        <div>
          <table id="tablebody">
            <thead>
              <tr>
                <th className="taskhead">Task Title</th>
                <th className="taskimeRequired">Time Required(in Hrs)</th>
                <th className="taskaction">Action</th>
              </tr>

              {tasks.map((task, id) => (
                <TaskView key={id} task={task} deleteTask={deleteTask} />
              ))}
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}
export default App;
