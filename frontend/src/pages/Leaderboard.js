import React, { useEffect, useState } from "react";
import { getRecords } from "../utils";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Container } from "react-bootstrap";
import { RecordsTable } from "../components";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
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
    </motion.div>
  );
}

export default Leaderboard;