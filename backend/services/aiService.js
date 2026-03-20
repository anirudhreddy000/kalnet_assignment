const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateStructuredPlan = async (userPlan) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert AI product manager, enthusiastic business coach, and deeply encouraging strategic planner. I will provide you with an unstructured plan or idea from a user. 
Your task is to organize and structure this idea into a clear format, identifying missing components and suggesting next steps.
Crucially, your tone MUST be highly encouraging, uplifting, and supportive. Even if the score is low, frame it as an exciting starting point with massive potential!

User's Plan/Idea: "${userPlan}"

Output strict JSON only. Do NOT format with markdown code blocks like \`\`\`json. Just output the raw JSON object with the following exact schema:
{
  "structuredPlan": {
    "goal": "string (The core objective inferred from their input, written as a clear statement)",
    "method": "string (The general approach or how they plan to achieve it)",
    "steps": ["string", "string"],
    "timeline": "string (If any timeline exists, otherwise 'Not specified')"
  },
  "missingElements": [
    {
      "category": "string (Must be one of: 'Goal clarity', 'Execution steps', 'Resources required', 'Timeline', or another relevant gap)",
      "description": "string (Constructive, encouraging description of what to add to make the plan bulletproof)"
    }
  ],
  "simplifiedVersion": "string (A highly concise, clearer, punchy 1-2 sentence version of their goal and approach)",
  "actionableSteps": ["string", "string (Encouraging next steps)"],
  "clarityScore": number (0-100 score. Give them a fair score, but don't be overly harsh),
  "scoreDisclaimer": "string (A 1-2 sentence encouraging explanation of why this score was given, focusing on how easily they can improve it!)",
  "comparisonTable": [
    {
      "aspect": "string (e.g., 'Clarity', 'Actionability', 'Scope')",
      "before": "string (How their original input handled this aspect, keep it brief)",
      "after": "string (How the new structured plan handles this aspect)"
    }
  ]
}
Return ONLY valid JSON. Nothing else.`;

    try {
        const result = await model.generateContent(prompt);
        let responseText = result.response.text();

        // Strip any markdown formatted wrappers
        responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();

        return JSON.parse(responseText);
    } catch (error) {
        console.error('Error in AI Service:', error);
        throw error;
    }
};

module.exports = { generateStructuredPlan };
