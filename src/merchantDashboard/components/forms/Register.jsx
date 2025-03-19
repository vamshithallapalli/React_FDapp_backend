import React, { useState } from "react";
import { API_URL } from "../../helpers/ApiPath";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/merchant/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Merchant Registered Successfully!");
        setEmail("");
        setUsername("");
        setPassword("");
        showLoginHandler();
      }
    } catch (error) {
      console.error("registration failed", error);
      alert("Registration Failed");
    }
  };
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Merchant Registration</h3>

        <label>UserName</label>
        <br />
        <input
          type="text"
          placeholder="Enter Your Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <br />
        <input
          type="text"
          placeholder="Enter Your Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
