const { generateStructuredPlan } = require('../services/aiService');

const analyzePlan = async (req, res) => {
    try {
        const { plan } = req.body;

        if (!plan || plan.trim() === '') {
            return res.status(400).json({ error: 'Plan input is required.' });
        }

        const structuredResult = await generateStructuredPlan(plan);
        res.json(structuredResult);
    } catch (error) {
        console.error('Error analyzing plan:', error);
        res.status(500).json({ error: 'Failed to analyze the plan. Please try again.', details: error.message });
    }
};

module.exports = { analyzePlan };
