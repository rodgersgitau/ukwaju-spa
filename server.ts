import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import path from "path";
import nodemailer from "nodemailer";
import { google } from "googleapis";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // === API ROUTES ===

  // 1. Booking endpoint
  app.post("/api/book", async (req, res) => {
    try {
      const { name, email, phone, date, time, guests, service, specialRequests } = req.body;
      
      // In a real application, you would:
      // a) Send an email to the Spa and Guest using Nodemailer
      // b) Insert an event into Google Calendar
      
      // Example Nodemailer logic (guarded with env variables to prevent crashing if unset):
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
             user: process.env.SMTP_USER,
             pass: process.env.SMTP_PASS,
          },
        });
        
        // Confirmation to guest
        await transporter.sendMail({
          from: `"Ukwaju Spa by Tamarind Tree Hotel" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Your Relaxation Awaits: Booking Confirmation",
          text: `Dear ${name},\n\nThank you for booking with Ukwaju Spa. We look forward to welcoming you for your ${service} on ${date} at ${time}.\n\nWarm regards,\nUkwaju Spa`,
        });

        // Notice to spa team
        await transporter.sendMail({
          from: `"Ukwaju Spa System" <${process.env.SMTP_USER}>`,
          to: process.env.GOOGLE_CALENDAR_ID || process.env.SMTP_USER,
          subject: `New Booking: ${name} - ${date}`,
          text: `New booking details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nService: ${service}\nRequests: ${specialRequests}`,
        });
      }

      // Example Google Calendar logic:
      if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
        const jwtClient = new google.auth.JWT({
          email: process.env.GOOGLE_CLIENT_EMAIL,
          key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/calendar']
        });
        const calendar = google.calendar({ version: 'v3', auth: jwtClient });
        await calendar.events.insert({
          calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
          requestBody: {
            summary: `Spa Booking: ${name}`,
            description: `Phone: ${phone}\nEmail: ${email}\nGuests: ${guests}\nService: ${service}\nSpecial Requests: ${specialRequests}`,
            start: { dateTime: new Date(`${date}T${time}:00`).toISOString() },
            end: { dateTime: new Date(new Date(`${date}T${time}:00`).getTime() + 60 * 60 * 1000).toISOString() }, // Assume 1 hour
          }
        });
      }

      // Return success regardless of actual configuration constraints in this demo
      res.json({ success: true, message: "Booking received and confirmed." });
    } catch (error: any) {
      console.error("Booking API Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 2. Voucher endpoint
  app.post("/api/voucher", async (req, res) => {
    try {
      const { senderName, recipientName, recipientEmail, recipientPhone, amount, message } = req.body;
      
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
             user: process.env.SMTP_USER,
             pass: process.env.SMTP_PASS,
          },
        });
        
        // Send voucher to recipient
        await transporter.sendMail({
          from: `"Ukwaju Spa Gift Vouchers" <${process.env.SMTP_USER}>`,
          to: recipientEmail,
          subject: `${senderName} sent you an Ukwaju Spa Gift Voucher!`,
          text: `Dear ${recipientName},\n\nYou have received a gift voucher worth KES ${amount} from ${senderName}.\n${recipientPhone ? `\n(Phone: ${recipientPhone})` : ''}\nMessage: ${message}\n\nPresent this email at Ukwaju Spa to redeem your relaxing experience.`,
        });
      }

      res.json({ success: true, message: "Voucher purchased and sent successfully." });
    } catch (error: any) {
      console.error("Voucher API Error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // === VITE MIDDLEWARE ===

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
