import React, { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Container } from "react-bootstrap";
import { RecordsTable } from "../components";

// Page that shows the highest scores of each player
export default function HighScores(props) {
  // records state value to hold the records of each typer
  let [records, setRecords] = useState({});

  // function to use get-all-records url to get the high scores and set it
  const getRecords = async () => {
    console.log("Getting typer stats");
    let url = API_URL + "/get-all-records";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      setRecords(data);
      console.log(data);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  // return a table that formats te "records" value
  return (
    <Container>
      <h1>Highest Scores</h1>
      <RecordsTable records={records} />
    </Container>
  );
}
