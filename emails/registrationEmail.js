module.exports = function registrationEmail(firstname, lastname) {
  return `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f4f6f9;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <div style="background: #2c3e50; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Welcome to Student Portal 🎓</h1>
      </div>
      
      <div style="padding: 30px;">
        <p>Hi <strong>${firstname} ${lastname}</strong>,</p>
        
        <p>We’re excited to have you join our Student Portal community! Your registration was successful, and you can now log in to explore everything we’ve prepared for you.</p>
        
        <p style="margin: 20px 0; text-align: center;">
          <a href="http://localhost:5000/dashboard" style="background: #3498db; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-weight: bold;">
            Go to Dashboard
          </a>
        </p>
        
        <p>If you have any questions or need assistance, just reply to this email. We’ll be glad to help you out.</p>
        
        <p>Best regards,<br>
        <strong>The Student Portal Team</strong></p>
      </div>
      
      <div style="background: #ecf0f1; color: #7f8c8d; padding: 15px; text-align: center; font-size: 12px;">
        © ${new Date().getFullYear()} Student Portal. All rights reserved.<br>
        You are receiving this email because you registered on our platform.
      </div>
    </div>
  </div>
  `;
};