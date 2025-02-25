package com.cabservice.megacity.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendThankYouEmail(String toEmail, String userName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("your-email@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject("🎉 Welcome to MegaCity Cab Service! 🚖");

        // Set the local file path for the logo
        File logoFile = new File("./src/main/resources/templates/Logo.svg"); // Update with your actual file path

        // HTML email content with CID for inline image
        String emailContent = "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                ".container { width: 100%; max-width: 600px; background: #ffffff; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center; }" +
                ".logo { width: 120px; margin-bottom: 20px; }" +
                ".header { font-size: 24px; color: #007BFF; font-weight: bold; }" +
                ".content { padding: 20px; font-size: 16px; color: #333; }" +
                ".cta-button { display: inline-block; padding: 12px 24px; margin-top: 20px; background: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; }" +
                ".footer { padding: 15px; font-size: 14px; color: #666; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "   <img src='cid:logoImage' alt='MegaCity Logo' class='logo'/>" + // Reference CID
                "   <div class='header'>Welcome to MegaCity Cab Service! 🚖</div>" +
                "   <div class='content'>" +
                "       <h2>Hi " + userName + ",</h2>" +
                "       <p>Thank you for signing up with MegaCity Cab Service. We’re thrilled to have you on board!</p>" +
                "       <p>Get ready to experience smooth and reliable rides across the city.</p>" +
                "       <a href='http://localhost:5173' class='cta-button'>Start Your Journey</a>" +
                "   </div>" +
                "   <div class='footer'>© 2025 MegaCity Cab Service. All rights reserved.</div>" +
                "</div>" +
                "</body>" +
                "</html>";

        helper.setText(emailContent, true);
        
        // Attach the logo as an inline image
        if (logoFile.exists()) {
            helper.addInline("logoImage", logoFile);
        }

        mailSender.send(message);
    }
}
