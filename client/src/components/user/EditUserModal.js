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
    updateStudent,
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
    var { username, password, fullName, email, phoneNumber, role } =
      newStudentDetail;
  }
  const onCloseButton = () => {
    setShowEditModal(false);
  };
  console.log("newStudentDetail", newStudentDetail);
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await updateStudent(newStudentDetail);
    setShowEditModal(false);
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
        <Modal.Title>Thay đổi thông tin người dùng</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
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
          <Form.Group>
            <Form.Label>SĐT</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="SĐT"
              value={phoneNumber}
              onChange={onStudentDetail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Chức vụ</Form.Label>
            <Form.Control
              type="text"
              name="role"
              placeholder="Chức vụ"
              value={role}
              onChange={onStudentDetail}
              readOnly
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
