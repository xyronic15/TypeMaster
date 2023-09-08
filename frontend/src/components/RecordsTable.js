import React from "react";
import { Table } from "react-bootstrap";

// Records table used in Records page and High Scores page
const RecordsTable = ({ user, records }) => {
  return (
    <div>
      {user ? (
        <Table striped bordered hover>
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
                    <td>{record.created_at}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Typer</th>
              <th>Speed</th>
              <th>Accuracy</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.length >= 0
              ? records.map((record) => (
                  <tr>
                    <td>{record.typer}</td>
                    <td>{record.speed} wpm</td>
                    <td>{record.accuracy}%</td>
                    <td>{record.created_at}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default RecordsTable;