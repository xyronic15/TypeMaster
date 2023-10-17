import { createContext, useState, useEffect } from "react";
import { API_URL } from "../constants";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// exported context needed for JWT authentication
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Tokens saved into cache needed for access, authentication and refreshing
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  // Decoded JWT token containing username information
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // function to login user given login event
  let loginUser = async (e) => {
    e.preventDefault();

    // use token url to fetch tokens using email and password
    let url = API_URL + "/token/";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();

    // Based on results either save tokens and user or send bad alert
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      // TBC change message based on return result
      alert("Bad Request: Login Failed");
    }
  };

  // add user function
  let addUser = async (values) => {
    // use API URL to make a new user
    let url = API_URL + "/create-typer";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        username: values.username,
      }),
    });

    let data = await response.json();

    // if successful then login and gain a token
    if (response.status === 201) {
      let url = API_URL + "/token/";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      let data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");
      } else {
        alert("Bad Request: Login Failed");
      }
    } else {
      alert("Bad Request: Registration Failed");
    }
  };

  // function uses the refresh url to get a new access token
  let updateToken = async () => {
    console.log("Updated Token");
    let url = API_URL + "/token/refresh/";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    }).catch((e) => navigate("/not-available"));

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logout();
    }

    if (loading) {
      setLoading(false);
    }
  };

  // function to logout user by removing access and refresh tokens
  let logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    // navigate("/");
  };

  // context data that can be used in other components
  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logout: logout,
    addUser: addUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let refreshTime = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, refreshTime);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
