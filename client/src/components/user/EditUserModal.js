import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StudentContexts } from "../contexts/StudentContext";
import { apiUrl } from "../contexts/constants";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
const EditUserModal = () => {
  const {
    studentState: { students },
    showEditModal,
    editStudentId,
    setShowEditModal,
    updateStudent
  } = useContext(StudentContexts);
  const [newStudentDetail, setNewStudentDetail] = useState(null);

  const getData = async () => {
    if (editStudentId) {
      const res = await axios.get(`${apiUrl}/users/${editStudentId}`);

      setNewStudentDetail(res.data.student);
    }
  };

  useEffect(() => {
    getData();
  }, [editStudentId]);
  if (newStudentDetail) {
    var { username, password, fullName, email } = newStudentDetail;
  }
  const onCloseButton = () => {
    setShowEditModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await updateStudent(newStudentDetail);
    if (res) {
      setShowEditModal(false);
    } else {
      alert("Username đã tồn tại");
    }
    
  };
  const onStudentDetail = (event) => {
    setNewStudentDetail({
      ...newStudentDetail,
      [event.target.name]: event.target.value,
    });
  };
  
  return (
    <Modal size="lg" show={showEditModal} onHide={onCloseButton}>
      <Modal.Header closeButton>
        <Modal.Title>Thay đổi thông tin học sinh</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Tên tài khoản"
              value={username}
              onChange={onStudentDetail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tên học sinh</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Tên học sinh"
              value={fullName}
              onChange={onStudentDetail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onStudentDetail}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseButton}>
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

export default EditUserModal;
