import React, { useState } from "react";
import "./App.css";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Task from "./type";

interface TaskFormProps {
  addTask: (task: Task) => void;
}

function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [showModal, setShwoModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateInput();
    if (error) {
      setErrorMessage(error);
      setShwoModal(true);
      return;
    }

    addTask({ title, time });
    setTitle("");
    setTime("");
  };

  const validateInput = () => {
    if (title === "") {
      return "Title input is empty";
    }

    if (title.length > 128) {
      return "Title should not  be more than 128 characters";
    }
    if (time === "") {
      return "Time input is empty";
    }

    if (!/^((?:[0-9]|1[0-9]|2[0-4])(?:\.(?:[1-9]|[0-9][1-9]))?)$/.test(time)) {
      return "Invalid time , time should be from 0 to  24 hours";
    }

    return null;
  };

  const handleClose = () => {
    setShwoModal(false);
  };

  const renderAlertModal = () => {
    return (
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <p className="tasktitle">Task title</p>
        </Form.Label>
        <Form.Control
          id="input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <p className="tasktime">Time Required (in Hrs)</p>
        </Form.Label>
        <Form.Control
          style={{
            width: "250px",
            height: "35px",
            position: "relative",
            left: "320px",
            top: "16px",
          }}
          type="text"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          placeholder="Time"
        />
      </Form.Group>
      <Button className="add" variant="primary mb-3" type="submit">
        Add
      </Button>
      {showModal && renderAlertModal()}
    </Form>
  );
}

export default TaskForm;
