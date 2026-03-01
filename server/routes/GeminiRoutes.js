const express = require("express");
const { suggestCrop } = require("../apis/Gemini/GeminiController");

const router = express.Router();

router.post("/suggest", suggestCrop);




module.exports = router;
