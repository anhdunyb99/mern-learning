import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import NavBarMenu from "../layout/NavbarMenu";
import UpdateUserDetailModal from "../user/UpdateUserDetailModal";
import addIcon from "../../assets/plus-circle-fill.svg";
import Button from "react-bootstrap/esm/Button";
const Profile = () => {
  const {
    authState: {
      user: { fullName, email, username, role },
    },
    showUpdateProfile,setShowUpdateProfile
  } = useContext(AuthContext);
  const updateUserProfile = () => {
    setShowUpdateProfile(true)
  }
  return (
    <div>
      <NavBarMenu />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2224153097764952&height=50&width=50&ext=1669482898&hash=AeRe9aPCl1Xao5iFBTg"
              />
              <span className="font-weight-bold">{fullName}</span>
              <span className="text-black-50">{email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Full Name </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={fullName}
                    readOnly
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Username</label>
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
                  <label className="labels">Role</label>
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
                <button onClick={updateUserProfile}
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Edit Experience</span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus"></i>&nbsp;Experience
                </span>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Experience in Designing</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="experience"
                  //value=""
                />
              </div>{" "}
              <br />
              <div className="col-md-12">
                <label className="labels">Additional Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="additional details"
                  //value=""
                />
              </div>
            </div>
            
          </div>
        </div>
        <UpdateUserDetailModal />
      </div>
    </div>
  );
};

export default Profile;
