import React, {useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Task from "./type";
import { Button, Modal } from "react-bootstrap";

interface TaskViewProps{
    task: Task
    deleteTask:(task: Task)=> void
}

function TaskView({ task, deleteTask }:TaskViewProps) {
  const [showModal, setShwoModal] = useState(false);

  const handleClose = () => {
    setShwoModal(false);
  };

  const renderDeleteModal = () => {
    return (
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are sure you want to delete this task</Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={()=>{
          deleteTask(task)
          handleClose()
          }}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <tr>
      <td id="todotitle">{task.title}</td>
      <td id="todotime">{task.time}</td>
      <td>
        <button onClick={() => setShwoModal(true)}>Delete</button>
      </td>
      {showModal&& renderDeleteModal()}
    </tr>
  );
}

export default TaskView