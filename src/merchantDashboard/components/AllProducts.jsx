import React, { useState, useEffect } from "react";
import { API_URL } from "../helpers/ApiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const restaurantId = localStorage.getItem("restaurantId");

    try {
      const response = await fetch(
        `${API_URL}/product/${restaurantId}/products`
      );
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
      console.log(newProductsData);
    } catch (error) {
      console.log("failed to fetch products", error);
      alert("failed to fetch products");
    }
  };

  useEffect(() => {
    productsHandler();
    console.log("this is useEffect");
  }, []);

  const deleteProductById = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
      }
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted Successfully");
      }
    } catch (error) {
      console.error("failed to delete product");
      alert("failed to delete product");
    }
  };
  return (
    <div>
      {!products ? (
        <p>No Products Added</p>
      ) : (
        <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URL}/uploads/${item.image}`}
                      alt={item.productName}
                      width="150"
                      height="150"
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => deleteProductById(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
