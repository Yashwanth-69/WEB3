require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

const VALID_ACCESS_KEYS = ["JURY2025", "ADMIN123"];

app.use(cors());
app.use(bodyParser.json());

// Login route
router.post("/api/login", (req, res) => {
    const { accessKey } = req.body;

    if (VALID_ACCESS_KEYS.includes(accessKey)) {
        return res.json({ success: true, message: "Login successful!" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid access key" });
    }
});

app.use(router);


module.exports = app;
// const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
