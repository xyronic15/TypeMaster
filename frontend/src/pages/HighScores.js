import React, { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Container } from "react-bootstrap";
import { RecordsTable } from "../components";

export default function HighScores(props) {
  let [records, setRecords] = useState({});

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

  return (
    <Container>
      <h1>Highest Scores</h1>
      <RecordsTable records={records} />
    </Container>
  );
}
