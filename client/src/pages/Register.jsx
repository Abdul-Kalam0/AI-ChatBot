import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { loading, register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // loading state
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>

        <br />

        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <label>Email</label>

        <br />

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <label>Password</label>

        <br />

        <div>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
