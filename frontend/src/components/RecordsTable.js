import React from "react";
import { Card } from "react-bootstrap";
import { Table } from "react-bootstrap";

// Records table used in Records page and High Scores page
const RecordsTable = ({ user, records }) => {
  return (
    <Card className="p-4 pb-1 mt-4 mb-5">
      {user ? (
        <Table borderless hover>
          <thead>
            <tr>
              <th>Speed</th>
              <th>Accuracy</th>
              <th>Date</th>
            </tr>
          </thead>

          {/* 
          - Show highest scores of all players in high scores page
          - Show all the records of a single user in records Page
          */}
          <tbody>
            {records.length >= 0
              ? records.map((record) => (
                <tr>
                  <td>{record.speed} wpm</td>
                  <td>{record.accuracy}%</td>
                  <td>{record.created_at.slice(0, 10)}</td>
                </tr>
              ))
              : null}
          </tbody>
        </Table>
      ) : (
        <Table borderless hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Typer</th>
              <th>Speed</th>
              <th>Accuracy</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.length >= 0
              ? records.map((record, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{record.typer}</td>
                  <td>{record.speed} wpm</td>
                  <td>{record.accuracy}%</td>
                  <td>{record.created_at.slice(0, 10)}</td>
                </tr>
              ))
              : null}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default RecordsTable;