import React, { useContext, useEffect, useState } from "react";
import { getRecords, getStats } from "../utils";
import AuthContext from "../context/AuthContext";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { RecordsTable } from "../components";
import { Col, Container, Row, Card } from "react-bootstrap";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  let [records, setRecords] = useState([]);

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
      <GamesChart records={records.slice(0, Math.min(10, records.length)).reverse()} />
      <h2>Average Stats Over The Last 10 Games</h2>
      <CurrentStats stats={stats} />
      <h2>Game History</h2>
      {records.length > 0 ? <RecordsTable user={user} records={records} /> :
        <Card className="mt-4 mb-5">
          <Card.Body>
            <Card.Title className="text-center">
              <h3>No Game History</h3>
            </Card.Title>
          </Card.Body>
        </Card>
      }
    </Container>
  );
}

// functional component to set up the current stats
function CurrentStats({ stats }) {
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

// individual card component for a particular stat
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

// line chart component for past ten games
const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Typing Speed and Accuracy Over the Last 10 Games',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date (YYYY-MM-DD)'
      }
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      title: {
        display: true,
        text: 'Typing Speed (WPM)'
      }
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: 'Typing Accuracy (%)'
      }
    },
  },
}

function GamesChart({ records }) {
  const data = {
    labels: records.map((rec) => rec.created_at.slice(0, 10)),
    datasets: [
      {
        label: 'Speed (WPM)',
        data: records.map((rec) => rec.speed),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Accuracy (%)',
        data: records.map((rec) => rec.accuracy),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  return (
    <>
      {
        records.length > 0 ?
          <Card className="mb-5">
            <Card.Body>
              <Line options={chartOptions} data={data} />
            </Card.Body>
          </Card> :
          <Card className="mt-4 mb-5">
            <Card.Body>
              <Card.Title className="text-center">
                <h3>No Game History</h3>
              </Card.Title>
            </Card.Body>
          </Card>
      }
    </>
  );
}