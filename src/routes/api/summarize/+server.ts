import { json, error } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

// Gemini Flash model endpoint
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const POST: RequestHandler = async ({ request }) => {
  // 1. Parse and validate the request body
  let text: string;

  try {
    const body = await request.json();
    text = body.text;
  } catch {
    throw error(400, { message: 'Invalid request body.' });
  }

  if (!text || typeof text !== 'string' || text.trim().length < 50) {
    throw error(400, { message: 'Resume text is too short. Please paste your full resume.' });
  }

  if (text.length > 8000) {
    throw error(400, { message: 'Resume text exceeds the 8,000 character limit.' });
  }

  // 2. Build the Gemini request
  const prompt = `You are a professional career coach and technical recruiter.

Analyze the following resume and produce a concise, compelling professional summary (150–200 words) that:
- Opens with the candidate's title and years of experience
- Highlights their top 3–4 technical strengths with specifics
- Mentions notable projects or achievements if present
- Ends with what kind of role or opportunity they're seeking
- Uses active, confident language (no filler phrases like "passionate about" or "results-driven")
- Is formatted as clean paragraphs — no bullet points, no markdown

Resume:
${text.trim()}

Professional Summary:`;

  // 3. Call Gemini Flash
  const geminiRes = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,      // Balanced creativity vs accuracy
        maxOutputTokens: 400,  // ~200 words
        topP: 0.9
      }
    })
  });

  // 4. Handle Gemini errors
  if (!geminiRes.ok) {
    const geminiError = await geminiRes.json().catch(() => ({}));
    console.error('Gemini API error:', geminiError);
    throw error(502, { message: 'AI service is temporarily unavailable. Please try again.' });
  }

  // 5. Extract the generated text
  const geminiData = await geminiRes.json();
  const summary = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!summary) {
    throw error(502, { message: 'AI returned an empty response. Please try again.' });
  }

  // 6. Return the summary to the client
  return json({ summary: summary.trim() });
};