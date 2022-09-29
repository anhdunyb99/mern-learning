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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          render={(props) => <Auth {...props} authRoute="login" />}
        />
        <Route
          path="/register"
          render={(props) => <Auth {...props} authRoute="register" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
