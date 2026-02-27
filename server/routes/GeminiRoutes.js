const express = require("express");
const { suggestCrop } = require("../apis/Gemini/GeminiController");
const { voiceProgress } = require("../controllers/aiController");
const router = express.Router();

router.post("/suggest", suggestCrop);


router.post("/voice-progress", voiceProgress);

module.exports = router;
