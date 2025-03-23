import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Testing email with config:', {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        // Password hidden for security
      },
    });
    
    // Create a transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Simple test email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'Test Email from Tulip Kids App',
      text: 'This is a test email to verify the email functionality is working.',
      html: '<h2>Test Email</h2><p>This is a test email to verify the email functionality is working.</p>',
    };

    // Verify SMTP connection
    const verifyResult = await transporter.verify();
    console.log('Transporter verification:', verifyResult);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent:', info);

    return res.status(200).json({ 
      success: true, 
      message: 'Test email sent successfully',
      info: info
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send test email', 
      error: error.message 
    });
  }
}