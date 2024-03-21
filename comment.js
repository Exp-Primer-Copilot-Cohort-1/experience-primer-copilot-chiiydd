// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Parse incoming request with JSON
app.use(express.json());

// Create a variable to store comments
const comments = [];

// Create a route to get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Create a route to post comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});



