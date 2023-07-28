import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 5000;

app.use(cors({ origin: 'http://localhost:3001' }));

app.get('/drug-interaction-proxy', async (req, res) => {
  const { genes } = req.query;

  try {
    // Using the new API endpoint 
    const url = `https://drug-info-and-price-history.p.rapidapi.com/1/druginfo?drug=${genes}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '68e0c23431msh12720205c98faa6p15ed5bjsn417519be571c',
        'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const data = await response.text();

    res.send(data);
  } catch (error) {
    console.error('Error while fetching drug information:', error.message);
    res.status(500).send('An error occurred while fetching drug information.');
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

