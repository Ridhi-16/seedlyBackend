const { getCropSuggestion } = require("../../services/geminiService");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const suggestCrop = async (req, res) => {
  try {
    const { season, location, soil } = req.body;

    if (!season || !location || !soil) {
      return res.status(400).json({
        success: false,
        message: "Missing season, location, or soil"
      });
    }

    const suggestion = await getCropSuggestion({ season, location, soil });
    console.log("Suggestion received:", suggestion);

    res.json({
      success: true,
      data: suggestion
    });
  } catch (error) {
    console.error("suggestCrop error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get crop suggestion",
      error: error.message
    });
  }
};


// controllers/aiController.js

const voiceProgress = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
A farmer spoke the following sentence in Hindi.

Task:
- Translate it into SIMPLE English
- Maximum 2 short lines
- Keep it professional and clear

Hindi Text:
"${message}"
`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    res.json({
      success: true,
      data: text.trim()
    });
  } catch (error) {
    console.error("voiceProgress error:", error);
    res.status(500).json({
      success: false,
      message: "AI translation failed"
    });
  }
};

// ✅ Export both functions
module.exports = { suggestCrop, voiceProgress };
