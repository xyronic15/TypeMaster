import React, { Component } from "react";
// import { TESTTXT } from "../constants";

export default class Home extends Component {
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
        {this.props.curr_typer}
      </div>
    );
  }
}
