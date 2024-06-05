export const VerificationMail = (userName: string, verificationCode: number) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Code Verification</h2>
      <p>Hello ${userName},</p>
      <p>Your verification code is: <strong>${verificationCode}</strong></p>
      
      <p style="color: #888;">This code will expire in 10 minutes. Please do not share it with anyone.</p>
  
      <p>If you didn't request this verification, please ignore this email.</p>
  
      <p>Best regards,<br>SKyd Team</p>
    </div>
  
  </body>
  </html>
  `;
};

export const RegisterSuccussMail = (appName: string, userName: string) => {
  return `
  <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Successful</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h2 style="color: #4CAF50;">Registration Successful</h2>
    <p>Hello ${userName},</p>
    <p>Congratulations! Your registration with ${appName} was successful.</p>
    
    <p style="color: #888;">Thank you for joining our community. You can now [provide details about next steps, login, etc.].</p>

    <p>If you have any questions or need assistance, feel free to contact our support team.</p>

    <p>Best regards,<br>Skyd Team</p>
  </div>

</body>
</html>
  `;
};

export const ResetPasswordMail = (appName: string, userName: string, otp: number) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forgot Password OTP</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
              margin-bottom: 20px;
          }
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #666;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h2>Forgot Password - One-Time Password (OTP)</h2>
          <p>Dear ${userName},</p>
          <p>You have requested to reset your password. To proceed with resetting your password, please use the following one-time password (OTP).</p>
          <p class="otp-code">Your OTP is: ${otp}</p>
          <p>Please enter this OTP in the provided field within [Time Limit] minutes to reset your password. If you did not request this password reset or need assistance, please contact our support team.</p>
          <div class="footer">
              <p>Thank you.</p>
              <p>Best regards,<br>${appName} Team</p>
          </div>
      </div>
  </body>
  </html>`  
}