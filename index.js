require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// const router = express.Router();

const VALID_ACCESS_KEYS = ["ADMIN123","JURY1","JURY2","JURY3"] ;

app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Hello world")
})

// Login route
app.post("/api/login", (req, res) => {
    const { accessKey } = req.body;
    
    if (VALID_ACCESS_KEYS.includes(accessKey)) {
        const jury_index = VALID_ACCESS_KEYS.indexOf(accessKey);
        return res.json({ success: true, message: "Login successful!", jury_no: jury_index});
    } else {
        return res.status(401).json({ success: false, message: "Invalid access key" });
    }

})

module.exports = app;
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
