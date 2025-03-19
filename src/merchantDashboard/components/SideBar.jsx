import React from "react";

const SideBar = ({
  showRestaurantHandler,
  showProductHandler,
  showAllProductsHandler,
  showAddRestaurant,
}) => {
  return (
    <div className="sideBarSection">
      <ul>
        {showAddRestaurant ? 
          <li onClick={showRestaurantHandler}>Add Restaurant</li> : ""}
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  );
};

export default SideBar;
