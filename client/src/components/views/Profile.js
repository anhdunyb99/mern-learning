import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import NavBarMenu from "../layout/NavbarMenu";
import UpdateUserDetailModal from "../user/UpdateUserDetailModal";
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/esm/Button";
import Menu from "../layout/Menu";
import { Container } from "@material-ui/core";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
const Profile = () => {
  const {
    authState: {
      user: { fullName, email, username, role, phoneNumber },
    },
    showUpdateProfile,
    setShowUpdateProfile,
  } = useContext(AuthContext);
  const updateUserProfile = () => {
    setShowUpdateProfile(true);
  };
  
  return (
    <>
      <Container>
        <Container className="mb-5 mt-5">
          <Row>
            <Col md={12}>
              <Paper className="p-5 m-3 shadow">
                <div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Thông tin cá nhân</h4>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-12">
                        <label className="labels">Họ và tên</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full name"
                          value={fullName}
                          readOnly
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Tên đăng nhập</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={username}
                          readOnly
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          readOnly
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">SĐT</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="SĐT"
                          value={phoneNumber}
                          readOnly
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Chức vụ</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Role"
                          value={role}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mt-5 text-center">
                      <button
                        onClick={updateUserProfile}
                        className="btn btn-primary profile-button"
                        type="button"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </Paper>
            </Col>
          </Row>
        </Container>
      </Container>

      <UpdateUserDetailModal />
    </>
  );
};

export default Profile;
