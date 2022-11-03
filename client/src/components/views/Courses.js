import React from "react";
import NavbarMenu from "../layout/NavbarMenu";
import UploadFile from "../common-component/UploadFile";
import FileViewer from "react-file-viewer";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
const type = "jpeg";
const file = "http://localhost:5000/uploads//test-test-test1.jpeg";
const Courses = () => {
  const CustomErrorComponent = () => {
    console.log("error");
  };
  const onError = (e) => {
    console.log("error");
  };
  return (
    <div>
      <NavbarMenu />
      <p>Courses</p>
      <FileViewer
      fileType={type}
      filePath='http://localhost:5000/uploads//test-test-test1.jpeg'
      errorComponent={CustomErrorComponent}
      onError={onError}/>

    </div>
  );
};

export default Courses;
