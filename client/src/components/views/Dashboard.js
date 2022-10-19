import React from "react";
import NavbarMenu from "../layout/NavbarMenu";
import { PostContexts } from "../contexts/PostContexts";
import { AuthContext } from "../contexts/AuthContexts";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
const Dashboard = () => {
  // Contexts
  let body = null;
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { posts, postsLoading },
    getPosts,
  } = useContext(PostContexts);
  //get post
  useEffect(() => {
    getPosts();
  }, []);
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <div>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary">LearnIt!</Button>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
  }
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      {body}
    </div>
  );
};

export default Dashboard;
