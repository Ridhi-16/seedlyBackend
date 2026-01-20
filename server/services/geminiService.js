require("dotenv").config();
// console.log(process.env.GEMINI_API_KEY);


const fetch = require("node-fetch");


const API_KEY = process.env.GEMINI_API_KEY;


const getCropSuggestion = async ({ season, location, soil }) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {text: `
You are an agricultural expert in India.

Based on:
- Season: ${season}
- Location: ${location}
- Soil type: ${soil}

Suggest 3 suitable crops.

Respond ONLY in valid JSON in the following exact format:

[
  {
    "crop": "Crop name",
    "duration": "Growing duration",
    "water": "Water requirement",
    "fertilizer": "Recommended fertilizer",
    "yield": "Expected yield level"
  }
]

Do not add explanations.
Do not add extra text.
`
              }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Gemini API Error: ${response.status} ${text}`);
    }

    const result = await response.json();

    if (!result.candidates || result.candidates.length === 0) {
      throw new Error("No suggestions returned from Gemini API");
    }

    const text = result.candidates[0]?.content?.parts[0]?.text;
    if (!text) {
      throw new Error("Suggestion text missing in Gemini response");
    }

    let parsedSuggestion;
    try {
      parsedSuggestion = JSON.parse(text); // parse if JSON
    } catch {
      parsedSuggestion = text; // fallback to raw text
    }

    return parsedSuggestion;
  } catch (error) {
    console.error("getCropSuggestion error:", error);
    throw error;
  }
};

module.exports = { getCropSuggestion };
