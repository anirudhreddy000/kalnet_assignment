require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { analyzePlan } = require('./controllers/analyzeController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main API Route
app.post('/api/analyze', analyzePlan);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
