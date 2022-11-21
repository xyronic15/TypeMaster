import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Card } from "react-bootstrap";

export default function Test(props) {
  let { user, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  let [quote, setQuote] = useState({});
  let [typed, setTyped] = useState("");

  const getQuote = async () => {
    console.log("Getting Quote");
    let url = API_URL + "/random-quote";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      setQuote(data);
      console.log(data);
    } else {
      console.log(data);
      navigate("/");
    }
  };

  const handleInput = (e) => {
    const input = e.target.value;
    setTyped(input);
  };

  const compareText = (input) => {};

  useEffect(() => {
    if (Object.keys(quote).length === 0) {
      getQuote();
    }
  }, [quote]);

  return (
    <Container>
      {quote.text}
      <br />
      <input type="text" onChange={handleInput}></input>
      <br />
      {typed}
    </Container>
  );
}
