/*
file contains api calls that are used in multiple components
*/

import { API_URL } from "../constants";

// function to use get-all-records url to get the high scores or the records of a single user
const getRecords = async (accessToken) => {
  console.log("Getting typer stats");
  let url = API_URL + "/get-all-records";

  let response;

  if (accessToken) {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      },
    });
  } else {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let data = await response.json();

  if (response.status === 200) {
    // console.log(data);
    return data;
  } else {
    console.log(data);
  }
};

//function to use API URL to get the current stats of the user
const getStats = async (accessToken) => {
  if (accessToken) {
    console.log("Getting typer stats");
    let url = API_URL + "/get-stats";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      },
    });

    // let { avg_speed, avg_accuracy } = await response.json();
    let data = await response.json();

    if (response.status === 200) {
      // data = { speed: avg_speed, accuracy: avg_accuracy };
      // console.log(data);
      return data;
    } else {
      console.log(data);
      // logout();
    }
  }
};

export { getRecords, getStats };
