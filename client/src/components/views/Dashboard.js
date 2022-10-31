import React from "react";
import NavbarMenu from "../layout/NavbarMenu";
import { PostContexts } from "../contexts/PostContexts";
import { AuthContext } from "../contexts/AuthContexts";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SinglePost from "../posts/SinglePost";
import AddPostModal from "../posts/AddPostModal";
import addIcon from "../../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import UpdatePostModal from "../posts/UpdatePostModal";
const Dashboard = () => {
  // Contexts
  let body = null;
  const {
    authState: {
      user: { fullName },
    },
  } = useContext(AuthContext);

  const {
    postState: { post,posts, postsLoading },
    getPosts,
    setShowAddModal,
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
          <Card.Header as="h1">Hi {fullName}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary">LearnIt!</Button>
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>Add a new thing to learn</Tooltip>}
            >
              <Button
                className="btn-floating"
                onClick={setShowAddModal.bind(this, true)}
              >
                <img src={addIcon} alt="add-post" width="60" height="60" />
              </Button>
            </OverlayTrigger>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    body = (
      <div>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </div>
    );
  }
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      {body}
      <AddPostModal></AddPostModal>
      {post !== null && <UpdatePostModal />}
    </div>
  );
};

export default Dashboard;
