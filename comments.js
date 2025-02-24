// Create web server
// Server listens on port 3000
// Server serves static files from public folder
// Server handles GET and POST requests on /comments
// GET returns a list of comments
// POST adds a new comment to the list

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Serve static files from public folder
app.use(express.static('public'));

// Parse JSON bodies
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
    // Read comments from file
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments');
        }

        // Parse JSON data
        let comments = JSON.parse(data);

        // Send comments as JSON response
        res.json(comments);
    });
});

// POST /comments
app.post('/comments', (req, res) => {
    // Read comments from file
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments');
        }

        // Parse JSON data
        let comments = JSON.parse(data);

        // Add new comment
        comments.push(req.body);

        // Write comments to file
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing comments');
            }

            // Send success response
            res.send('Comment added');
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});