import React, { useContext, useEffect, useState, useRef } from "react";
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

  // state values for user input
  let [typed, setTyped] = useState("");
  let [disabled, setDisabled] = useState(true);

  // state value for test -> initial value value is before
  let [testState, setTestState] = useState("before");

  // state values for recording time taken
  let [times, setTimes] = useState({
    start: new Date().getTime(),
    end: new Date().getTime(),
  });

  // state values for the final results for the test
  let [result, setResult] = useState(null);

  // text input ref
  const textInput = useRef(null);

  // implement immediate change in quoteArr state
  const changeQuoteArr = (arr) => {
    setQuoteArr((current) => arr);
  };

  // function to call when starting the test
  const startTest = () => {
    setDisabled((current) => false);
    setTimes({ ...times, start: new Date().getTime() });
    textInput.current.focus();
    setTestState((current) => "during");
  };

  // function to call when the test has just finished
  const finishedTest = (mistakeCount) => {
    let endTime = new Date().getTime();
    setTimes({ ...times, end: endTime });
    console.log(times);

    // calculate the stats time -> wpm -> accuracy
    let timeInMins = (endTime - times.start) / (1000 * 60);
    let minutesFloored = Math.floor(timeInMins);
    let secondsRounded = Math.round((timeInMins - minutesFloored) * 60);

    let numWords = quote.text.split(" ").length;
    let wpm = (numWords / timeInMins).toFixed(1);

    let numChars = quote.text.split("").length;
    let accuracy = (((numChars - mistakeCount) / numChars) * 100).toFixed(1);

    let newRes = {
      speed: wpm,
      mins: minutesFloored,
      secs: secondsRounded,
      accuracy: accuracy,
    };

    setResult({ ...result, ...newRes });

    setTestState((current) => "after");
  };

  // function resets the test page's state values
  const resetTest = () => {
    textInput.current.value = "";
    setTestState((current) => "before");
    getQuote();
  };

  // function handles what to do when button is clicked
  const buttonClick = () => {
    if (testState === "before") {
      startTest();
    }
    // if (testState === "during") {
    //   setTestState("after");
    // }
    if (testState === "after") {
      resetTest();
    }
    console.log(testState);
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
  const compareText = (input) => {
    // separetes text and input into chars and then compares them one index at a time
    // update the quoteArr

    let mistakeCount = 0;

    let arr = quote.text.split("").map((char, ind) => {
      // check if input and char matches
      if (char === input[ind]) {
        if (ind + 1 === quote.text.length) {
          finishedTest(mistakeCount);
        }
        return (
          <span className="text-success">
            <b>{char}</b>
          </span>
        );
      } else if (input[ind] == null) {
        return <span>{char}</span>;
      } else {
        mistakeCount++;
        return (
          <span className="text-danger">
            <b>{char}</b>
          </span>
        );
      }
    });

    changeQuoteArr(arr);

    console.log(mistakeCount);
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
          <hr />
          <Row>
            <InputGroup>
              <Form.Control
                ref={textInput}
                as="textarea"
                aria-label="With textarea"
                onChange={testState === "after" ? null : handleInput}
                placeholder="Type here when you start..."
                maxLength={quoteLength}
                // disabled={disabled}
              />
            </InputGroup>
          </Row>

          {/* <input type="text" onChange={handleInput}></input> */}
          {/* {typed} */}
          {/* {testButton(testState)} */}
          <hr />
          <TestButton state={testState} buttonClick={buttonClick} />
        </Card.Body>
      </Card>
      {result ? (
        <ResultsCard
          speed={result.speed}
          mins={result.mins}
          secs={result.secs}
          accuracy={result.accuracy}
        />
      ) : null}
      {/* // <ResultsCard speed={10} time={10} accuracy={20} /> */}
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
      <hr />
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
      return <Button disabled>Typing...</Button>;
    case "after":
      return (
        <Button variant="primary" onClick={buttonClick}>
          Play Again
        </Button>
      );
  }
}

function ResultsCard({ speed, mins, secs, accuracy }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="d-flex justify-content-md-center">
            Speed: {speed} wpm
          </Col>
          <Col className="d-flex justify-content-md-center">
            Time taken: {mins}:{secs}
          </Col>
          <Col className="d-flex justify-content-md-center">
            Accuracy: {accuracy}%
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
