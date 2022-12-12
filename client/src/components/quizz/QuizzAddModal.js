import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { CourseContexts } from "../contexts/CourseContexts";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
const QuizzAddModal = () => {
  const {
    showAddQuizzModal,
    setShowAddQuizzModal,
    courseState: { course },
  } = useContext(CourseContexts);
  const [question, setQuestion] = useState("");
  const [correct_answer, setCorrectAnsw] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [category, setCategory] = useState("");
  const [difficult, setDifficult] = useState(false);
  const closeDialog = () => {
    setShowAddQuizzModal(false);
  };
  const handleClose = () => {
    setShowAddQuizzModal(false);
  };
  
  /* console.log("question", question);
  console.log("correct_answer", correct_answer);
  console.log("category", category);
  console.log("difficult", difficult);
  console.log("answer1", answer1);
  console.log("answer1", answer2);
  console.log("answer1", answer3);
  console.log("answer1", answer4); */
  const onSubmit = async (e) => {
    e.preventDefault();
    let correctAnsArr = [];
    correctAnsArr.splice(0, 0, answer1, answer2, answer3, answer4);
    if (correctAnsArr.includes(correct_answer)) {
      const res = await axios.post(`${apiUrl}/quizz`, {
        category: category,
        typeCourse: course._id,
        isStart: false,
        difficulty: difficult,
        question: question,
        correct_answer: correct_answer,
        answers: correctAnsArr,
      });
      console.log("res", res);
      if (res.status == 200) {
        alert("Tạo câu hỏi thành công");
        setCategory("");
        setDifficult(false);
        setQuestion("");
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setAnswer4("");
        setCorrectAnsw("");
        setShowAddQuizzModal(false);
      } else {
        alert("Đáp án không trùng khớp");
      }
    }
  };
  return (
    <Modal
      size="lg"
      show={showAddQuizzModal}
      animation={false}
      onHide={closeDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới câu hỏi</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Thể loại câu hỏi</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              type="text"
              placeholder="Thể loại câu hỏi"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Độ Khó</Form.Label>
            <Form.Check
              checked={difficult}
              onChange={(e) => {
                setDifficult(true);
              }}
              type="checkbox"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nhập câu hỏi</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              value={question}
              type="text"
              placeholder="Câu hỏi"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Đáp án 1</Form.Label>
            <Form.Control
              required
              onChange={(e) => {
                setAnswer1(e.target.value);
              }}
              value={answer1}
              type="text"
              placeholder="Đáp án 1"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Đáp án 2</Form.Label>

            <Form.Control
              required
              onChange={(e) => {
                setAnswer2(e.target.value);
              }}
              value={answer2}
              type="text"
              placeholder="Đáp án 2"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Đáp án 3</Form.Label>

            <Form.Control
              required
              onChange={(e) => {
                setAnswer3(e.target.value);
              }}
              value={answer3}
              type="text"
              placeholder="Đáp án 3"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Đáp án 4</Form.Label>

            <Form.Control
              required
              onChange={(e) => {
                setAnswer4(e.target.value);
              }}
              value={answer4}
              type="text"
              placeholder="Đáp án 4"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Đáp án đúng</Form.Label>

            <Form.Control
              required
              onChange={(e) => {
                setCorrectAnsw(e.target.value);
              }}
              value={correct_answer}
              type="text"
              placeholder="Đáp án đúng"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

export default QuizzAddModal;
