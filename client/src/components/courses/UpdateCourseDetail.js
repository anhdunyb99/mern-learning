import React, { useContext, useEffect, useState } from "react";
import { CourseContexts } from "../contexts/CourseContexts";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Avatar, Paper, Typography } from "@material-ui/core";
import Select from "react-select";
import Button from "react-bootstrap/esm/Button";
import { apiUrl } from "../contexts/constants";
import axios from "axios";
const UpdateCourseDetail = () => {
  const {
    showUpdateCourseDetail,
    setShowUpdateCourseDetail,
    updateCourse,
    editCourseId,
    getCourseById,
  } = useContext(CourseContexts);
  const [newCourseDetail, setNewCourseDetail] = useState(null);
  const getData = async () => {
    if (editCourseId) {
      const res = await axios.get(
        `${apiUrl}/courses/get-course/${editCourseId}`
      );
      setNewCourseDetail(res.data.data);
    }
  };

  useEffect(() => {
    getData();
  }, [editCourseId]);
  const [student, setStudent] = useState(null);
  if (newCourseDetail) {
    var { name, description, listStudent, thumbnail, _id } = newCourseDetail;
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const onCloseButton = () => {
    setShowUpdateCourseDetail(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateCourse(newCourseDetail);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("myfile", selectedFile);
      await axios.post(
        `${apiUrl}/posts/uploadFile/${newCourseDetail._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/formData",
          },
        }
      );
    }

    setShowUpdateCourseDetail(false);
  };
  const onChangeCourseDetail = (event) => {
    setNewCourseDetail({
      ...newCourseDetail,
      [event.target.name]: event.target.value,
    });
  };
  const handleSelectChange = (event) => {
    setStudent(event);
  };
  const handleFileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
    setNewCourseDetail({
      ...newCourseDetail,
      [e.target.name]: e.target.value,
    });
  };
  /* console.log("selectedFile", selectedFile);
  console.log("newCourseDetail", newCourseDetail); */

  return (
    <Modal size="lg" show={showUpdateCourseDetail} onHide={onCloseButton}>
      <Modal.Header closeButton>
        <Modal.Title>Update Course Detail</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Tên khóa học"
              value={name}
              onChange={onChangeCourseDetail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mô tả khóa học</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Mô tả khóa học"
              value={description}
              onChange={onChangeCourseDetail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Thumnail</Form.Label>
            <Form.Control
              type="file"
              name="thumbnail"
              placeholder="Mô tả khóa học"
              onChange={handleFileSelected}
            />
          </Form.Group>
          ;
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

export default UpdateCourseDetail;
