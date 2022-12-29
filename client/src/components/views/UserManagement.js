import React, { useContext, useEffect } from "react";
import { StudentContexts } from "../contexts/StudentContext";
import { makeStyles } from "@material-ui/core/styles";
import { apiUrl } from "../contexts/constants";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditUserModal from "../user/EditUserModal";
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});
const UserManagement = () => {
  const {
    getAllStudent,
    studentState: { students },
    setEditStudentId,
    setShowEditModal,
    deleteStudent,
  } = useContext(StudentContexts);
  useEffect(() => {
    getAllStudent();
  }, []);
  const classes = useStyles();
  const handleEditItem = async (id) => {
    await setEditStudentId(id);
    await setShowEditModal(true);
  };

  const handleDeleteItem = async (id) => {
    await deleteStudent(id);
    console.log(id);
  };
  console.log("students", students);
  return (
    <div>
      <EditUserModal />
      <Container>
        <Container className="mb-5 mt-5">
          <Row>
            <Col md={12}>
              <Paper className="p-5 m-3 shadow">
                <Typography
                  className="text-center font-weight-bold pb-4"
                  variant="h5"
                >
                  Danh sách học sinh
                </Typography>
                <Container className={classes.root}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow className="bg-dark ">
                          <TableCell align="center" className="text-light">
                            Tài khoản
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Tên học sinh
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Email
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Hành động
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {students.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.fullName}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
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

export default UserManagement;
