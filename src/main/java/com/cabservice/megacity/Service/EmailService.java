package com.cabservice.megacity.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.File;
import java.util.Random;

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

      public String generateOTP() {
        return String.valueOf(100000 + new Random().nextInt(900000)); // 6-digit OTP
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendRejectionEmail(String driverEmail, String driverName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
    
        helper.setFrom("your-email@gmail.com");
        helper.setTo(driverEmail);
        helper.setSubject("🚫 MegaCity Cab Service - Application Rejected");
    
        // Email content with styling
        String emailContent = "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                ".container { width: 100%; max-width: 600px; background: #ffffff; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center; }" +
                ".header { font-size: 24px; color: #ff0000; font-weight: bold; }" +
                ".content { padding: 20px; font-size: 16px; color: #333; }" +
                ".footer { padding: 15px; font-size: 14px; color: #666; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "   <div class='header'>Application Rejected 🚫</div>" +
                "   <div class='content'>" +
                "       <h2>Dear " + driverName + ",</h2>" +
                "       <p>We regret to inform you that your application to become a driver at MegaCity Cab Service has been declined.</p>" +
                "       <p>If you have any questions or believe this was an error, feel free to contact our support team.</p>" +
                "       <p>Thank you for your interest, and we wish you the best in your future endeavors.</p>" +
                "   </div>" +
                "   <div class='footer'>© 2025 MegaCity Cab Service. All rights reserved.</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    
        helper.setText(emailContent, true);
        mailSender.send(message);
    }

    public void sendBanNotificationEmail(String toEmail, String driverName) throws MessagingException {
        String subject = "Account Banned - MegaCity Cab Service";
        String body = "<h1>Dear " + driverName + ",</h1>"
                + "<p>We regret to inform you that your driver account with MegaCity Cab Service has been banned due to violations of our policies.</p>"
                + "<p>If you believe this is a mistake, please contact our support team.</p>"
                + "<p>Best Regards,<br>MegaCity Team</p>";
    
        sendEmail(toEmail, subject, body);
    }
    
    
    public void sendDriverDeletionEmail(String toEmail, String driverName) throws MessagingException {
        String subject = "Account Deleted - MegaCity Cab Service";
        String body = "<h1>Dear " + driverName + ",</h1>"
                + "<p>We regret to inform you that your driver account with MegaCity Cab Service has been permanently deleted.</p>"
                + "<p>If you have any questions, please contact our support team.</p>"
                + "<p>Best Regards,<br>MegaCity Team</p>";
    
        sendEmail(toEmail, subject, body);
    }


    
    
}
