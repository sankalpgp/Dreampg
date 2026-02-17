# 🚀 Deploy Dream Living PG to Vercel

## Quick Deployment Steps

### Step 1: Create Vercel Account
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Sign up with **GitHub** (recommended) or email

### Step 2: Install Vercel CLI (Optional but recommended)
Open terminal and run:
```bash
npm install -g vercel
```

### Step 3: Deploy Your Website

#### Method A: Using Vercel CLI (Easiest)

1. **Login to Vercel**
```bash
vercel login
```

2. **Deploy the website**
```bash
vercel
```

3. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? **Your account name**
   - Link to existing project? **No**
   - What's your project's name? **dream-living-pg** (or any name)
   - In which directory is your code? **./** (just press Enter)
   - Want to override settings? **No**

4. **Your site is live!** 🎉
   - You'll get a URL like: `https://dream-living-pg.vercel.app`

5. **For production deployment:**
```bash
vercel --prod
```

#### Method B: Using Vercel Dashboard (No CLI needed)

1. **Go to** https://vercel.com/new

2. **Import Git Repository:**
   - If your project is on GitHub: Connect your repository
   - Otherwise, use **Import Project** option

3. **Or Deploy from Local:**
   - Install Vercel CLI: `npm install -g vercel`
   - Run: `vercel` in your project folder
   - Follow prompts

4. **Project Settings:**
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: **.**
   - Install Command: `npm install`

5. **Click "Deploy"**

### Step 4: Configure Environment Variables

After deployment, add your email credentials:

1. Go to your project dashboard on Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:
   ```
   EMAIL_USER=dreamliving@gmail.com
   EMAIL_PASS=your-app-password
   NOTIFICATION_EMAIL=dreamliving@gmail.com
   WHATSAPP_NUMBER=8530301810
   ```
4. Click **"Save"**
5. **Redeploy** your site for changes to take effect

## 🌐 Your Live URLs

After deployment, you'll get:

- **Main Website**: `https://dream-living-pg.vercel.app`
- **Admin Panel**: `https://dream-living-pg.vercel.app/admin.html`
- **API**: `https://dream-living-pg.vercel.app/api/contact`

## 📝 Important Notes

### Limitations on Vercel Free Tier:
- ❌ **Cannot save enquiries to files** (serverless functions are stateless)
- ✅ **Email notifications will work** (configure environment variables)
- ✅ **WhatsApp integration will work** (already set up)

### Recommended: Connect a Database

For saving enquiries permanently, you have two options:

#### Option 1: Use Google Sheets (Easiest)
I can help you integrate Google Sheets to save enquiries

#### Option 2: Use MongoDB Atlas (Free)
Add a MongoDB database to store enquiries:
1. Create free account at https://mongodb.com/cloud/atlas
2. Get connection string
3. I'll update the code to use MongoDB

Would you like me to set up either of these?

## 🎨 Custom Domain (Optional)

1. **Buy a domain** (GoDaddy, Namecheap, etc.)
   - Example: `dreamlivingpg.com`

2. **In Vercel Dashboard:**
   - Go to **Settings** → **Domains**
   - Click **"Add"**
   - Enter your domain
   - Follow DNS instructions

3. **Wait 24-48 hours** for DNS propagation

## 🧪 Testing Your Live Site

After deployment:

1. ✅ Visit your Vercel URL
2. ✅ Test the contact form
3. ✅ Check if WhatsApp links work
4. ✅ Try the admin panel
5. ✅ Test on mobile device

## 🔄 Updating Your Live Site

Whenever you make changes:

**Method 1: Using CLI**
```bash
vercel --prod
```

**Method 2: Using Git (if connected)**
- Just push to GitHub
- Vercel auto-deploys

**Method 3: Using Dashboard**
- Go to Vercel dashboard
- Click **"Redeploy"**

## ⚡ Quick Commands

```bash
# Login to Vercel
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel list

# View logs
vercel logs

# Open project in browser
vercel open
```

## 🛠️ Troubleshooting

### "Command not found: vercel"
Install Vercel CLI: `npm install -g vercel`

### Email not working
- Add environment variables in Vercel dashboard
- Redeploy after adding variables

### Form not submitting
- Check browser console for errors
- Verify API endpoint is correct
- Test the API directly: `https://your-site.vercel.app/api/health`

### Site not updating
- Clear browser cache
- Wait a few minutes (can take up to 5 min)
- Redeploy from Vercel dashboard

## 📊 Monitor Your Site

In Vercel Dashboard you can see:
- ✅ Number of visitors
- ✅ Page load times
- ✅ Error logs
- ✅ Deployment history

## 🔐 Security Tips

1. **Never commit .env file** (already in .gitignore)
2. **Use environment variables** for sensitive data
3. **Enable Analytics** in Vercel dashboard
4. **Add custom domain** with SSL (automatic on Vercel)

## 💰 Pricing

**Vercel Free Tier includes:**
- Unlimited websites
- Automatic SSL/HTTPS
- Global CDN
- 100GB bandwidth/month
- Perfect for your PG website!

## 🎓 For Your Internship Submission

After deployment, submit:

1. **Live Website URL**: `https://dream-living-pg.vercel.app`
2. **GitHub Repository**: (if you pushed to GitHub)
3. **Admin Panel URL**: `https://dream-living-pg.vercel.app/admin.html`
4. **Project Demo**: Show the working contact form

---

## 🚀 Ready to Deploy?

Just run this command in your terminal:

```bash
vercel
```

And follow the prompts! Your website will be live in 2-3 minutes! 🎉

Need help with database integration or custom domain? Let me know!
