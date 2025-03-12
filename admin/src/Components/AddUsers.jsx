import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    userid: "",
    password: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!inputs.username.trim()) newErrors.username = "Full Name is required";
    if (!/\S+@\S+\.\S+/.test(inputs.email)) newErrors.email = "Invalid email format";
    if (!inputs.userid.trim()) newErrors.userid = "User ID is required";
    if (!inputs.password.trim()) newErrors.password = "Password is required";
    else if (inputs.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!inputs.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addHandler = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:4040/addoffical", inputs);
      setSnackbar({ open: true, message: response.data.message, severity: "success" });
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Server error. Try again later.",
        severity: "error",
      });
      if (error.response?.data?.field) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.response.data.field]: error.response.data.message,
        }));
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Add Official User</h2>

        {snackbar.open && (
          <p style={{ color: snackbar.severity === "success" ? "green" : "red", textAlign: "center" }}>
            {snackbar.message}
          </p>
        )}

        <form onSubmit={addHandler} style={styles.form}>
          {[
            { label: "Username", name: "username", type: "text", placeholder: "Enter Username" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter Email" },
            { label: "User ID", name: "userid", type: "text", placeholder: "Enter User ID" },
            { label: "Password", name: "password", type: "password", placeholder: "Enter Password" },
          ].map((field, index) => (
            <div key={index} style={styles.inputContainer}>
              <label htmlFor={field.name} style={styles.label}>{field.label}:</label>
              <input 
                type={field.type}
                id={field.name}
                name={field.name}
                value={inputs[field.name]}
                onChange={inputHandler}
                placeholder={field.placeholder}
                style={styles.input}
              />
              {errors[field.name] && <p style={styles.error}>{errors[field.name]}</p>}
            </div>
          ))}

          <div style={styles.inputContainer}>
            <label htmlFor="category" style={styles.label}>Category:</label>
            <select id="category" name="category" value={inputs.category} onChange={inputHandler} style={styles.input}>
              <option value="">Select a category</option>
              <option value="food">Food</option>
              <option value="medicine">Medicine</option>
            </select>
            {errors.category && <p style={styles.error}>{errors.category}</p>}
          </div>

          <button type="submit" style={styles.button}>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

// Styling with Proper Alignment
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom right, #2C3E50, #4CA1AF)",
  },
  formBox: {
    padding: "25px",
    maxWidth: "400px",
    width: "110%",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
   
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
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
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "4px",
  },
};

export default AddUsers;
