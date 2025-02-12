// A simple Express server that calls the backend API and displays its message.
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Read the backend URL from the environment variable set via a ConfigMap.
// Fallback to a default if not provided.
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend-service:5000';

app.get('/', async (req, res) => {
  try {
    // Make a GET request to the backend service.
    const response = await axios.get(BACKEND_URL);
    const message = response.data.message;
    res.send(`<h1>Frontend Application</h1><p>Backend says: ${message}</p>`);
  } catch (error) {
    console.error("Error calling backend:", error);
    res.status(500).send("Error communicating with backend");
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server listening on port ${PORT}`);
});
