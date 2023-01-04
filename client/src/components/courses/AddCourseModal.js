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
    code : '',
    idTeacher : localStorage.id
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const { name, description, files, listStudent, thumbnails, courseDetail , code } =
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
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên khóa học"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeNewCourse}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              rows={3}
              placeholder="Mô tả"
              name="description"
              value={description}
              onChange={onChangeNewCourse}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Mã khóa học</Form.Label>
            <Form.Control
              type="text"
              rows={3}
              placeholder="Mã khóa học"
              name="code"
              value={code}
              onChange={onChangeNewCourse}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Chi tiết</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Mô tả"
              name="courseDetail"
              value={courseDetail}
              onChange={onChangeNewCourse}
            ></Form.Control>
            <Form.Text id="title-help" muted>
              Ảnh mô tả
            </Form.Text>
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
