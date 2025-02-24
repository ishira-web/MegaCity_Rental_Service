package com.cabservice.megacity.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendWelcomeEmail(String toEmail, String name) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // Set email details
        helper.setTo(toEmail);
        helper.setSubject("Welcome to MegaCity Cab Service!");

        // Prepare the Thymeleaf context
        Context context = new Context();
        context.setVariable("name", name);

        // Process the HTML template
        String htmlContent = templateEngine.process("welcome-email", context);
        helper.setText(htmlContent, true); // Set HTML content

        // Send the email
        mailSender.send(message);
    }
}