const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

// Railway provides PORT automatically
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Bot backend is running ✅");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    res.json({ reply: response.output_text });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Bot error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
