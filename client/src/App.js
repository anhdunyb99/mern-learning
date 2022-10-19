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
import About from "./components/views/About";
import PostContextsProvider from "./components/contexts/PostContexts";
function App() {
  return (
    <AuthContextProvider>
      <PostContextsProvider>
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
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Auth authRoute={"login"} />} />
            <Route path="/register" element={<Auth authRoute={"register"} />} />
          </Routes>
        </BrowserRouter>
      </PostContextsProvider>
    </AuthContextProvider>
  );
}

export default App;
