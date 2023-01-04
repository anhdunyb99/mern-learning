import React, { useContext, useEffect, useState } from "react";
import { CourseContexts } from "../contexts/CourseContexts";

import UploadFile from "../common-component/UploadFile";
import { SelectBox } from "../common-component/SelectBox";
import { StudentContexts } from "../contexts/StudentContext";
import ReactPlayer from "react-player";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FileViewer } from "react-file-viewer";
import {
  Container,
  Paper,
  Typography,
  Button,
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UpdateCourseDetail from "./UpdateCourseDetail";
import QuizzAddModal from "../quizz/QuizzAddModal";
import CommonHeader from "../common-component/CommonHeader";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Dropdown from "react-bootstrap/Dropdown";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import NoticeToggleRow from "../common-component/NoticeToggleRow";
import AddNotificationModal from "../notification/AddNotificationModal";

const CourseDetail = () => {
  const {
    courseState: { course, notifications },
    setShowUploadModal,
    setShowAddStudentModal,
    setShowUpdateCourseDetail,
    setShowAddQuizzModal,
    setShowAddNotification,
    getNotification,
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
    if (course) {
      getNotification(course._id);
    }
  }, []);

  const listQuizz = () => {
    navigate(`/quizz-management/${course._id}`);
  };
  const formatDate = (data) => {
    const yyyy = new Date(data).getFullYear();

    let mm = new Date(data).getMonth() + 1; // Months start at 0!
    let dd = new Date(data).getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
  };
  return (
    <>
      {course && <CommonHeader title={course.name} />}

      <Container className="my-5">
        <Paper className="py-1 px-3 mb-5">
          <p
            style={{
              fontWeight: 800,
              color: "red",
              display: "inline-block",
              marginRight: "20px",
            }}
          >
            Thông báo của giáo viên:
          </p>
          <ul>
            {notifications.length > 0 &&
              notifications.map((e) => (
                <li
                  key={e._id}
                  style={{
                    borderBottom: "1px solid gray",
                    margin: "10px 0",
                    listStyle: "none",
                  }}
                  className="notification"
                >
                  <span
                    style={{
                      float: "right",
                      fontSize: "12px",
                      fontStyle: "italic",
                    }}
                  >
                    {formatDate(e.createdAt)}
                  </span>
                  <p>{e.description}</p>
                </li>
              ))}
          </ul>
        </Paper>
        <Paper className="px-5 py-3">
          {localStorage.role === "TEACHER" && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Quản lý khóa học
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href=""
                  onClick={setShowUploadModal.bind(this, true)}
                >
                  Upload tài liệu
                </Dropdown.Item>
                <Dropdown.Item
                  href=""
                  onClick={setShowAddStudentModal.bind(this, true)}
                >
                  Thêm học sinh
                </Dropdown.Item>
                <Dropdown.Item
                  href=""
                  onClick={setShowUpdateCourseDetail.bind(this, true)}
                >
                  Chỉnh sửa thông tin khóa học
                </Dropdown.Item>
                <Dropdown.Item
                  href=""
                  onClick={setShowAddQuizzModal.bind(this, true)}
                >
                  Thêm câu hỏi
                </Dropdown.Item>
                <Dropdown.Item
                  href=""
                  onClick={setShowAddNotification.bind(this, true)}
                >
                  Thêm thông báo
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}

          <Button variant="outlined" onClick={startExam}>
            Bắt đầu bài thi
          </Button>

          {localStorage.role === "TEACHER" && (
            <Button variant="outlined" onClick={listQuizz}>
              Danh sách câu hỏi
            </Button>
          )}
          <div>
            {course ? (
              <div>
                <Accordion style={{ backgroundColor: "#EDEFF7" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Mô tả lớp học</Typography>
                  </AccordionSummary>
                  <Typography className="mx-3 my-2" variant="h6">
                    {course.name}
                  </Typography>
                  <AccordionDetails>
                    <NoticeToggleRow
                      Icon={InsertCommentIcon}
                      title={course.description}
                      description={course.courseDetail}
                    />
                    <Divider />
                  </AccordionDetails>
                </Accordion>
                <UploadFile />
                <SelectBox props={students} />
                <UpdateCourseDetail />
                <AddNotificationModal />
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
