import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../contexts/constants";
import { CourseContexts } from "../contexts/CourseContexts";

import DoneIcon from "@material-ui/icons/Done";

import CloseIcon from "@material-ui/icons/Close";

const TestReview = () => {
  const [quizzes, SetQuizzes] = useState([]);
  const [correctAnsw, setCorrectAnsw] = useState([]);
  const [count, setCount] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const { courseId } = useParams();
  const { quizzResult } = useContext(CourseContexts);
  console.log("courseId", courseId);
  async function getQuizz() {
    try {
      const questions = await axios.get(`${apiUrl}/quizz/${courseId}`);

      const quizArray = questions.data.quizz;
      let arrayCorrectA = [];
      quizArray.forEach((element) => {
        arrayCorrectA.push(element.correct_answer);
      });
      setCorrectAnsw(arrayCorrectA);
      SetQuizzes(quizArray);
    } catch (e) {
      console.error(e.message);
    }
  }
  useEffect(() => {
    getQuizz();
    if (quizzResult) {
      setCount(quizzResult.score);
      setWrongAnswer(quizzResult.wrongAnswer);
    }
  }, []);

  const checkSubmit = (value) => {
    let checkCorrectA = correctAnsw.find((el) => el === value);
    if (checkCorrectA) {
      return <DoneIcon style={{ color: "green" }} />;
    } else {
      return <CloseIcon style={{ color: "red" }} />;
    }
    return "";
  };

  const checkWrongAnswer = (item) => {
    let check = wrongAnswer.find((i) => i === item);
    if (check) {
      return "ans";
    }
    return "";
  };
  console.log("quizzes", quizzes);
  console.log("correctAnsw", correctAnsw);
  console.log("quizzResult", quizzResult);
  console.log("count", count);
  console.log("countWrongAnswer", wrongAnswer);
  return (
    <div className="quiz_view d-flex justify-content-center">
      <div className="quiz-container">
        <span
          style={{
            float: "right",
            color: "red",
          }}
        >
        Câu đúng : {count}/{quizzes.length}
        </span>
        <div>
          <p className="author">Tác giả : </p>
          <h1>Kì Thi</h1>
          <div className="question_card">
            {quizzes.length > 0 ? (
              quizzes.map((row, index) => (
                <div key={row._id}>
                  <h5>
                    {row.question} :
                    {row.difficulty ? (
                      <span style={{ color: "red", fontSize: "10px" }}>
                        (Nâng cao)*
                      </span>
                    ) : (
                      ""
                    )}
                  </h5>
                  <div className="answer_sec">
                    {row.answers.map((item, s) => {
                      return (
                        <div
                          className={`${checkWrongAnswer(item)} answers`}
                          key={s}
                        >
                          <span style={{ margin: "0 10px", display: "block" }}>
                            {item}
                          </span>
                          {checkSubmit(item)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center loader_spinner">
                <p>123</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestReview;
