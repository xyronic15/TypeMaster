import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../constants";
import AuthContext from "../context/AuthContext";

export default function Home(props) {
  let { user, authTokens, logout } = useContext(AuthContext);

  let [stats, setStats] = useState({});

  const getStats = async () => {
    if (authTokens) {
      console.log("Getting typer stats");
      let url = API_URL + "/get-stats";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + String(authTokens.access),
        },
      });

      let data = await response.json();

      if (response.status === 200) {
        setStats(data);
        console.log(data);
      } else {
        console.log(data);
        logout();
      }
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 68px)",
      }}
    >
      {/* TBC */}
      {stats ? (
        <div>
          <p>{stats.username}</p>
          <p>{stats.avg_speed}</p>
          <p>{stats.avg_accuracy}</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
