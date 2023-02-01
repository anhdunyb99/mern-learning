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
import Menu from "./components/layout/Menu";
import StudentContextProvider from "./components/contexts/StudentContext";
import Meet from "./components/Meeting/Meet";

import Room from "./components/Meeting/Room";
import { ContextProvider } from "./components/contexts/SocketContexts";
import QuizzPage from "./components/quizz/QuizzPage";
import QuizzResult from "./components/quizz/QuizzResult";
import TestReview from "./components/quizz/TestReview";
import EditQuizzPage from "./components/quizz/EditQuizzPage";
import CourseManagement from "./components/views/CourseManagement";
import UserManagement from "./components/views/UserManagement";
import DocumentManagement from "./components/courses/DocumentManagement";
function App() {
  return (
    <AuthContextProvider>
      <PostContextsProvider>
        <CourseContextsProvider>
          <StudentContextProvider>
            <ContextProvider>
              <BrowserRouter>
                <Menu />
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

                  <Route
                    path="/meeting"
                    element={
                      <ProtectedRoute>
                        <Meet />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/room/:roomId"
                    element={
                      <ProtectedRoute>
                        <Room />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/quizz/:courseId"
                    element={
                      <ProtectedRoute>
                        <QuizzPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/document/:courseId"
                    element={
                      <ProtectedRoute>
                        <DocumentManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/quizz-management/:courseId"
                    element={
                      <ProtectedRoute>
                        <EditQuizzPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/quizz/:quizzId/results"
                    element={
                      <ProtectedRoute>
                        <QuizzResult />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/quizz/:courseId/review"
                    element={
                      <ProtectedRoute>
                        <TestReview />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/course-management"
                    element={
                      <ProtectedRoute>
                        <CourseManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-management"
                    element={
                      <ProtectedRoute>
                        <UserManagement />
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
            </ContextProvider>
          </StudentContextProvider>
        </CourseContextsProvider>
      </PostContextsProvider>
    </AuthContextProvider>
  );
}

export default App;
