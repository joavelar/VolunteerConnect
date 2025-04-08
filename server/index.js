const express = require('express');
const cors = require('cors');

// const userRoutes = require('./routes/userRoutes');
const volRouter = require('./routes/volRoutes.js');
const orgRouter = require('./routes/orgRoutes.js');  
const postRouter = require('./routes/postRoutes.js')
const commentRouter = require('./routes/commentRoutes.js')
const savedPostRouter = require('./routes/savedPostRoutes.js')

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/volunteers', volRouter);
app.use('/organizations', orgRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter)
app.use('/savedPosts', savedPostRouter);


app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
