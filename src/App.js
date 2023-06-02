import React from "react";
import "./App.css"
import { Button,Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import  {useState} from "react";

function Todo({ todo, deleteTodo})  {
  return (
    <tr>
      <td id="todotitle">{todo.title}</td>
      <td id="todotime">{todo.time}</td>
  <td>    
    <button onClick={() => deleteTodo(todo)}>Delete</button>
    </td>
    </tr>
  )
}

function FormTodo({ addTodo }) {
  const [title,setTitle] = React.useState("");
  const [time,setTime] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (title ===""|| time ==="" ) return;
    addTodo({title, time});
    setTitle("");
    setTime("");
  };

  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><p className="tasktitle">Task title</p></Form.Label>
        <Form.Control id="input" type="text"value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter task"/>
      </Form.Group>
      <Form.Group>
        <Form.Label><p className="tasktime">Time Required (in Hrs)</p></Form.Label>
        <Form.Control style={{width: "250px",height: "35px",position: "relative",left: "320px",top: "16px"}} type="text"value={time} onChange={e => setTime(e.target.value)} placeholder="Time"/>
      </Form.Group>
      <Button className="add" variant="primary mb-3" type="submit">
        Add
      </Button>
    </Form>
  );
}

const loadTask=()=>{
  const tasks= localStorage.getItem("tasks")
  console.log(tasks)
  return tasks?JSON.parse(tasks):[]
}

const saveTasks=(tasks)=>{
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function App() {
  const [todos,setTodos] = useState(loadTask());
  
const addTodo = todo => {
  const newTodos = [todo, ...todos];
  setTodos(newTodos);
  saveTasks(newTodos)
}


const deleteTodo = todo => {

  const  newTodos = todos.filter((elem) => elem.title !== todo.title)
  setTodos(newTodos);
  saveTasks(newTodos)
};



const totalHours= todos.reduce((acc, todo)=> acc+parseInt(todo.time), 0)

return (
  <div className="app">
      <div id="container">
      <h1 className="taskmanagementapp">Task Management App</h1>
        <div className="totaltask">
          <p>Total Task</p>
          <p id="length">{todos.length}</p>
          </div>
        <div id="totaldays">
          <p>Total Days</p>
        <p className="totalhours24">{totalHours/24}</p>
          </div>
        <div className="totalhours">
        <p>Total Hours</p>
        <p className="totaldays24">{totalHours}</p>
        </div>
      <h1 className="todolist">Todo list</h1>
      <FormTodo addTodo={addTodo}/>
      <div>
        <table id="tablebody"> 
          <thead>
            <tr>
              <th className="taskhead">Task Title</th>
            <th className="taskimeRequired">Time Required(in Hrs)</th>
            <th className="taskaction">Action</th>
            </tr>
       
         {todos.map((todo,id) => (
            <Todo 
              key={id}
              todo={todo}
              deleteTodo={deleteTodo}/>
           
         ))}
         </thead>
           </table>
      </div>
    </div>
  </div>
  
)
}
export default App































