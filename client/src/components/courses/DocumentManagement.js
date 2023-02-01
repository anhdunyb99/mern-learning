import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseContexts } from "../contexts/CourseContexts";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { TablePagination, TableFooter } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import EditDocument from "./EditDocument";
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});
const DocumentManagement = () => {
  const { courseId } = useParams();
  const {
    courseState: { course },
    getCourseById,
    setDocumentId,
    setShowDocEdit,
    deleteFile
  } = useContext(CourseContexts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    getCourseById(courseId);
  }, []);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, course.files.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const classes = useStyles();

  const handleEditItem = async (id) => {
    setDocumentId(id);
    setShowDocEdit(true)
  };
  const handleDeleteItem = async (id) => {
    deleteFile(courseId,id)
  };
  return (
    <div>
      <EditDocument />
      <Container>
        <Container className="mb-5 mt-5">
          <Row>
            <Col md={12}>
              <Paper className="p-5 m-3 shadow">
                <Typography
                  className="text-center font-weight-bold pb-4"
                  variant="h5"
                >
                  Danh sách tài liệu
                </Typography>
                <Container className={classes.root}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow className="bg-dark ">
                          <TableCell align="center" className="text-light">
                            Tên tài liệu
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Mô tả
                          </TableCell>
                          <TableCell align="center" className="text-light">
                            Hành động
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? course.files.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : course.files
                        ).map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                              {row.description}
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
                                Sửa
                              </Button>
                              <Button
                                variant="contained"
                                style={{ fontSize: "10px" }}
                                onClick={() => handleDeleteItem(row._id)}
                              >
                                Xóa
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
                            count={course.files.length}
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

export default DocumentManagement;
