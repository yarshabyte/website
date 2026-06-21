import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the email content
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Project Inquiry</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Intent:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.intent || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Project Type:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.projectType || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Budget Range:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.budget || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Source:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.source || 'N/A'}</td>
          </tr>
        </table>

        <h3 style="color: #333; margin-top: 30px;">Client Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.company || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
              <a href="mailto:${data.email}">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Deadline:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.deadline || 'N/A'}</td>
          </tr>
        </table>

        <h3 style="color: #333; margin-top: 30px;">Message</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #333; white-space: pre-wrap;">
${data.message || 'No message provided.'}
        </div>
      </div>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"Yarshabyte Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sending to yourself
      replyTo: data.email, // So you can hit "Reply" directly to the client
      subject: `New Inquiry from ${data.firstName} ${data.lastName}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
