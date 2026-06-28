const express = require("express");
const inputmodel = require("./model/input.model");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");


dotenv.config();

const client = new OpenAI({
  apiKey: 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,
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
