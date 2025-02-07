//package com.app.controller;
//
//@RestController
//public class ContactController {
//
//	import org.springframework.beans.factory.annotation.Value;
//	import org.springframework.http.HttpStatus;
//	import org.springframework.http.ResponseEntity;
//	import org.springframework.mail.javamail;
//	import org.springframework.mail.javamail.MimeMessageHelper;
//	import org.springframework.web.bind.annotation.PostMapping;
//	import org.springframework.web.bind.annotation.RequestBody;
//	import org.springframework.web.bind.annotation.RestController;
//
//	import javax.mail.MessagingException;
//	import javax.mail.internet.MimeMessage;
//
//	@RestController
//	public class ContactController {
//
//	    private final JavaMailSender mailSender;
//
//	    // Inject the JavaMailSender bean configured in your Spring Boot application
//	    public ContactController(JavaMailSender mailSender) {
//	        this.mailSender = mailSender;
//	    }
//
//	    @Value("${contact.email.to}")
//	    private String emailTo;
//
//	    @PostMapping("/contact")
//	    public ResponseEntity<String> sendEmail(@RequestBody ContactForm contactForm) {
//
//	        // Create a new MIME message
//	        MimeMessage message = mailSender.createMimeMessage();
//	        MimeMessageHelper helper = new MimeMessageHelper(message);
//
//	        try {
//	            // Set the message properties
//	            helper.setFrom(contactForm.getEmail());
//	            helper.setTo(emailTo);
//	            helper.setSubject("New Contact Message");
//	            helper.setText("Name: " + contactForm.getName() + "\nMobile: " + contactForm.getMobile() +
//	                    "\nEmail: " + contactForm.getEmail() + "\nMessage: " + contactForm.getMessage());
//
//	            // Send the email
//	            mailSender.send(message);
//
//	            // Send a success response to the client
//	            return ResponseEntity.ok("Email sent successfully!");
//
//	        } catch (MessagingException e) {
//	            // Log the error and send an error response to the client
//	            e.printStackTrace();
//	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                    .body("Failed to send email. Please try again later.");
//	        }
//	    }
//	}
//
//}
