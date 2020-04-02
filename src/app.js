const express = require('express');
const app = express();
const port = 3000;

// Routers
const broadcastRouter = require('./routes/broadcast-router');

// Create audio folder
const fs = require('fs');
if (!fs.existsSync('./audio')) {
    fs.mkdirSync('./audio');
}

// Apply static files
app.use(express.static('src/public'));

// All routes
app.use('/broadcast', broadcastRouter);

// Start server
app.listen(port, () => console.log(`Listening on port ${port}!`));