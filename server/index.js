const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000; // You can change this to any port you prefer

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
