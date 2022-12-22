import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { CourseContexts } from "../contexts/CourseContexts";
import UploadFile from "../common-component/UploadFile";
import { apiUrl } from "../contexts/constants";
import axios from "axios";
const AddCourseModal = () => {
  const { showAddCourse, setShowAddCourse, addCourse } =
    useContext(CourseContexts);
  const closeDialog = () => {
    setShowAddCourse(false);
  };
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    files: [],
    thumbnails,
    listStudent: [],
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const { name, description, files, listStudent, thumbnails, courseDetail } =
    newCourse;
  const onChangeNewCourse = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("e.target.files", e.target.files);
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    /* const formData = new FormData();
    formData.append("myfile", selectedFile); */
    await addCourse(newCourse);
    /* await axios.post(`${apiUrl}/posts/uploadFile`, formData, {
      headers: {
        "Content-Type": "multipart/formData",
      },
    }); */
    setNewCourse({
      name: "",
      description: "",
      files: [],
      listStudent: [],
      courseDetail: "",
    });
    setShowAddCourse(false);
  };

  return (
    <Modal
      size="lg"
      show={showAddCourse}
      animation={false}
      onHide={closeDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới khóa học</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeNewCourse}
            ></Form.Control>
            <Form.Text id="title-help" muted>
              Description
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewCourse}
            ></Form.Control>
            <Form.Text id="title-help" muted>
              Course Detail
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="CourseDetail"
              name="courseDetail"
              value={courseDetail}
              onChange={onChangeNewCourse}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="file"
              name="thumbnails"
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

export default AddCourseModal;
