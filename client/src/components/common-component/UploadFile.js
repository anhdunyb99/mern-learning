import React, { useContext, useState } from "react";
import { apiUrl } from "../contexts/constants";
import axios from "axios";
import { PostContexts } from "../contexts/PostContexts";
import { CourseContexts } from "../contexts/CourseContexts";
const UploadFile = () => {
  const { uploadFile } = useContext(PostContexts);
  const {
    courseState: { course },
  } = useContext(CourseContexts);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("e.target.files", e.target.files);
  };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myfile", selectedFile);
    //await uploadFile(formData);
    await axios.post(
      `${apiUrl}/posts/uploadFile/${course._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/formData",
        },
      }
    );
  };
  const handleGetFile = async (e) => {
    e.preventDefault();
    await axios.get(`${apiUrl}/posts/getFile`);
  };
  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input type="file" onChange={handleFileSelected}></input>
        <input type="submit" value="Upload File" />
      </form>
    </div>
  );
};

export default UploadFile;
