import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const GEMINI_API_KEY = "AIzaSyDtMVE0WEmtnXgtijY3fX03eN9BVUp6zHw"; // or from process.env

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Prepend instructions to keep the AI on-topic
    const prompt = `
You are an eco-friendly AI assistant. Only answer questions related to:
- Carbon footprint
- Environment
- Sustainability
- Eco-friendly lifestyle

Do NOT provide responses unrelated to these topics.

User question: "${message}"
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "⚠️ Sorry, I couldn’t get a response.";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ reply: "❌ Something went wrong with the AI." });
  }
});

export default router;
