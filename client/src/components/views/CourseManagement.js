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
import { Button } from "@material-ui/core";
import { CourseContexts } from "../contexts/CourseContexts";
import UpdateCourseDetail from "../courses/UpdateCourseDetail";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import AddCourseModal from "../courses/AddCourseModal";
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});
const CourseManagement = () => {
  const [idCourse, setIdCourse] = useState("");
  const {
    courseState: { courses },
    setShowUpdateCourseDetail,
    getAllCourse,
    setEditCourseId,
    getCourseById,
    setShowAddCourse,
    deleteCourse
  } = useContext(CourseContexts);
  const classes = useStyles();

  const handleEditItem = async (id) => {
    await setEditCourseId(id);
    await setShowUpdateCourseDetail(true);
  };
  const handleDeleteItem = async (id) => {
    const res = await axios.delete(`${apiUrl}/courses/${id}`);
    
    await deleteCourse(res)
  };
  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <div>
      <UpdateCourseDetail />
      <AddCourseModal />
      <Container>
        <Container fluid className="mb-5 mt-5">
          <Row>
            <Col md={12}>
              <Paper className="p-5 m-3 shadow">
                <Button
                  variant="outlined"
                  startIcon={<ControlPointIcon />}
                  onClick={setShowAddCourse.bind(this, true)}
                  className="mr-2"
                >
                  Thêm khóa học
                </Button>
                <Typography
                  className="text-center font-weight-bold pb-4"
                  variant="h5"
                >
                  Danh sách khóa học
                </Typography>
                <Container className={classes.root}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow className="bg-dark ">
                          <TableCell align="center" className="text-light">
                            Khóa học
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Mô tả
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Giáo viên
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Hành động
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {courses.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                              {row.description}
                            </TableCell>
                            <TableCell align="center"></TableCell>
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
    </div>
  );
};

export default CourseManagement;
