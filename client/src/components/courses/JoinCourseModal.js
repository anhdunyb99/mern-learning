import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { CourseContexts } from "../contexts/CourseContexts";
const JoinCourseModal = () => {
  const { showJoinCourse, setShowJoinCourse, joinCourse } =
    useContext(CourseContexts);
  const [code, setCode] = useState("");
  const closeDialog = () => {
    setShowJoinCourse(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await joinCourse(localStorage.id, code);
    setShowJoinCourse(false);
  };

  const handleClose = () => {
    setShowJoinCourse(false);
    setCode("");
  };
  return (
    <Modal
      size="sm"
      show={showJoinCourse}
      animation={false}
      onHide={closeDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title>Tham gia khóa học</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Mã khóa học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập mã khóa học"
              required
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

export default JoinCourseModal;
