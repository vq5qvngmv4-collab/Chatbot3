import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { initDb } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

initDb();

const app = express();
app.use(cors());
app.use(express.json());

// serve widget files
app.use("/widget", express.static(path.join(__dirname, "../public")));

app.post("/api/message", (req, res) => {
  const text = (req.body.text || "").toLowerCase();

  if (text.includes("hour")) {
    return res.json({
      reply: "We’re open 9am–5pm every day. Closed on public holidays unless it’s a weekend."
    });
  }

  if (text.includes("menu")) {
    return res.json({
      reply:
        "Menu:\n" +
        "• Miso Salmon Bowl – $24.50\n" +
        "• Truffle Mushroom Pasta – $21.00\n" +
        "• Vegan Green Salad – $16.00\n" +
        "Allergen info available on request."
    });
  }

  if (text.includes("location")) {
    return res.json({
      reply: "📍 88 Bay Street, Port Aurora VIC 3999"
    });
  }

  if (text.includes("book")) {
    return res.json({
      reply: "Booking feature coming soon. Please leave your name and phone number."
    });
  }

  return res.json({
    reply: "Hi 👋 Try typing: hours, menu, location, or book"
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
