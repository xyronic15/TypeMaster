import React, { Component } from "react";

export default class HighScores extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 68px)",
        }}
      >
        HIGH SCORES
      </div>
    );
  }
}
