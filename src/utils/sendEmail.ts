import nodemailer from "nodemailer";

export async function sendWelcomeEmail(userEmail: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Change this if using another service (e.g., SendGrid, AWS SES)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or App password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Welcome to Our Platform 🎉",
      html: `<h1>Welcome!</h1><p>We're excited to have you on board.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully.");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}
