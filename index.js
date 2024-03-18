const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.post('/createAccount', async (req, res) => {
    try {
       
        const url = 'https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/createAccount';
        const data = req.body;

       
        const response = await axios.post(url, data);
        res.json(response.data);
    } catch (error) {
        console.error('Error creating investment account:', error.response.data);
        res.status(error.response.status || 500).json({ error: 'Failed to create investment account' });
    }
});


app.post('/buyStocks', async (req, res) => {
    try {
  
        const url = 'https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/buyStocks';
        const data = req.body;

        
        const response = await axios.post(url, data, {
            headers: {
                'content-type': 'application/json',
                'bfhl-auth': req.body.rollNumber 
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
