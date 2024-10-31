// src/app.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve index.html for all routes (except /api)
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API routes
app.use('/api', require('./routes/api.routes'));