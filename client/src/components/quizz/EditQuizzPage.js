import React, { useContext, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { apiUrl } from "../contexts/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import { CourseContexts } from "../contexts/CourseContexts";
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});
const EditQuizzPage = () => {
  const {
    courseState: { quizzs },
    updateQuizzsState,
    getAllQuiz,
    deleteQuiz
  } = useContext(CourseContexts);
  const { courseId } = useParams();
  const [question, setQuestion] = useState("");
  const [correct_answer, setCorrectAnsw] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [category, setCategory] = useState("");
  const [difficult, setDifficult] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getAllQuiz(courseId);
  }, []);
  
  const handleEditItem = async (id) => {
    setShowEditModal(true);
    const res = await axios.get(`${apiUrl}/quizz/find-quizz/${id}`);
    if (res.status == 200) {
      let quizz = res.data.data;
      setIdEdit(quizz._id);
      setQuestion(quizz.question);
      setCorrectAnsw(quizz.correct_answer);
      setAnswer1(quizz.answers[0]);
      setAnswer2(quizz.answers[1]);
      setAnswer3(quizz.answers[2]);
      setAnswer4(quizz.answers[3]);
      setCategory(quizz.category);
      setDifficult(quizz.difficulty);
    }
  };
  /* console.log("question", question);
  console.log("correct_answer", correct_answer);
  console.log("category", category);
  console.log("difficult", difficult);
  console.log("answer1", answer1);
  console.log("answer1", answer2);
  console.log("answer1", answer3);
  console.log("answer1", answer4); */
  const handleDeleteItem = async (id) => {
    const res = await axios.delete(`${apiUrl}/quizz/${id}`);
    await deleteQuiz(res)
  };

  const closeDialog = () => {
    setShowEditModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let correctAnsArr = [];
    correctAnsArr.splice(0, 0, answer1, answer2, answer3, answer4);
    if (correctAnsArr.includes(correct_answer)) {
      const res = await axios.put(`${apiUrl}/quizz/${idEdit}`, {
        category: category,
        typeCourse: courseId,
        isStart: false,
        difficulty: difficult,
        question: question,
        correct_answer: correct_answer,
        answers: correctAnsArr,
      });
      
      if (res.status == 200) {
        updateQuizzsState(res)
        alert("Chỉnh sửa thành công");
        setCategory("");
        setDifficult(false);
        setQuestion("");
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setAnswer4("");
        setCorrectAnsw("");
        setShowEditModal(false);
      } else {
        alert("Đáp án không trùng khớp");
      }
    }
  };
  const handleClose = () => {
    setShowEditModal(false);
  };
  return (
    <div>
      <Container>
        <Container fluid className="mb-5 mt-5">
          <Row>
            <Col md={12}>
              <Paper className="p-5 m-3 shadow">
                <Typography
                  className="text-center font-weight-bold pb-4"
                  variant="h5"
                >
                  Danh sách câu hỏi
                </Typography>
                <Container className={classes.root}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow className="bg-dark ">
                          <TableCell align="center" className="text-light">
                            Câu hỏi
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Chủ đề
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Độ khó
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Đáp án đúng
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Hành động
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {quizzs.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.question}</TableCell>
                            <TableCell align="center">{row.category}</TableCell>
                            <TableCell align="center">
                              {row.difficulty ? (
                                <span className="alert alert-danger">Khó</span>
                              ) : (
                                ""
                              )}
                            </TableCell>
                            <TableCell align="center">
                              <span className="alert alert-success">
                                {row.correct_answer}
                              </span>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                style={{
                                  fontSize: "10px",
                                  marginRight: "10px",
                                }}
                                onClick={() => handleEditItem(row._id)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                style={{ fontSize: "10px" }}
                                onClick={() => handleDeleteItem(row._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Container>
              </Paper>
            </Col>
          </Row>
        </Container>
      </Container>

      <Modal
        size="lg"
        show={showEditModal}
        animation={false}
        onHide={closeDialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa câu hỏi</Modal.Title>
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
            <Button onClick={handleClose}>Thoát</Button>
            <Button type="submit">Chỉnh sửa</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditQuizzPage;
