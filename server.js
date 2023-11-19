import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;
const JSON_SERVER_URL = "http://localhost:8000";
const API_VERSION = "/api/v1";

app.use(express.json());
app.use(cors());

// Get all users
app.get(`${API_VERSION}/users`, async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/users`);
    const users = response.data;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a specific user by ID
app.get(`${API_VERSION}/users/:id`, async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/users/${userId}`);
    const user = response.data;
    if (!user || Object.keys(user).length === 0) {
      res.status(404).json({ message: "No user found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new user
app.post(`${API_VERSION}/users`, async (req, res) => {
  const newUser = req.body;
  try {
    const response = await axios.post(`${JSON_SERVER_URL}/users`, newUser);
    const addedUser = response.data;
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
