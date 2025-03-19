import React from "react";

const NavBar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogout,
  logoutHandler,
}) => {
  const restaurantName = localStorage.getItem("restaurantName");
  return (
    <div className="navSection">
      <div className="company">Merchant Dashboard</div>
      <div className="restaurantName">
        <h4>RestaurantName : {restaurantName}</h4>
      </div>
      <div className="userAuth">
        {!showLogout ? (
          <>
            <span onClick={showLoginHandler}>Login / </span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logoutHandler}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default NavBar;
