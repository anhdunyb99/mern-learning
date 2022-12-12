import React, { useContext, useEffect } from "react";
import { CourseContexts } from "../contexts/CourseContexts";
import Menu from "../layout/Menu";
import UploadFile from "../common-component/UploadFile";
import { SelectBox } from "../common-component/SelectBox";
import { StudentContexts } from "../contexts/StudentContext";
import ReactPlayer from "react-player";
import { Navigate, useNavigate } from "react-router-dom";
import { FileViewer } from "react-file-viewer";
import {
  Container,
  Paper,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UpdateCourseDetail from "./UpdateCourseDetail";
import QuizzAddModal from "../quizz/QuizzAddModal";
import CommonHeader from "../common-component/CommonHeader";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
const CourseDetail = () => {
  const {
    courseState: { course },
    setShowUploadModal,
    setShowAddStudentModal,
    setShowUpdateCourseDetail,
    setShowAddQuizzModal,
  } = useContext(CourseContexts);

  const {
    getAllStudent,
    studentState: { students },
  } = useContext(StudentContexts);
  const navigate = useNavigate();
  const startExam = () => {
    navigate(`/quizz/${course._id}`);
  };
  useEffect(() => {
    getAllStudent();
  }, []);
  console.log("course", course);
  return (
    <>
      {course && <CommonHeader title={course.name} />}

      <Container className="my-5">
        <Paper className="px-5 py-3">
          <Button
            variant="outlined"
            startIcon={<ControlPointIcon />}
            onClick={setShowUploadModal.bind(this, true)}
          >
            Upload tài liều
          </Button>
          <Button
            variant="outlined"
            startIcon={<ControlPointIcon />}
            onClick={setShowAddStudentModal.bind(this, true)}
          >
            Thêm học sinh
          </Button>
          <Button
            variant="outlined"
            startIcon={<ControlPointIcon />}
            onClick={setShowUpdateCourseDetail.bind(this, true)}
          >
            Chỉnh sửa thông tin khóa học
          </Button>
          <Button
            variant="outlined"
            startIcon={<ControlPointIcon />}
            onClick={setShowAddQuizzModal.bind(this, true)}
          >
            Thêm câu hỏi
          </Button>
          <Button variant="outlined" onClick={startExam}>
            Bắt đầu bài thi
          </Button>
          <div>
            {course ? (
              <div>
                <UploadFile />
                <SelectBox props={students} />
                <UpdateCourseDetail />
                <QuizzAddModal />
                {course.files.map((courses, index) =>
                  courses.contenType == "video/mp4" ? (
                    <Accordion
                      key={index}
                      style={{ backgroundColor: "#EDEFF7" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{courses.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <video width="320" height="240" controls>
                          <source src={courses.url} type="video/mp4" />
                        </video>
                        <Divider />
                      </AccordionDetails>
                    </Accordion>
                  ) : courses.contenType == "image/jpeg" ||
                    courses.contenType == "image/png" ? (
                    <Accordion
                      key={index}
                      style={{ backgroundColor: "#EDEFF7" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{courses.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <img width="320" height="240" src={courses.url} />
                        <Divider />
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <Accordion
                      key={index}
                      style={{ backgroundColor: "#EDEFF7" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{courses.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          <a href={courses.url}>
                            <button className="bi bi-filetype-pdf">
                              View PDF
                            </button>
                          </a>
                        </div>
                        <Divider />
                      </AccordionDetails>
                    </Accordion>
                  )
                )}
              </div>
            ) : (
              <Navigate to="/courses" />
            )}
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default CourseDetail;
