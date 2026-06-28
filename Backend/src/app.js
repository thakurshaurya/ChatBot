const express = require("express");
const inputmodel = require("./model/input.model");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");


dotenv.config();


const client = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY,
});

const app = express();

app.use(cors({
  origin: "https://chatbotfrontend-sn6p.onrender.com",
  methods: ["GET", "POST"],
}));

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a General Knowledge expert.\n\nUser: ${message}`,
            },
          ],
        },
      ],
    });

    const reply = response.text;

    await inputmodel.create({
      input: message,
      output: reply,
    });

    return res.json({ reply });
  } catch (err) {
    console.error("Error:");
    console.error(err);

    if (err.status) {
      console.error("Status:", err.status);
    }

    if (err.error) {
      console.error("API Error:", err.error);
    }

    return res.status(500).json({
      message: err.message,
      error: err.error,
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/", async (req, res) => {
  const response = await inputmodel.find();
  res.json(response);
});
module.exports = app;
