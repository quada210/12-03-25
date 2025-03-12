import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Addfood = () => {
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevData) => ({ ...prevData, [name]: value }));
  };

  const addHandler = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const result = await axios.post("http://localhost:4040/addfood", inputs);
      alert(result.data);
      if (result.data === "success") {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Add Food</h2>
        <form onSubmit={addHandler} style={styles.form}>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={inputHandler}
            placeholder="Food Name"
            style={styles.input}
            required
          />
          <input
            type="number"
            name="price"
            value={inputs.price}
            onChange={inputHandler}
            placeholder="Price"
            style={styles.input}
            required
          />
          <input
            type="text"
            name="image"
            value={inputs.image}
            onChange={inputHandler}
            placeholder="Image Link"
            style={styles.input}
          />
          <select
            name="category"
            value={inputs.category}
            onChange={inputHandler}
            style={styles.input}
            required
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="Dinner">Dinner</option>
            <option value="Specials">Specials</option>
          </select>
          <button type="submit" style={styles.button}>
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

// Styling for better readability
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)",
  },
  formBox: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    width: "380px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "opacity 0.3s",
  },
  buttonHover: {
    opacity: "0.8",
  },
};

export default Addfood;
