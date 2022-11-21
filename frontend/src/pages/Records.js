import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../constants";
import AuthContext from "../context/AuthContext";
import { RecordsTable } from "../components";
import { Col, Container, Row, Card } from "react-bootstrap";

// Records page for logged in user to see their stats
export default function Records(props) {
  // Context data
  let { user, authTokens, logout } = useContext(AuthContext);

  // states for current stats and records
  let [stats, setStats] = useState({});
  let [records, setRecords] = useState({});

  //function to use API URL to get the current stats of the user
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

  // function to get the records of an individual user
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

  // return the formatted current stats and records table
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

// functional component to set up the current stats
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

// individual card component fo r a particular stat
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
