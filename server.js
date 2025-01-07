//Enable dotenv
require('dotenv').config()

// Enable dependencies
const express = require('express');
const axios = require('axios'); // Import axios
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Debug incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Handle POST /chat
app.post('/chat', async (req, res) => {
    if (!req.body || !req.body.text) {
        return res.status(400).send('No text provided in the request body');
    }

    console.log(`User Input: ${req.body.text}`);

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const postData = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": req.body.text,
                        },
                    ],
                },
            ],
        };

        // Send request to the API
        const response = await axios.post(apiUrl, postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Extract the reply from the response
        const candidates = response.data.candidates;
        let reply = "No reply from the API";

        if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
            reply = candidates[0].content.parts[0]?.text || reply;
        }

        console.log('Extracted Reply:', reply);

        // Send the reply back to the client
        res.json({ reply });
    } catch (error) {
        console.error('Error calling API:', error.response?.data || error.message);
        res.status(500).send('Failed to fetch response from the API');
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});