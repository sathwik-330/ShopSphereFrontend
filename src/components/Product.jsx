import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();

  const {
    data,
    addToCart,
    removeFromCart,
    cart,
    refreshData,
  } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
       const response = await axios.get(`/product/${id}`);

        setProduct(response.data);

        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
       const response = await axios.get(
  `/product/${id}/image`,
  {
    responseType: "blob",
  }
);

        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`/product/${id}`);

      removeFromCart(id);

      console.log("Product deleted successfully");

      alert("Product deleted successfully");

      refreshData();

      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return (
      <h2
        className="text-center"
        style={{ padding: "10rem" }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <>
      <div
        className="containers"
        style={{
          display: "flex",
        }}
      >
        {/* Product Image */}
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
          style={{
            width: "50%",
            height: "auto",
          }}
        />

        {/* Product Details */}
        <div
          className="right-column"
          style={{
            width: "50%",
          }}
        >
          <div className="product-description">

            {/* Category and Date */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "lighter",
                }}
              >
                {product.category}
              </span>

              <p
                className="release-date"
                style={{
                  marginBottom: "2rem",
                }}
              >
                <h6>
                  Listed:
                  <span>
                    <i>
                      {" "}
                      {new Date(
                        product.releaseDate
                      ).toLocaleDateString()}
                    </i>
                  </span>
                </h6>
              </p>
            </div>

            {/* Product Name */}
            <h1
              style={{
                fontSize: "2rem",
                marginBottom: "0.5rem",
                textTransform: "capitalize",
                letterSpacing: "1px",
              }}
            >
              {product.name}
            </h1>

            {/* Brand */}
            <i
              style={{
                marginBottom: "3rem",
              }}
            >
              {product.brand}
            </i>

            {/* Description */}
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                margin: "10px 0px 0px",
              }}
            >
              PRODUCT DESCRIPTION:
            </p>

            {/* IMPORTANT: Java has "desc", NOT "description" */}
            <p
              style={{
                marginBottom: "1rem",
              }}
            >
              {product.desc}
            </p>
          </div>

          {/* Price */}
          <div className="product-price">

            <span
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {"$" + product.price}
            </span>

            {/* Add To Cart */}
            <button
              className={`cart-btn ${
                !product.available
                  ? "disabled-btn"
                  : ""
              }`}
              onClick={handleAddToCart}

              // IMPORTANT: Java has "available"
              disabled={!product.available}

              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              {/* IMPORTANT: Java has "available" */}
              {product.available
                ? "Add to cart"
                : "Out of Stock"}
            </button>

            {/* Stock Quantity */}
            <h6
              style={{
                marginBottom: "1rem",
              }}
            >
              Stock Available:{" "}
              <i
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {product.stockQuantity}
              </i>
            </h6>
          </div>

          {/* Update and Delete */}
          <div
            className="update-button"
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleEditClick}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update
            </button>

            <button
              className="btn btn-primary"
              type="button"
              onClick={deleteProduct}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;