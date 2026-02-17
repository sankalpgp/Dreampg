# Dream Living PG Website 🏠

A professional, modern website for Paying Guest (PG) accommodation designed to help students and working professionals find comfortable housing.

## 🌟 Features

### Modern Design
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Beautiful UI** - Clean, professional design with smooth animations
- **Fast Loading** - Optimized for performance

### Key Sections
- **Home** - Attractive hero section with key features
- **About** - Information about the PG and why to choose it
- **Rooms** - Different room options with pricing (Single, Double, Triple)
- **Facilities** - All amenities like WiFi, meals, security, etc.
- **Gallery** - Photo gallery with lightbox effect
- **Testimonials** - Reviews from current/past residents
- **Contact** - Easy contact form with WhatsApp integration
- **Map** - Google Maps location embed

### Interactive Features
- ✅ Mobile-responsive navigation menu
- ✅ Smooth scrolling between sections
- ✅ WhatsApp contact button (floating)
- ✅ Contact form with WhatsApp integration
- ✅ Back to top button
- ✅ Image gallery with lightbox
- ✅ Scroll animations
- ✅ Active navigation highlighting

## 🚀 Quick Start

### 1. Customize Your Content

Open `index.html` and update:

**Basic Information:**
- PG Name (currently "Dream Living PG")
- Phone number: `+91 98765 43210`
- Email: `dreamliving@gmail.com`
- Address details

**Room Pricing:**
- Single Occupancy: ₹8,000/month
- Double Sharing: ₹6,000/month
- Triple Sharing: ₹5,000/month

**Images:**
Replace the placeholder Unsplash images with your own photos:
```html
<!-- Example: -->
<img src="https://images.unsplash.com/..." alt="...">
<!-- Change to: -->
<img src="images/your-photo.jpg" alt="...">
```

### 2. Update WhatsApp Number

**In `index.html`:**
- Find all instances of `919876543210`
- Replace with your actual number (with country code, no + or spaces)
- Example: For +91 98765 43210, use: `919876543210`

**In `script.js`:**
- Line 102: Update `whatsappNumber` variable

### 3. Add Google Maps

**Get Your Embed Code:**
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your PG location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in the Map Section of `index.html`

### 4. Add Your Photos

Create an `images` folder and add:
- Building exterior
- Room photos (single, double, triple)
- Kitchen/dining area
- Common areas
- Bathroom
- Study area

Then update the image sources in HTML.

## 📁 File Structure

```
FUTURE_FS_03/
│
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation (this file)
```

## 🎨 Customization Guide

### Colors

Edit CSS variables in `styles.css` (lines 9-18):

```css
:root {
    --primary-color: #2563eb;      /* Main blue color */
    --secondary-color: #10b981;    /* Green accent */
    --accent-color: #f59e0b;       /* Orange accent */
    /* ... more colors ... */
}
```

### Fonts

Current font: Segoe UI (system font)

To use Google Fonts:
1. Visit [Google Fonts](https://fonts.google.com)
2. Choose a font
3. Add the link in `<head>` of HTML
4. Update `body { font-family: ... }` in CSS

### Add More Rooms

Copy this block in the Rooms Section:

```html
<div class="room-card">
    <div class="room-image">
        <img src="your-image.jpg" alt="Room Type">
    </div>
    <div class="room-content">
        <h3>Room Name</h3>
        <p class="room-price">₹X,XXX <span>/month</span></p>
        <ul class="room-features">
            <li><i class="fas fa-bed"></i> Feature 1</li>
            <!-- Add more features -->
        </ul>
        <a href="#contact" class="btn btn-primary btn-block">Enquire Now</a>
    </div>
</div>
```

### Add More Facilities

Copy this block in the Facilities Section:

```html
<div class="facility-card">
    <div class="facility-icon">
        <i class="fas fa-icon-name"></i>
    </div>
    <h4>Facility Name</h4>
    <p>Description of the facility</p>
</div>
```

## 📱 Mobile Testing

Test your website on mobile:
1. Open Chrome DevTools (F12)
2. Click the device toolbar icon (Ctrl+Shift+M)
3. Select different devices to test

## 🌐 Hosting Options

### Free Hosting:
1. **GitHub Pages** (Recommended)
   - Create GitHub account
   - Upload files
   - Enable GitHub Pages
   - Get free URL: `username.github.io/repo-name`

2. **Netlify** - netlify.com
   - Drag and drop your folder
   - Get instant live site

3. **Vercel** - vercel.com
   - Connect GitHub repo
   - Auto-deploy on updates

### Custom Domain:
Buy a domain (₹500-1000/year):
- GoDaddy.com
- Namecheap.com
- Hostinger.in

## 💼 Pitch Template

When presenting to your brother:

**"Hi [Brother's Name],

I've built a professional website for your PG that will help you:
1. **Look more professional** - Students trust businesses with websites
2. **Get more enquiries** - Easy contact through WhatsApp and forms
3. **Save time** - Students can see rooms, prices, facilities online
4. **Stand out** - Most PGs don't have good websites

The website has:
- All room types with prices
- Facilities list
- Photo gallery
- Direct WhatsApp contact button
- Google Maps location
- Mobile-friendly design

Students can view everything and contact you instantly!"**

## 🔧 Troubleshooting

**Images not showing?**
- Check file paths are correct
- Ensure image files are in the right folder

**WhatsApp not opening?**
- Verify phone number format (no spaces, include country code)
- Test on a device with WhatsApp installed

**Mobile menu not working?**
- Ensure `script.js` is properly linked
- Check browser console for errors (F12)

## 📋 Before Going Live Checklist

- [ ] Update PG name
- [ ] Change phone number (all locations)
- [ ] Update email address
- [ ] Fix address and location
- [ ] Update room prices
- [ ] Replace all placeholder images
- [ ] Update Google Maps embed
- [ ] Test WhatsApp links
- [ ] Test contact form
- [ ] Test on mobile device
- [ ] Check all links work
- [ ] Update testimonials
- [ ] Add real facility information

## 📞 Key Features for Your Brother

1. **WhatsApp Integration** - Enquiries go directly to his WhatsApp
2. **Room Showcase** - Students can see all options with prices
3. **24/7 Available** - Website works even when he's busy
4. **Professional Image** - Builds trust with students and parents
5. **Easy Updates** - Simple to update prices, photos, or info

## 🎯 Marketing Tips

Once website is live:
1. Share link on WhatsApp status
2. Create Instagram/Facebook page for PG
3. Print QR code on banners near colleges
4. Share on local student groups
5. Add to Google Business profile

## 📈 Future Enhancements

Can be added later:
- Online booking system
- Payment gateway
- Availability calendar
- Chat bot
- Multiple language support
- Blog section for tips/news

## 📄 License

This project is created for educational purposes as part of the FUTURE_FS_03 internship task.
Feel free to modify and use it for your PG business!

## 💡 Key Learning Points

This project teaches you:
- ✅ Real-world client requirements
- ✅ Professional web design
- ✅ Responsive development
- ✅ User experience (UX)
- ✅ Business value of websites
- ✅ How to pitch to clients

## 🤝 Support

Need help customizing? Common changes:

**Change colors:** Edit CSS variables in `styles.css`
**Add sections:** Copy existing section structure
**Update content:** Edit text directly in `index.html`
**Change images:** Replace image URLs/paths

---

## 🎉 You've Got This!

Remember: This is a REAL website for a REAL business. Every student who finds accommodation through this site is a success story. Your brother's PG will look professional, be easy to find, and help students feel confident about choosing it.

**Built with ❤️ for students and PG owners**

---

**Need to customize something?** Check the relevant section above or search in the HTML file for the content you want to change. Everything is clearly labeled with comments!
