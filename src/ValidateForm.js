import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ValidateForm.css";

const ValidateForm = () => {
  const navigate = useNavigate();
  const [fName, setfName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    
    const UserDetails = [
      { id: 1, fName: "Jegatheesh", age: 20, Email: "jegatheesh@gmail.com", Password: "Jegatheesh123", phone: 1234567890 },
      { id: 2, fName: "Ramesh", age: 20, Email: "ramesh@gmail.com", Password: "Ramesh123", phone: 2345678901 },
      { id: 3, fName: "Nantha Kumar", age: 20, Email: "nanthu@gmail.com", Password: "Nanthu123", phone: 3456789012 },
      { id: 4, fName: "Kanjana", age: 20, Email: "kanjana@gmail.com", Password: "Kanjana123", phone: 45678901234 },
      { id: 5, fName: "Vishali", age: 20, Email: "vishali@gmail.com", Password: "Vishali123", phone: 6789012345 },
    ];
    sessionStorage.setItem("UserDetails", JSON.stringify(UserDetails));
  }, []);

  // Validation Functions
  const isValidEmail = (Email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Email);
  };

  const isValidPassword = (Password) => {
    return Password.length >= 8;
  };

  const isUserValid = (Email, Password) => {
    const storage = JSON.parse(sessionStorage.getItem("UserDetails")) || [];
    return storage.some(user => user.Email === Email && user.Password === Password);
  };

  const validate = () => {
    let newErrors = {};

    if (!Email) {
      newErrors.Email = "Email is Required";
    } else if (!isValidEmail(Email)) {
      newErrors.Email = "Invalid Email Format";
    }

    if (!Password) {
      newErrors.Password = "Password is Required";
    } else if (!isValidPassword(Password)) {
      newErrors.Password = "Password must contain at least 8 characters";
    }

    if (!isUserValid(Email, Password)) {
      newErrors.InvalidPerson = "Invalid person.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      sessionStorage.setItem("user", JSON.stringify({ fName, Email, Password }));
      alert("Form submitted successfully!");
      navigate('/next');
    } else {
      console.log('Errors:', errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fName") {
      setfName(value);
    } else if (name === "Email") {
      setEmail(value);
    } else if (name === "Password") {
      setPassword(value);
    }
  };

  return (
    <div className="container mt-5">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Sign-Up</h1>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            placeholder="Enter Your Email Here"
            value={Email}
            onChange={handleChange}
          />
          {errors.Email && <div className="error">{errors.Email}</div>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            placeholder="Enter Your Password"
            value={Password}
            onChange={handleChange}
          />
          {errors.Password && <div className="error">{errors.Password}</div>}
        </div>

        {errors.InvalidPerson && <div className="error">{errors.InvalidPerson}</div>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ValidateForm;
