// Vercel Serverless Function for Contact Form
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    try {
        const { name, phone, email, roomType, message } = req.body;

        // Validate required fields
        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name and phone number are required'
            });
        }

        // Create enquiry object
        const enquiry = {
            name,
            phone,
            email: email || 'Not provided',
            roomType: roomType || 'Not specified',
            message: message || 'No message',
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        // Send email notification (if configured)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
                    subject: `🏠 New PG Enquiry from ${name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #2563eb;">New Enquiry - Dream Living PG</h2>
                            <p><strong>Received:</strong> ${enquiry.date}</p>
                            <hr style="border: 1px solid #e5e7eb;">
                            
                            <table style="width: 100%; margin: 20px 0;">
                                <tr><td style="padding: 8px;"><strong>Name:</strong></td><td style="padding: 8px;">${name}</td></tr>
                                <tr><td style="padding: 8px;"><strong>Phone:</strong></td><td style="padding: 8px;"><a href="tel:+91${phone}">+91 ${phone}</a></td></tr>
                                <tr><td style="padding: 8px;"><strong>Email:</strong></td><td style="padding: 8px;">${enquiry.email}</td></tr>
                                <tr><td style="padding: 8px;"><strong>Room Type:</strong></td><td style="padding: 8px;">${enquiry.roomType}</td></tr>
                                ${message ? `<tr><td style="padding: 8px;"><strong>Message:</strong></td><td style="padding: 8px;">${message}</td></tr>` : ''}
                            </table>
                            
                            <hr style="border: 1px solid #e5e7eb;">
                            <p style="text-align: center; margin: 20px 0;">
                                <a href="https://wa.me/91${phone}" 
                                   style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                   💬 Contact on WhatsApp
                                </a>
                            </p>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log('Email notification sent successfully');
            } catch (emailError) {
                console.log('Email notification failed:', emailError.message);
                // Don't fail the request if email fails
            }
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Enquiry received successfully! We will contact you soon.',
            data: {
                name: enquiry.name,
                phone: enquiry.phone,
                timestamp: enquiry.timestamp
            }
        });

        console.log(`✅ New enquiry from ${name} - ${phone}`);

    } catch (error) {
        console.error('Error processing enquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting enquiry. Please try again or contact us via WhatsApp.'
        });
    }
};
