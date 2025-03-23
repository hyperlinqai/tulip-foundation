import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

// Add this after loading dotenv to verify variables are loaded
console.log('Email configuration:', {
  user: process.env.EMAIL_USER ? 'Set (hidden)' : 'NOT SET',
  password: process.env.EMAIL_PASSWORD ? 'Set (hidden)' : 'NOT SET',
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO
});

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Add your Vite dev server URL
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'API server is running' });
});

// Volunteer application endpoint
app.post('/send-volunteer-application', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form data:', formData);

    // Read email templates
    const htmlTemplate = fs.readFileSync(
      path.join(process.cwd(), 'email-templates', 'volunteer-application.html'),
      'utf8'
    );
    const textTemplate = fs.readFileSync(
      path.join(process.cwd(), 'email-templates', 'volunteer-application.txt'),
      'utf8'
    );

    // Replace placeholders with actual data
    const htmlEmail = htmlTemplate
      .replace(/{{firstName}}/g, formData.firstName)
      .replace(/{{lastName}}/g, formData.lastName)
      .replace(/{{email}}/g, formData.email)
      .replace(/{{phone}}/g, formData.phone || 'Not provided')
      .replace(/{{reason}}/g, formData.reason.replace(/\n/g, '<br>'));

    const textEmail = textTemplate
      .replace(/{{firstName}}/g, formData.firstName)
      .replace(/{{lastName}}/g, formData.lastName)
      .replace(/{{email}}/g, formData.email)
      .replace(/{{phone}}/g, formData.phone || 'Not provided')
      .replace(/{{reason}}/g, formData.reason);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || "shoaib.narmadatech@gmail.com",
      subject: 'New Volunteer Application - Tulip Kids Foundation',
      text: textEmail,
      html: htmlEmail,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
