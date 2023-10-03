import React, { useContext, useEffect, useState } from "react";
import { getRecords, getStats } from "../utils";
import AuthContext from "../context/AuthContext";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { RecordsTable } from "../components";
import { Col, Container, Row, Card } from "react-bootstrap";

// Records page for logged in user to see their stats
export default function Dashboard(props) {
  // Context data
  let { user, authTokens } = useContext(AuthContext);

  // typewriter text
  const [text] = useTypewriter({
    words: ['Dashboard'],
    typeSpeed: 120,
  })

  // states for current stats and records
  let [stats, setStats] = useState({});
  let [records, setRecords] = useState({});

  useEffect(() => {
    getStats(authTokens.access).then((data) => setStats(data));
    getRecords(authTokens.access).then((data) => setRecords(data));
  }, []);

  // return the formatted current stats and records table
  return (
    <Container className="mt-5">
      <h2 className="mb-4">
        <span>
          {text}
        </span>
        <span>
          <Cursor />
        </span>
      </h2>
      <h2>Average Stats Over The Last 10 Games</h2>
      <CurrentStats stats={stats} />
      <h2>Game History</h2>
      <RecordsTable user={user} records={records} />
    </Container>
  );
}

// functional component to set up the current stats
function CurrentStats({ stats }) {
  console.log(stats);
  return (
    <Row className="mb-5">
      <Col>
        <CardStats title={"Average Speed"} stat={parseFloat(stats.avg_speed).toFixed(1) + " wpm"} />
      </Col>
      <Col>
        <CardStats title={"Average Accuracy"} stat={parseFloat(stats.avg_accuracy).toFixed(1) + "%"} />
      </Col>
    </Row>
  );
}

// individual card component fo r a particular stat
// TBC
function CardStats({ title, stat }) {
  return (
    <Card className="m-2 h-100">
      <Card.Body>
        <div>
          <Row>
            <Card.Title>
              <h3>{title}</h3>
            </Card.Title>
            <br />
            <p>{stat}</p>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
