import React, { useContext, useState } from "react";
import { apiUrl } from "../contexts/constants";
import axios from "axios";
import { PostContexts } from "../contexts/PostContexts";
import { CourseContexts } from "../contexts/CourseContexts";
import { Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
const UploadFile = () => {
  const { uploadFile } = useContext(PostContexts);
  const {
    courseState: { course },
    showUploadModal,
    setShowUploadModal,
  } = useContext(CourseContexts);
  const [selectedFile, setSelectedFile] = useState(null);
  const closeDialog = () => {
    setShowUploadModal(false);
  };
  const handleFileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("e.target.files", e.target.files);
  };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myfile", selectedFile);
    //await uploadFile(formData);
    await axios.post(`${apiUrl}/posts/uploadFile/${course._id}`, formData, {
      headers: {
        "Content-Type": "multipart/formData",
      },
    });
    setShowUploadModal(false);
  };
  const handleGetFile = async (e) => {
    e.preventDefault();
    await axios.get(`${apiUrl}/posts/getFile`);
  };

  return (
    <Modal show={showUploadModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Upload tài liệu khóa học</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmitFile}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="file"
              onChange={handleFileSelected}
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

export default UploadFile;
