import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { CourseContexts } from "../contexts/CourseContexts";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
const AddNotificationModal = () => {
  const {
    showAddNotification,
    setShowAddNotification,
    courseState: { course },
  } = useContext(CourseContexts);
  const closeDialog = () => {
    setShowAddNotification(false);
  };
  const [newNotification, setNewnotification] = useState({
    title: "",
    description: "",
  });
  const { title, description } = newNotification;
  const onChangeNewNotification = (e) => {
    setNewnotification({
      ...newNotification,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${apiUrl}/notification`, {
      title: title,
      description: description,
      idCourse: course._id,
      idTeacher: localStorage.id,
    });
    console.log("res", res);
    setShowAddNotification(false);
  };

  return (
    <Modal
      size="lg"
      show={showAddNotification}
      animation={false}
      onHide={closeDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới thông báo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Thông báo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Thông báo"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewNotification}
            ></Form.Control>
          </Form.Group>
          <Form.Label>Nội dung thông báo</Form.Label>
          <Form.Group>
            <Form.Control
              type="text"
              rows={3}
              placeholder="Nội dung"
              name="description"
              value={description}
              onChange={onChangeNewNotification}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Thoát
          </Button>
          <Button variant="primary" type="submit">
            Thêm mới
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddNotificationModal;
