import React, { useEffect, useState } from "react";
import { getRecords } from "../utils";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Container } from "react-bootstrap";
import { RecordsTable } from "../components";

// Page that shows the highest scores of each player
const Leaderboard = (props) => {
  // records state value to hold the records of each typer
  let [records, setRecords] = useState({});

  // typewriter text
  const [text] = useTypewriter({
    words: ['Leaderboard'],
    typeSpeed: 120,
  })

  useEffect(() => {
    getRecords().then((data) => setRecords(data));
    // console.log(Promise.resolve(recordData));
    // setRecords(recordData);
  }, []);

  // return a table that formats the "records" value
  return (
    <Container className="mt-5">
      <h2>
        <span>
          {text}
        </span>
        <span>
          <Cursor />
        </span>
      </h2>
      <RecordsTable records={records} />
    </Container>
  );
}

export default Leaderboard;