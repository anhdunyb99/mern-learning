import React, { useContext, useEffect, useState } from "react";
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
import { TablePagination, TableFooter } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
  };

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
                  Danh sách người dùng
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
                            SĐT
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Chức vụ
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Hành động
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? students.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : students
                        ).map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.fullName}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">
                              {row.phoneNumber}
                            </TableCell>
                            <TableCell align="center">{row.role}</TableCell>
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
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              7,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            colSpan={3}
                            count={students.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: { "aria-label": "rows per page" },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
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
