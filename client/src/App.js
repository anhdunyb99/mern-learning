import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import React from "react";
import Landing from "./components/layout/Landing";
import Auth from "./components/views/Auth";
import AuthContextProvider from "./components/contexts/AuthContexts";
import Dashboard from "./components/views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Profile from "./components/views/Profile";
import PostContextsProvider from "./components/contexts/PostContexts";
import Courses from "./components/views/Courses";
import CourseContextsProvider from "./components/contexts/CourseContexts";
import Home from "./components/home/Home";
import CourseDetail from "./components/courses/CourseDetail";
function App() {
  return (
    <AuthContextProvider>
      <PostContextsProvider>
        <CourseContextsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses"
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses-detail"
                element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Auth authRoute={"login"} />} />
              <Route
                path="/register"
                element={<Auth authRoute={"register"} />}
              />
            </Routes>
          </BrowserRouter>
        </CourseContextsProvider>
      </PostContextsProvider>
    </AuthContextProvider>
  );
}

export default App;
