const axios = require('axios'); // Install using `npm install axios`
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const GOOGLE_SHEET_API = "https://script.google.com/macros/s/AKfycbzzq9V11rM2pljU0F04Dn3b7eKMHiIfZ9CbR38KKPsuEJZwm0_SgM1xVEaJhfHtw5Q/exec";

async function fetchAccessKeys() {
    try {
        const response = await axios.get(GOOGLE_SHEET_API);
        const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
        
        return data.accessKeys;
    } catch (error) {
        console.error("Error fetching access keys:", error);
        return [];
    }
}

app.post('/api/login', async (req, res) => {
    const { accessKey } = req.body;
    const VALID_ACCESS_KEYS = await fetchAccessKeys();
    if (VALID_ACCESS_KEYS.includes(accessKey)) {
        const jury_index = VALID_ACCESS_KEYS.indexOf(accessKey);
        return res.json({ success: true, message: "Login successful!", jury_no: jury_index });
    } else {
        return res.status(401).json({ success: false, message: "Invalid access key" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
