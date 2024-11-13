import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const generateId = () => uuidv4();

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    const id = generateId();
    console.log(id);
    const user = { id, name: username, email, password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    const url = "http://localhost:10000/signup";

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        console.log("user created successfully");
        setIsLogin(!isLogin);
      }
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = { email, password };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    const url = "http://localhost:10000/login";

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("jwt_token", data.token);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="signup-login-bg">
      <form
        className={`signup-bg form-el ${isLogin ? "hide" : ""}`}
        onSubmit={handleSignup}
      >
        <h2 style={{ fontSize: "20px", textAlign: "center", color: "#cb7fe0" }}>
          Sign Up
        </h2>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Username"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">password</label>
          <input
            type="Password"
            placeholder="Enter Username"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="button-container">
          <button
            type="submit"
            style={{
              height: "37px",
              width: "100px",
              backgroundColor: "#cb7fe0",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Sign Up
          </button>
          <a
            style={{ color: "#ffffff", cursor: "pointer" }}
            onClick={() => {
              setIsLogin(!isLogin);
              setUsername("");
              setEmail("");
              setPassword("");
            }}
          >
            Login?
          </a>
        </div>
      </form>
      <form
        className={`login-bg form-el ${isLogin ? "" : "hide"}`}
        onSubmit={handleLogin}
      >
        <h2 style={{ fontSize: "20px", textAlign: "center", color: "#cb7fe0" }}>
          Login
        </h2>
        <div className="input-container">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            placeholder="Enter Username"
            id="login-email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="login-password">password</label>
          <input
            type="Password"
            placeholder="Enter Username"
            id="login-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button
            type="submit"
            style={{
              height: "37px",
              width: "100px",
              backgroundColor: "#cb7fe0",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Login
          </button>
          <a
            style={{ color: "#ffffff", cursor: "pointer" }}
            onClick={() => {
              setIsLogin(!isLogin);
              setUsername("");
              setEmail("");
              setPassword("");
            }}
          >
            Sign Up?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
