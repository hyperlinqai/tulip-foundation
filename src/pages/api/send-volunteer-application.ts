import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
};

export default async function handler(
  req: Request,
  res: Response
) {
  // Log the incoming request for debugging
  console.log('Received request:', {
    method: req.method,
    body: req.body,
    headers: req.headers
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData: FormData = req.body;

    // Validate that we have the required data
    if (!formData || !formData.email) {
      console.error('Missing required form data');
      return res.status(400).json({
        success: false,
        message: 'Missing required form data'
      });
    }

    // Read email templates
    const htmlTemplatePath = path.join(process.cwd(), 'email-templates', 'volunteer-application.html');
    const textTemplatePath = path.join(process.cwd(), 'email-templates', 'volunteer-application.txt');

    console.log('Reading templates from:', {
      htmlPath: htmlTemplatePath,
      textPath: textTemplatePath
    });

    let htmlTemplate, textTemplate;
    try {
      htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8');
      textTemplate = fs.readFileSync(textTemplatePath, 'utf8');
      console.log('Templates loaded successfully');
    } catch (readError) {
      console.error('Error reading template files:', readError);
      // Continue with fallback templates if files can't be read
    }

    // Replace placeholders with actual data
    const htmlEmail = htmlTemplate
      ? htmlTemplate
        .replace(/{{firstName}}/g, formData.firstName)
        .replace(/{{lastName}}/g, formData.lastName)
        .replace(/{{email}}/g, formData.email)
        .replace(/{{phone}}/g, formData.phone || 'Not provided')
        .replace(/{{reason}}/g, formData.reason.replace(/\n/g, '<br>'))
      : null;

    const textEmail = textTemplate
      ? textTemplate
        .replace(/{{firstName}}/g, formData.firstName)
        .replace(/{{lastName}}/g, formData.lastName)
        .replace(/{{email}}/g, formData.email)
        .replace(/{{phone}}/g, formData.phone || 'Not provided')
        .replace(/{{reason}}/g, formData.reason)
      : null;

    console.log('Creating email transporter with config:', {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        // Password hidden for security
      },
    });

    // Create a transporter - Gmail configuration
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
      to: process.env.EMAIL_TO,
      subject: 'New Volunteer Application - Tulip Kids Foundation',
      text: textEmail || `
        New volunteer application received:
        
        Name: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone || 'Not provided'}
        
        Why they want to join:
        ${formData.reason}
      `,
      html: htmlEmail || `
        <h2>New Volunteer Application</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        
        <h3>Why they want to join:</h3>
        <p>${formData.reason.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      usingTemplate: !!htmlTemplate
    });

    // Verify SMTP connection configuration
    try {
      const verifyResult = await transporter.verify();
      console.log('Transporter verification successful:', verifyResult);
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      // Continue anyway to see the specific sending error
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
}
