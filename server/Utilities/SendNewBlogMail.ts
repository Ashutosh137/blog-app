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
    subject: blog.title,
    html: blog.content,
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
