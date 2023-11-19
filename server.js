import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;
const JSON_SERVER_URL = "http://localhost:8000";

app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

app.get("/api/v1/users", async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/users`);
    const users = response.data;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/users/${userId}`);
    const user = response.data;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/users", async (req, res) => {
  const newUser = req.body;
  try {
    // const response = await axios.post(`${JSON_SERVER_URL}/users`, newUser);
    // const addedUser = response.data;
    // res.status(201).json(addedUser);

    const response = await axios.post(`${JSON_SERVER_URL}/users`, newUser);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
