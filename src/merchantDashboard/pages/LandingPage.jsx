import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddRestaurant from "../components/forms/AddRestaurant";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRestaurant, setShowRestaurant] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showAddRestaurant, setShowAddRestaurant] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogout(true);
    }
  }, []);

  useEffect(() => {
    const restaurantName = localStorage.getItem("restaurantName");
    if (restaurantName) {
      setShowAddRestaurant(false);
    }
  }, []);

  const logoutHandler = () => {
    confirm("are you sure want to logout?");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("restaurantId");
    localStorage.removeItem("restaurantName");
    setShowLogout(false);
    setShowAddRestaurant(true);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowRestaurant(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowRestaurant(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRestaurantHandler = () => {
    if (showLogout) {
      setShowRestaurant(true);
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if (showLogout) {
      setShowRestaurant(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    setShowRestaurant(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    if (showLogout) {
      setShowRestaurant(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
    } else {
      alert("Please Login");
      showLogin(true);
    }
  };
  return (
    <>
      <section className="landingSection">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogout={showLogout}
          logoutHandler={logoutHandler}
        />
        <div className="collectionSection">
          <SideBar
            showRestaurantHandler={showRestaurantHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showAddRestaurant={showAddRestaurant}
          />
          {showRestaurant && showLogout && <AddRestaurant />}
          {showProduct && showLogout && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogout && <AllProducts />}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {/* <Login /> */}
          {/* <Register /> */}
          {/* <AddRestaurant /> */}
          {/* <AddProduct /> */}
          {/* <AllProducts /> */}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
