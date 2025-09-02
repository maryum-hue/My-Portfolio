require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// POST route to send mail
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS
  }
});

  try {
    await transporter.sendMail({
      from: email,
      to: "yourgmail@gmail.com",
      subject: `Portfolio Contact from ${name}`,
      text: message
    });

    res.status(200).json({ success: true, message: "✅ Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "❌ Failed to send message" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
