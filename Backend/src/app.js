const express = require("express");
const inputmodel = require("./model/input.model");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");


dotenv.config();

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const app = express();

app.use(cors({
  origin: "https://chatbotfrontend-sn6p.onrender.com",
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const stream = await openrouter.chat.completions.create({
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = stream?.choices?.[0]?.message?.content ?? "";

    await inputmodel.create({
      input: message,
      output: reply,
    });

    return res.json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error" });
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
