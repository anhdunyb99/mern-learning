import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../contexts/constants";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import "./Quizz.css";
const QuizzPage = () => {
  const { courseId } = useParams();
  const [correctAnsw, setCorrectAnsw] = useState([]);
  const [userAnsw, setUserAnsw] = useState([]);
  const [quizzes, SetQuizzes] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
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
  console.log("correctAnsw", correctAnsw);
  console.log("quizzes", quizzes);
  useEffect(() => {
    getQuizz();
  }, []);
  const handleAnswer = (index, e) => {
    const checkIndex = userAnsw.find((el) =>
      el.hasOwnProperty([`item${index}`])
    );
    if (!checkIndex) {
      setUserAnsw([
        ...userAnsw,
        {
          [`item${index}`]: e.target.value,
        },
      ]);
    } else {
      let person = userAnsw.filter(
        (person) => person[`item${index}`] !== checkIndex[`item${index}`]
      );
      setUserAnsw([
        ...person,
        {
          [`item${index}`]: e.target.value,
        },
      ]);
    }
  };
  console.log("userAnsw", userAnsw);
  const checkSubmit = (value) => {
    let checkCorrectA = correctAnsw.find((el) => el === value);
    if (checkCorrectA) {
      return <DoneIcon style={{ color: "green" }} />;
    } else {
      return <CloseIcon style={{ color: "red" }} />;
    }
    return "";
  };
  const checkHere = (index, value) => {
    let check = userAnsw.find((el) => el.hasOwnProperty([`item${index}`]));
    if (check && check[`item${index}`] === value) {
      return <RadioButtonCheckedIcon style={{ color: "green" }} />;
    } else {
      return "";
    }
    return "";
  };
  async function quizSubmit(e) {
    e.preventDefault();
    let arrAnswerWrong = [];
    if (userAnsw.length < quizzes.length) {
      alert("Vui long dien het cac cau tra loi");
      return;
    }
    setIsSubmit(true);
    let marks = 0;
    for (let i = 0; i < userAnsw.length; i++) {
      arrAnswerWrong.push(userAnsw[i][`item${i}`]);
      if (userAnsw[i][`item${i}`] === correctAnsw[i]) {
        marks = marks + 1;
      }
    }
    console.log("marks", marks);
    /* const result = await axios.post(`/post-leader`, {
      name: userName,
      typeCourse: courseId,
      score: marks,
      wrongAnswer: arrAnswerWrong,
      date: Date.now(),
    }); */

    /* history.push(`/quiz/${courseId}/results`); */
  }
  return (
    <div className="quiz_view d-flex justify-content-center">
      <div className="quiz-container">
        <div>
          <p className="author">Tác giả</p>
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
                  <div
                    className="answer_sec"
                    onChange={(e) => handleAnswer(index, e)}
                  >
                    {row.answers.map((item, s) => {
                      return (
                        <div className="answers" key={s}>
                          <input type="radio" name="one" value={item} />
                          <span style={{ margin: "0 10px", display: "block" }}>
                            {item}
                          </span>
                          {isSubmit
                            ? checkSubmit(item)
                            : checkHere(index, item)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div>234</div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {!isSubmit && (
            <button
              type="submit"
              className="quizsubmit"
              onClick={(e) => quizSubmit(e)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizzPage;
