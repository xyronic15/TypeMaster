// import logo from './logo.svg';
import "./App.css";
import { NavbarComp } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { API_URL } from "./constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Test, HighScores, SignIn, SignUp, Records } from "./pages";
import { PrivateRoute } from "./utils";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    // const [curr_typer, setTyper] = useState("");

    // useEffect(() => {
    //   getCurrTyper();
    // }, []);

    // let getCurrTyper = async () => {
    //   let url = API_URL + '/get-typer'
    //   let res = await fetch(url)
    //   let data = await res.json()
    //   console.log(data)
    //   setTyper(data.current_typer)
    // };
    <Router>
      <AuthProvider>
        <NavbarComp />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/high-scores" element={<HighScores />}></Route>
          <Route
            path="/records"
            element={
              <PrivateRoute>
                <Records />
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
