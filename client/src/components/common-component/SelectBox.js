import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { CourseContexts } from "../contexts/CourseContexts";
import { StudentContexts } from "../contexts/StudentContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export const SelectBox = ({ props }) => {
  const [state, setState] = useState(null);
  const {
    addStudentToCourse,
    courseState: { course },
    showAddStudentModal,
    setShowAddStudentModal,
  } = useContext(CourseContexts);
  let newProps = [];
  const closeDialog = () => {
    setShowAddStudentModal(false);
  };

  const handleSelectChange = (event) => {
    setState(event);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudentToCourse(course._id, state);
    setShowAddStudentModal(false);
  };
  /* useEffect(() => {
    
  }, []); */
  if (course) {
    newProps = props.filter((x) => {
      return course.listStudent.indexOf(x._id) === -1;
    });
  }
  /* <form onSubmit={handleSubmit}>
    <Select
      options={newProps.map((x) => ({ label: x.fullName, value: x._id }))}
      onChange={handleSelectChange}
      isMulti
    />
    <button type="submit">Select</button>
  </form>; */
  return (
    <Modal show={showAddStudentModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới học sinh</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Select
              options={newProps.map((x) => ({
                label: x.fullName,
                value: x._id,
              }))}
              onChange={handleSelectChange}
              isMulti
            />
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
