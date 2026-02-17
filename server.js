const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files from current directory

// Create enquiries directory if it doesn't exist
const enquiriesDir = path.join(__dirname, 'enquiries');
if (!fs.existsSync(enquiriesDir)) {
    fs.mkdirSync(enquiriesDir);
}

// Email configuration (using Gmail as example)
// You'll need to set up environment variables or update these directly
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Root route - serve the website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
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

        // Save enquiry to JSON file
        const filename = `enquiry_${Date.now()}.json`;
        const filepath = path.join(enquiriesDir, filename);
        fs.writeFileSync(filepath, JSON.stringify(enquiry, null, 2));

        // Also append to a master log file
        const logFile = path.join(enquiriesDir, 'all_enquiries.txt');
        const logEntry = `
========================================
Date: ${enquiry.date}
Name: ${enquiry.name}
Phone: ${enquiry.phone}
Email: ${enquiry.email}
Room Type: ${enquiry.roomType}
Message: ${enquiry.message}
========================================

`;
        fs.appendFileSync(logFile, logEntry);

        // Send email notification (optional - configure your email first)
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.NOTIFICATION_EMAIL || 'dreamliving@gmail.com',
                subject: `New PG Enquiry from ${name}`,
                html: `
                    <h2>New Enquiry Received - Dream Living PG</h2>
                    <p><strong>Received:</strong> ${enquiry.date}</p>
                    <hr>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Phone:</strong> <a href="tel:+91${phone}">+91 ${phone}</a></p>
                    <p><strong>Email:</strong> ${enquiry.email}</p>
                    <p><strong>Room Type:</strong> ${enquiry.roomType}</p>
                    <p><strong>Message:</strong> ${message || 'No message provided'}</p>
                    <hr>
                    <p><a href="https://wa.me/91${phone}" style="background: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Contact on WhatsApp</a></p>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log('Email notification sent successfully');
        } catch (emailError) {
            console.log('Email notification failed (configure email settings):', emailError.message);
            // Don't fail the request if email fails
        }

        // Send success response
        res.json({
            success: true,
            message: 'Enquiry received successfully! We will contact you soon.',
            data: enquiry
        });

        console.log(`New enquiry received from ${name} - ${phone}`);

    } catch (error) {
        console.error('Error processing enquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting enquiry. Please try again.'
        });
    }
});

// Get all enquiries (simple admin endpoint)
app.get('/api/enquiries', (req, res) => {
    try {
        const files = fs.readdirSync(enquiriesDir)
            .filter(file => file.endsWith('.json') && file !== 'all_enquiries.txt');
        
        const enquiries = files.map(file => {
            const filepath = path.join(enquiriesDir, file);
            return JSON.parse(fs.readFileSync(filepath, 'utf8'));
        });

        // Sort by timestamp (newest first)
        enquiries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.json({
            success: true,
            count: enquiries.length,
            enquiries
        });
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching enquiries'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Dream Living PG Backend is running!',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║   Dream Living PG Backend Server Running     ║
║                                              ║
║   Server: http://localhost:${PORT}            ║
║   Website: http://localhost:${PORT}/          ║
║   API: http://localhost:${PORT}/api/contact   ║
║                                              ║
║   Status: ✓ Ready to receive enquiries       ║
╚══════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server gracefully...');
    process.exit(0);
});
