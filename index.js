const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Step 1: Create Investment Account using API 1
app.post('/createAccount', async (req, res) => {
    try {
        // API 1 URL and request data
        const url = 'https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/createAccount';
        const data = req.body;

        // Send POST request to create investment account
        const response = await axios.post(url, data);
        res.json(response.data);
    } catch (error) {
        console.error('Error creating investment account:', error.response.data);
        res.status(error.response.status || 500).json({ error: 'Failed to create investment account' });
    }
});

// Step 3: Invest in Bajaj Finserv using API 2
app.post('/buyStocks', async (req, res) => {
    try {
        // API 2 URL and request data
        const url = 'https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/buyStocks';
        const data = req.body;

        // Send POST request to buy stocks
        const response = await axios.post(url, data, {
            headers: {
                'content-type': 'application/json',
                'bfhl-auth': req.body.rollNumber // Assuming rollNumber is sent as header
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error buying stocks:', error.response.data);
        res.status(error.response.status || 500).json({ error: 'Failed to buy stocks' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
