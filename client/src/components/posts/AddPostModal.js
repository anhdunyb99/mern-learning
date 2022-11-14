import React, { useState } from "react";
import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { PostContexts } from "../contexts/PostContexts";
const AddPostModal = () => {
  //useContext
  const { showAddModal, setShowAddModal, addPost } = useContext(PostContexts);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url } = newPost;
  
  const closeDialog = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddModal(false);
  };
  const onChangeNewPostForm = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddModal(false);
    
  };
  return (
    <Modal show={showAddModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            ></Form.Control>
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewPostForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube tutorial URL"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
