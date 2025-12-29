import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

export const sendMessage = async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure:true,
      port:465,
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL, // Replace with your recipient email
      subject: "New Contact Form Submission",
      text: `Message from: ${email}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send message.");
  }
};
