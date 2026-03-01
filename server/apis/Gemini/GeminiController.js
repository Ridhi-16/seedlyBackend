const { getCropSuggestion } = require("../../services/geminiService");
const { GoogleGenerativeAI } = require("@google/generative-ai");






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






// ✅ Export both functions
module.exports = { suggestCrop };
// suggestCrop,