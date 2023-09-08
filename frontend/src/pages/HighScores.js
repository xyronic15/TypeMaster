import React, { useEffect, useState } from "react";
import { getRecords } from "../utils";
import { Container } from "react-bootstrap";
import { RecordsTable } from "../components";

// Page that shows the highest scores of each player
const HighScores = (props) => {
  // records state value to hold the records of each typer
  let [records, setRecords] = useState({});

  useEffect(() => {
    getRecords().then((data) => setRecords(data));
    // console.log(Promise.resolve(recordData));
    // setRecords(recordData);
  }, []);

  // return a table that formats the "records" value
  return (
    <Container>
      <h1>Highest Scores</h1>
      <RecordsTable records={records} />
    </Container>
  );
}

export default HighScores;