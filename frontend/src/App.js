// import logo from './logo.svg';
import "./App.css";
import { NavbarComp } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Test, Leaderboard, SignIn, SignUp, Dashboard } from "./pages";
import { PrivateRoute } from "./utils";
import { AuthProvider } from "./context/AuthContext";

// final app
function App() {
  return (
    <Router>
      <AuthProvider>
        <NavbarComp />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
