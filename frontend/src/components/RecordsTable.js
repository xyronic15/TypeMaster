import React from "react";
import { Table } from "react-bootstrap";

export default function RecordsTable({ user, records }) {
  return (
    <div>
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>Speed</th>
            <th>Accuracy</th>
            <th>Date</th>
          </tr>
        </thead>
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
      </Table> */}
      {user ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Speed</th>
              <th>Accuracy</th>
              <th>Date</th>
            </tr>
          </thead>
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
