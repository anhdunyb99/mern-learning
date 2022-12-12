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
import { SocketProvider } from "./components/contexts/SocketContexts";
import Room from "./components/Meeting/Room";
import { PeerProvider } from "./components/contexts/PeerContexts";
import QuizzPage from "./components/quizz/QuizzPage";
function App() {
  return (
    <AuthContextProvider>
      <PostContextsProvider>
        <CourseContextsProvider>
          <StudentContextProvider>
            <SocketProvider>
              <PeerProvider>
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
                      path="/login"
                      element={<Auth authRoute={"login"} />}
                    />
                    <Route
                      path="/register"
                      element={<Auth authRoute={"register"} />}
                    />
                  </Routes>
                </BrowserRouter>
              </PeerProvider>
            </SocketProvider>
          </StudentContextProvider>
        </CourseContextsProvider>
      </PostContextsProvider>
    </AuthContextProvider>
  );
}

export default App;
