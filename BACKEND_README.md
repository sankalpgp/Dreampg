# Dream Living PG - Backend Setup Guide

## 🚀 Quick Start

### 1. Install Node.js
Download and install Node.js from: https://nodejs.org (LTS version recommended)

### 2. Install Dependencies
Open terminal in this folder and run:
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

### 4. Access Your Website
- **Website**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health
- **View Enquiries**: http://localhost:3000/api/enquiries

## 📧 Email Configuration (Optional)

To receive email notifications when someone submits the contact form:

### Using Gmail:

1. **Enable 2-Step Verification** in your Google Account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
3. **Update .env file**:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   NOTIFICATION_EMAIL=dreamliving@gmail.com
   ```

### Using Other Email Services:
Update `server.js` line 21-26 with your SMTP settings.

## 📁 Features

### Contact Form Submission
- ✅ Saves all enquiries to `enquiries/` folder
- ✅ Creates individual JSON files for each enquiry
- ✅ Maintains a master log file (`all_enquiries.txt`)
- ✅ Sends email notifications (if configured)
- ✅ WhatsApp fallback option

### API Endpoints

**POST /api/contact**
Submit a new enquiry
```json
{
  "name": "Student Name",
  "phone": "1234567890",
  "email": "student@email.com",
  "roomType": "Double Sharing",
  "message": "I'm interested in booking"
}
```

**GET /api/enquiries**
Get all enquiries (for admin)
```
http://localhost:3000/api/enquiries
```

**GET /api/health**
Check if server is running
```
http://localhost:3000/api/health
```

## 📂 File Structure

```
FUTURE_FS_03/
├── index.html           # Main website
├── styles.css           # Styling
├── script.js            # Frontend JavaScript
├── server.js            # Backend server
├── package.json         # Dependencies
├── .env                 # Configuration (don't share!)
├── .gitignore          # Git ignore rules
├── enquiries/          # Saved enquiries (auto-created)
│   ├── enquiry_123.json
│   ├── enquiry_456.json
│   └── all_enquiries.txt
└── images/             # Room photos
```

## 🔒 Security Notes

- **Never share your .env file** - It contains sensitive credentials
- The `.gitignore` file prevents accidentally uploading sensitive data
- For production, use environment variables instead of .env file

## 🌐 Deploying Online

### Option 1: Heroku (Free)
1. Create account at heroku.com
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create dream-living-pg
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### Option 2: Railway.app (Easy)
1. Go to railway.app
2. Connect GitHub repository
3. Deploy automatically

### Option 3: Render.com (Free)
1. Go to render.com
2. Create new Web Service
3. Connect GitHub repo
4. Deploy

## 📊 Viewing Enquiries

### Method 1: Via Browser
Visit: http://localhost:3000/api/enquiries

### Method 2: Via File Explorer
Navigate to `enquiries/` folder and open:
- Individual JSON files for structured data
- `all_enquiries.txt` for human-readable format

### Method 3: Email
If configured, you'll receive an email for each enquiry with:
- Student details
- Contact information
- Direct WhatsApp link

## 🛠️ Troubleshooting

### "Cannot find module 'express'"
Run: `npm install`

### "Port 3000 already in use"
Change PORT in .env file to 3001 or another available port

### Email not sending
- Check Gmail app password (16 characters, no spaces)
- Make sure 2-Step Verification is enabled
- Check spam folder
- Email is optional - enquiries still save to files

### Form not submitting
- Make sure server is running (`npm start`)
- Check console for errors (F12 in browser)
- Verify you're accessing via http://localhost:3000 not file://

## 📱 Testing

1. **Start the server**: `npm start`
2. **Open website**: http://localhost:3000
3. **Fill contact form** with test data
4. **Submit** and check:
   - ✅ Success notification appears
   - ✅ File created in `enquiries/` folder
   - ✅ Email received (if configured)
   - ✅ WhatsApp option offered

## 💡 Tips

- **Keep server running** to receive enquiries
- **Backup enquiries folder** regularly
- **Monitor logs** in terminal for submissions
- **Test email** before going live
- **Use strong app passwords** for email

## 📞 Support

If you face any issues:
1. Check the terminal for error messages
2. Verify all dependencies are installed
3. Ensure .env file is configured correctly
4. Test with simple data first

---

**Built for Dream Living PG - Kharadi, Pune**
