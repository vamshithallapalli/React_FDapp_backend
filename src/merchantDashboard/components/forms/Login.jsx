import React, { useState } from "react";
import { API_URL } from "../../helpers/ApiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/merchant/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login Success");
        localStorage.setItem("loginToken", data.token);
        setEmail("");
        setPassword("");
        showWelcomeHandler();
      }
      const merchantId = data.merchantId;
      const merchantResponse = await fetch(
        `${API_URL}/merchant/single-merchant/${merchantId}`
      );
      const merchantData = await merchantResponse.json();
      if (merchantResponse.ok) {
        const merchantrestaurantId = merchantData.merchantrestaurantId;
        const merchantrestaurantName =
          merchantData.merchant.restaurant[0].restaurantName;
        localStorage.setItem("restaurantId", merchantrestaurantId);
        localStorage.setItem("restaurantName", merchantrestaurantName);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Merchant Login</h3>

        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
