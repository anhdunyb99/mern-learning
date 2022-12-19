import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { CourseContexts } from "../contexts/CourseContexts";
const QuizzResult = () => {
  const { quizzId } = useParams();

  const [count, setCount] = useState(0);
  const [countWrongAnswer, setCountWrongAnswer] = useState([]);
  const { getQuizzResultById, quizzResult } = useContext(CourseContexts);
  useEffect(() => {
    getQuizzResultById(quizzId);
    if (quizzResult) {
      setCount(quizzResult.score);
      setCountWrongAnswer(quizzResult.wrongAnswer);
    }
  }, []);
  const navigate = useNavigate();
  console.log("quizzResult", quizzResult);
  console.log("count", count);
  console.log("countWrongAnswer", countWrongAnswer);
  const reviewingExam = () => {
    navigate(`/quizz/${quizzResult.typeCourse}/review`);
  };
  const routerChange = () => {
    navigate(`/courses`)
  };
  return (
    <div className="result">
      <div className="d-flex align-items-center justify-content-center"></div>
      <div className="result_card">
        <div className="d-flex justify-content-center align-items-center">
          <div className="res_head center">
            <h3 style={{ margin: "0px" }}>Kết quả của bạn {count} </h3>
          </div>

          <div className="result_card_header">
            {count >= 4 ? (
              <img className="result_gif" alt="winner_gif" />
            ) : (
              <SentimentVeryDissatisfiedIcon
                style={{ color: "rgb(252, 196, 11)" }}
              />
            )}
          </div>
        </div>

        <div className="result_card_body">
          <div className="result_uname center w-40">
            <h6>Ten user</h6>
          </div>
          <div className="result_Bar center">
            <CircularProgressbar
              className="bar_prog"
              value={count}
              maxValue={5}
              text={`${count}/${countWrongAnswer.length}`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "30px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `${count > 3 ? "#5eff86" : "red"}`,
                textColor: `${count > 3 ? "#5eff86" : "red"}`,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
          <div>
            <button
              onClick={reviewingExam}
              className="res_btns d-flex align-items-center justify-content-center width-200"
            >
              Xem lại KQ
            </button>
            <button
              onClick={routerChange}
              className="res_btns d-flex align-items-center justify-content-center width-200"
            >
              Quay Lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzResult;
