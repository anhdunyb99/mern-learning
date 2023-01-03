import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../contexts/AuthContexts";
const UpdateUserDetailModal = () => {
  const {
    authState: { user },
    showUpdateProfile,
    setShowUpdateProfile,
    updateProfile,
  } = useContext(AuthContext);
  const [newProfile, setNewProfile] = useState(user);

  const { fullName, username, role, email, _id } = newProfile;

  const onChangeUserProfile = (event) => {
    setNewProfile({
      ...newProfile,
      [event.target.name]: event.target.value,
    });
  };
  const onCloseButton = () => {
    setShowUpdateProfile(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(newProfile);
    setShowUpdateProfile(false);
  };

  return (
    <Modal show={showUpdateProfile} animation={false} onHide={onCloseButton}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhật thông tin cá nhân</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={fullName}
              onChange={onChangeUserProfile}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChangeUserProfile}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={onChangeUserProfile}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Thoát</Button>
          <Button variant="primary" type="submit">
            Chỉnh sửa
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateUserDetailModal;
