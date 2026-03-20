# Explain My Plan — AI Clarity & Structuring Tool

## Project Overview
This project is an AI-powered web application that takes an unstructured, free-form idea or plan and converts it into a highly structured, actionable format. The application is built with a dual-tier architecture:
- **Frontend**: Next.js (React) + Tailwind CSS, delivering a sleek, dynamic, and premium user experience with micro-animations.
- **Backend**: Node.js + Express, which securely interacts with the Google Gemini API to process and structure the user's input.

## Setup Instructions

### Prerequisites
- Node.js installed (v18+ recommended)
- A valid Google Gemini API Key

### 1. Set up the Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables:
   - Edit the `.env` file and replace `YOUR_GEMINI_API_KEY` with your actual Google Gemini API key.
4. Start the backend server:
   ```bash
   npm start
   ```
   *The server will run on `http://localhost:5000`.*

### 2. Set up the Frontend
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (should already be processed, but to be sure):
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:3000`.

---

## Explanation of Prompt Design
The core value of this application lies in the exact extraction of JSON data directly from the natural language input. 
The prompt employs **persona adoption** ("expert AI product manager, business coach, and strategic planner") to set the tone, and **strict JSON schema enforcement** to guarantee machine-readable output. 
By defining the output structure completely (requesting string layouts, array mappings, and constraints like "Must be one of..."), the Gemini AI model reliably parses the chaotic input into the `Goal`, `Method`, `Steps`, and `Timeline` nodes without hallucinatory wrappers. We post-process the LLM response safely by stripping potential markdown formatting before parsing.

## Explanation of Clarity Score Logic
The Clarity Score (0-100) is natively calculated by the AI as part of its prompt generation. The logic explicitly instructs the model to evaluate the input against four dimensions:
1. **Defined Goal**: Is the ultimate outcome clear?
2. **Defined Steps**: Are there concrete action items?
3. **Presence of Timeline**: Is there a stated or implied deadline/timeframe?
4. **Completeness of Plan**: How realistic and well-supported is the input?

The AI synthesizes these constraints to output a numerical score, along with a `scoreDisclaimer` that transparently explains the reasoning behind the grade in 1-2 sentences.

---

## Short Note on Challenges & AI Prompting (Intern Assignment)

**Challenges Faced:**
The most significant challenge when building AI-wrapper applications is ensuring consistent output structures from the LLM. LLMs inherently want to provide conversational context (e.g., "Here is your structured plan..."). To mitigate this, the backend strips markdown wrappers and enforces a very rigid JSON schema via the prompt to ensure the React frontend never breaks due to parsing errors. Another challenge was visually laying out complex JSON data in a UI that feels inspiring rather than overwhelming.

**AI Prompting Approach:**
I approached the prompt design using "Zero-Shot Structured Extraction." Instead of giving the AI multiple examples, I provided a highly detailed schema definition with instructions embedded inside the JSON keys themselves (e.g., `"category": "string (Must be one of: 'Goal clarity'...)`"). This acts as a semantic guardrail, forcing the AI to strictly classify elements and focus on gaps in clarity as opposed to just summarizing the user's idea.
