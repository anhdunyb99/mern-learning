import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "../contexts/constants";
import { CourseContexts } from "../contexts/CourseContexts";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useParams } from "react-router-dom";
const EditDocument = () => {
  const { documentId, showDocEdit, setShowDocEdit, updateFiles } =
    useContext(CourseContexts);
  const [newFile, setNewFile] = useState(null);
  const { courseId } = useParams();
  console.log("courseId", courseId);
  let body = {
    id: courseId,
  };
  const getData = async () => {
    if (documentId) {
      const res = await axios.get(
        `${apiUrl}/courses/get-document/${documentId}`,
        {
          params: {
            idCourse: courseId,
          },
        }
      );
      console.log("res", res);
      setNewFile(res.data.data);
    }
  };
  useEffect(() => {
    getData();
  }, [documentId]);
  if (newFile) {
    var { contenType, description, name, url, _id } = newFile;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateFiles(newFile,courseId);
    await setShowDocEdit(false);
  };
  const onCloseButton = () => {
    setShowDocEdit(false);
  };
  const handleFile = (event) => {
    setNewFile({
      ...newFile,
      [event.target.name]: event.target.value,
    });
  };
  console.log("newFile", newFile);

  return (
    <Modal size="lg" show={showDocEdit} onHide={onCloseButton}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thông tin tài liệu</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tên tài liệu</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Tên file"
              value={name}
              onChange={handleFile}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Mô tả"
              value={description}
              onChange={handleFile}
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

export default EditDocument;
