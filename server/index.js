const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
