const express = require('express');
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');
const volunteerRouter = require('./routes/volRoutes.js');  // Import the volunteerRouter
const orgRouter = require('./routes/orgRoutes.js');  // Import the organization router (similar to volunteerRouter)

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/user', userRoutes);
app.use('/volunteers', volunteerRouter);
app.use('/organizations', orgRouter);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
