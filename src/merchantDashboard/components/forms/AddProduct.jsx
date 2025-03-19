import React, { useState } from "react";
import { API_URL } from "../../helpers/ApiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleCategoryChange = async (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = async (event) => {
    const value = event.target.value === "true";
    setBestSeller(value);
  };

  const handleImage = async (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const restaurantId = localStorage.getItem("restaurantId");

      if (!loginToken || !restaurantId) {
        console.error("User not authenticated");
        alert("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("category", JSON.stringify(category));
      formData.append("bestSeller", JSON.stringify(bestSeller));
      formData.append("image", image);
      formData.append("description", description);

      const response = await fetch(
        `${API_URL}/product/add-product/${restaurantId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        alert("Failed to add Product");
        return;
      }

      const data = await response.json();
      alert("Product Added Successfully");

      // Reset form fields
      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller(false);
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to add Product. Please check your network connection.");
    }
  };

  return (
    <div className="productSection">
      <form className="productForm" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>

        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
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

        <label>Bestseller</label>
        <div className="bestsellerOptions">
          <input
            type="radio"
            value={true}
            checked={bestSeller === true}
            onChange={handleBestSeller}
          />
          <label>Yes</label>
          <input
            type="radio"
            value={false}
            checked={bestSeller === false}
            onChange={handleBestSeller}
          />
          <label>No</label>
        </div>

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
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

export default AddProduct;
