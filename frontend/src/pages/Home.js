import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Home(props) {
  let { user } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 68px)",
      }}
    >
      {user && <p>hello {user.username}</p>}
    </div>
  );
}
