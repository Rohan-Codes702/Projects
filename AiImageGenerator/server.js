const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors());

app.get("/api/search", async (req, res) => {
  const prompt = req.query.q;
  const url = `https://lexica.art/api/v1/search?q=${encodeURIComponent(prompt)}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/90.0.0.0 Safari/537.36"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Backend fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch from Lexica" });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
