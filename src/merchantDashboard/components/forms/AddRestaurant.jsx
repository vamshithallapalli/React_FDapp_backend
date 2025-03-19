import React, { useState } from "react";
import { API_URL } from "../../helpers/ApiPath";

const AddRestaurant = () => {
  const [restaurantName, setRestaurant] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = async (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = async (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImage = async (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginToken = localStorage.getItem("loginToken");

      if (!loginToken) {
        console.error("user not authenticated");
      }
      const formData = new FormData();
      formData.append("restaurantName", restaurantName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("category", JSON.stringify(category));
      formData.append("region", JSON.stringify(region));

      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(`${API_URL}/restaurant/add-restaurant`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Restaurant Added Successfully");
        // Reset form
        setRestaurant("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      } else if (data.message === "Merchant can have only one Restaurant") {
        alert("Restaurant Exists, Only 1 restaurant can be added");
      } else {
        alert("Failed to add Restaurant");
      }
      console.log("this is restaurantId: ", data.restaurantId);

      const restaurantId = data.restaurantId;
      localStorage.setItem("restaurantId", restaurantId);
    } catch (error) {
      console.error("Failed to add Restaurant", error);
    }
  };
  return (
    <div className="restaurantSection">
      <form className="tableForm" onSubmit={handleSubmit}>
        <h2>Add Restaurant</h2>
        <label>Restaurant Name</label>
        <input
          type="text"
          name="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurant(e.target.value)}
        />
        <label>Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <label>Category</label>
        <div className="categoryOptions">
          <input
            type="checkbox"
            checked={category.includes("veg")}
            value="veg"
            onChange={handleCategoryChange}
          />
          <label>Veg</label>
          <input
            type="checkbox"
            checked={category.includes("non-veg")}
            value="non-veg"
            onChange={handleCategoryChange}
          />
          <label>Non-Veg</label>
        </div>

        <label>Region</label>
        <div className="regionOptions">
          <input
            type="checkbox"
            checked={region.includes("south-indian")}
            value="south-indian"
            onChange={handleRegionChange}
          />
          <label>South Indian</label>
          <input
            type="checkbox"
            checked={region.includes("north-indian")}
            value="north-indian"
            onChange={handleRegionChange}
          />
          <label>North Indian</label>
          <input
            type="checkbox"
            checked={region.includes("chinese")}
            value="chinese"
            onChange={handleRegionChange}
          />
          <label>Chinese</label>
        </div>
        <label>offer</label>
        <input
          type="text"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
        <label>Image</label>
        <input type="file" onChange={handleImage} />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
