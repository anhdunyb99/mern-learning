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
	updateProfile
  } = useContext(AuthContext);
  const [newProfile, setNewProfile] = useState(user);
  
  const { fullName, username, role, email , _id } = newProfile;
  
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
  e.preventDefault()
	await updateProfile(newProfile)
	setShowUpdateProfile(false);
  }
  
  return (
    <Modal
      show={showUpdateProfile}
      animation={false}
      onHide={onCloseButton}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Full name"
              value={fullName}
              onChange={onChangeUserProfile}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChangeUserProfile}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="username"
              placeholder="User name"
              value={username}
              onChange={onChangeUserProfile}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateUserDetailModal;
