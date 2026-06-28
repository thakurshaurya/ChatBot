const express = require("express");
const inputmodel = require("./model/input.model");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");


dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(cors({
  origin: "https://chatbotfrontend-sn6p.onrender.com",
  methods: ["GET", "POST"],
}));



app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    console.log("Using OpenAI SDK");
    console.log("Model:", "gpt-5.4-mini");
    const message = req.body.message;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: "You are a General Knowledge expert.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.choices[0].message.content;

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
