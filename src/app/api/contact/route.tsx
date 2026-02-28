import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  const resend = getResend();
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Send auto-reply to visitor
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);px; text-align: center; border padding: 30-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thanks for Reaching Out!</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for taking the time to reach out! I've received your message and I'm genuinely excited to connect with you.
            </p>
            
            <div style="background: linear-gradient(90deg, #FFFBEB 0%, #FFEDD5 100%); border-left: 4px solid #D4AF37; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 15px; color: #374151;">
                I'll carefully review your message and get back to you as soon as possible. Typically, I respond within 24-48 hours.
              </p>
            </div>
            
            <p style="font-size: 15px; margin-bottom: 20px;">
              In the meantime, feel free to explore my <a href="https://www.khalil.mageed.net/projects" style="color: #D4AF37;">projects</a> or learn more about <a href="https://www.khalil.mageed.net/research" style="color: #D4AF37;">my research</a>.
            </p>
            
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
            
            <p style="color: #6B7280; font-size: 14px; margin: 0;">Best regards,</p>
            <p style="font-size: 16px; font-weight: 600; margin: 5px 0;">Khalil Mageed</p>
            <p style="color: #6B7280; font-size: 14px; margin: 0;">Software Engineer & Researcher</p>
          </div>
        </body>
      </html>
    `;

    // Send notification to Khalil
    const notificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Message Received</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              <strong>From:</strong> ${name} &lt;${email}&gt;
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37; margin: 20px 0;">
              <p style="margin: 0; white-space: pre-wrap; font-size: 15px;">${message}</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Reply directly to: <a href="mailto:${email}" style="color: #D4AF37;">${email}</a>
            </p>
          </div>
        </body>
      </html>
    `;

    const [confirmationResult, notificationResult] = await Promise.all([
      resend.emails.send({
        from: "Khalil Mageed <noreply@khalil.mageed.net>",
        to: email,
        subject: "Thanks for reaching out! - Khalil Mageed",
        html: confirmationHtml,
      }),
      resend.emails.send({
        from: "Khalil Mageed <noreply@khalil.mageed.net>",
        to: "khalil@khalil.mageed.net",
        subject: "New Contact Form Message from " + name,
        html: notificationHtml,
      }),
    ]);

    if (confirmationResult.error || notificationResult.error) {
      console.error("Resend errors:", confirmationResult.error, notificationResult.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
