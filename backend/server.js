const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../"))); // Serve HTML & static files

// POST route to handle form
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhinabajash48@gmail.com",
      pass: "jcgx mmxz wywg vpsz"
    }
  });

  const mailOptions = {
    from: email,
    to: "abhinabajash48@gmail.com", // your admin email
    subject: `Portfolio Contact: ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("<h3>Message Sent Successfully! <a href='/'>Go Back</a></h3>");
  } catch (err) {
    console.error(err);
    res.send("<h3>Something went wrong. <a href='/'>Try Again</a></h3>");
  }
});
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../index.html"))
})
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
