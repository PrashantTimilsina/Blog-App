import Mailjet from "node-mailjet";

const mailjetClient = Mailjet.apiConnect(
  process.env.MAILJET_API_PUBLIC_KEY,
  process.env.MAILJET_API_PRIVATE_KEY
);

export async function sendEmail(email, name, token, emailType) {
  try {
    const subject = `Welcome to Our Blog App, ${name}!`;
    const textPart = `Hi ${name},\n\nThank you for signing up to our Blog app. We're glad to have you!\n\nVisit this link to verify your email: ${process.env.DOMAIN}/verifyemail?token=${token}`;

    const htmlPart = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; color: #333;">
        <h2 style="color: #0070f3;">Welcome, ${name} 👋</h2>
        <p>Thanks for signing up to our <strong>Blog App</strong>! We're thrilled to have you join our growing community of  learners.</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }?token=${token}" 
             style="background-color: #0070f3; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
             ${
               emailType === "VERIFY"
                 ? "Verify your email"
                 : "Reset your password"
             }
          </a>
        </div>
        
        <p>If the button doesn’t work, you can also verify your email by copying and pasting this link into your browser:</p>
        <code style="word-break: break-all; display: block; background: #eee; padding: 10px; border-radius: 6px;">
          ${process.env.DOMAIN}/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }?token=${token}
        </code>

        <p style="margin-top: 40px;">Happy learning!<br/><strong>– The Dev Team</strong></p>
      </div>
    `;

    const requestMail = mailjetClient
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "blog@timilsinaprashant.com.np",
              Name: "Prashant's Blog",
            },
            To: [{ Email: email, Name: name }],
            Subject: subject,
            TextPart: textPart,
            HTMLPart: htmlPart,
          },
        ],
      });

    const result = await requestMail;
    return result.body;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}
