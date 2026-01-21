// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();

// Tạm thời để một route trống để test server
router.post('/register', (req, res) => {
    res.json({ message: "Route Register đang hoạt động!" });
});

module.exports = router;