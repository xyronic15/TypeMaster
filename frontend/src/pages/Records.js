import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../constants";
import AuthContext from "../context/AuthContext";
import { RecordsTable } from "../components";
import { Col, Container, Row, Card } from "react-bootstrap";

export default function Records(props) {
  let { user, authTokens, logout } = useContext(AuthContext);

  let [stats, setStats] = useState({});
  let [records, setRecords] = useState({});

  const getStats = async () => {
    if (authTokens) {
      console.log("Getting typer stats");
      let url = API_URL + "/get-stats";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });

      let data = await response.json();

      if (response.status === 200) {
        setStats(data);
        //   console.log(data);
      } else {
        console.log(data);
        logout();
      }
    }
  };

  const getRecords = async () => {
    if (authTokens) {
      console.log("Getting typer stats");
      let url = API_URL + "/get-all-records";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });

      let data = await response.json();

      if (response.status === 200) {
        setRecords(data);
        console.log(data);
      } else {
        console.log(data);
        logout();
      }
    }
  };

  useEffect(() => {
    getStats();
    getRecords();
  }, []);

  return (
    <Container>
      <h1>Your Records</h1>
      <h2>Average Stats Over The Last 10 Games</h2>
      <CurrentStats stats={stats} />
      <h2>Game History</h2>
      <RecordsTable user={user} records={records} />
    </Container>
  );
}

function CurrentStats({ stats }) {
  return (
    <Row>
      <Col>
        <CardStats title={"Average Speed"} stat={stats.avg_speed + " wpm"} />
      </Col>
      <Col>
        <CardStats title={"Average Accuracy"} stat={stats.avg_speed + "%"} />
      </Col>
    </Row>
  );
}

// TBC
function CardStats({ title, stat }) {
  return (
    <Card className="m-2">
      <Card.Body>
        <div>
          <Row>
            <Card.Title>
              <h3>{title}</h3>
            </Card.Title>
            <br />
            <span>{stat}</span>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
