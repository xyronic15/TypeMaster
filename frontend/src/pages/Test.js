import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";

// Test page where users test their typing speed
export default function Test(props) {
  // context data
  let { user, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  // state val for retrieved data from API URL
  let [quote, setQuote] = useState({});
  let [quoteLength, setQuoteLength] = useState();

  // state val for div after quote processed
  let [quoteArr, setQuoteArr] = useState();

  // inputted state value from user input
  let [typed, setTyped] = useState("");

  // state value for test -> intial value value is before
  let [testState, setTestState] = useState("before");

  // state values for recording time taken
  let [times, setTimes] = useState({});

  // state values for the final results fo the test
  let [result, setResult] = useState({});

  // implement immediate change in quoteArr state
  const changeQuoteArr = (arr) => {
    setQuoteArr((current) => arr);
  };

  // function handles what to do when button is clicked
  const buttonClick = () => {
    if (testState === "before") {
      setTestState("during");
    }
    if (testState === "during") {
      setTestState("after");
    }
    if (testState === "after") {
      resetTest();
    }
    console.log(testState);
  };

  // function resets the test  page's state values
  const resetTest = () => {
    getQuote();
    setTestState("before");
  };

  // function uses API to retrieve a new quote
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
      setQuoteLength(data.text.length);
      console.log(data);
      extractQuoteArr(data.text);
    } else {
      console.log(data);
      navigate("/");
    }
  };

  // function uses quote value to make a div and set it
  const extractQuoteArr = (text) => {
    let arr = text.split("").map((value) => {
      return <span>{value}</span>;
    });

    // setQuoteArr(arr);
    // console.log(arr);
    changeQuoteArr(arr);
  };

  // called when user input changes
  const handleInput = (e) => {
    const input = e.target.value;
    setTyped(input);
    compareText(input, false);
  };

  // function to compare the quote to the inputted text
  const compareText = (input, done) => {
    // separetes text and input into chars and then compares them one index at a time
    // update the quoteArr
    // if done is true then calculate % of correct text and return

    let mistakeCount = 0;

    let arr = quote.text.split("").map((char, ind) => {
      // check if input and char matches
      if (char === input[ind]) {
        return <span className="text-success">{char}</span>;
      } else if (input[ind] == null) {
        return <span>{char}</span>;
      } else {
        mistakeCount++;
        return <span className="text-danger">{char}</span>;
      }
    });

    changeQuoteArr(arr);

    console.log(mistakeCount);

    if (done) {
      return mistakeCount;
    }
  };

  useEffect(() => {
    if (Object.keys(quote).length === 0) {
      getQuote();
    }
  }, [quote]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <QuoteDiv quote={quote} quoteArr={quoteArr} />
          <Row>
            <InputGroup>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                onChange={handleInput}
                maxLength={quoteLength}
              />
            </InputGroup>
          </Row>
          {/* <input type="text" onChange={handleInput}></input> */}
          {/* {typed} */}
          {/* {testButton(testState)} */}
          <TestButton state={testState} buttonClick={buttonClick} />
        </Card.Body>
      </Card>
      <ResultsCard speed={10} time={10} accuracy={20} />
    </Container>
  );
}

function QuoteDiv({ quote, quoteArr }) {
  return (
    <div>
      <Row>
        <Col>Source: {quote.source}</Col>
        <Col>Speaker: {quote.quotee}</Col>
        <Col>Tags: {quote.tags}</Col>
      </Row>
      <Row>
        <div>{quoteArr}</div>
      </Row>
    </div>
  );
}

function TestButton({ state, buttonClick }) {
  switch (state) {
    case "before":
      return (
        <Button variant="primary" onClick={buttonClick}>
          Start
        </Button>
      );
    case "during":
      return <Button onClick={buttonClick}>Testing...</Button>;
    case "after":
      return (
        <Button variant="primary" onClick={buttonClick}>
          Play Again
        </Button>
      );
  }
}

function ResultsCard({ speed, time, accuracy }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="d-flex justify-content-md-center">
            Speed: {speed} wpm
          </Col>
          <Col className="d-flex justify-content-md-center">
            Time taken: {time}
          </Col>
          <Col className="d-flex justify-content-md-center">
            Accuracy: {accuracy}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
