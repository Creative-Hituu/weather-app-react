const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Weather API Route with Error Handling
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const apiKey = '168a01f3ef32ba91a8bd9a1e707d6d39'; // ← Yaha apni asli API key daal
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
