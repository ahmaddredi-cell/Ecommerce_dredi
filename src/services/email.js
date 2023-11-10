import nodemailer from "nodemailer";

export async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "ahmad887drydi@gmail.com",
      pass: "emei kkff scoo irco",
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <ahmad887drydi@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    // plain text body
    html, // html body
  });
  return info;
}
