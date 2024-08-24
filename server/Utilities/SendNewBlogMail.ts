import nodemailer from "nodemailer";
const sendEmail = (recipientEmail: any, blog: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mr.luckysharma7@gmail.com",
      pass: "zazs wute dtvu nodt",
    },
  });

  const mailOptions = {
    from: "mr.luckysharma7@gmail.com",
    to: recipientEmail,
    subject: "New Blog Post Published",
    text: `A new blog titled "${blog.title}" has been published. Check it out!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendEmail;
