# Deployment Guide

This guide will help you deploy your portfolio to various hosting platforms.

## 📦 Prerequisites

Before deploying, ensure:
- All content is finalized
- Project builds successfully: `npm run build`
- No TypeScript errors: `npm run build` passes
- All links are working
- Images are optimized

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration for Vite projects
- Automatic HTTPS
- Global CDN
- Excellent performance
- Free tier available
- Built-in analytics

**Steps:**

1. **Install Vercel CLI** (optional, for CLI deployment):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts:
   - Link to existing project or create new
   - Confirm project settings
   - Deploy!

3. **Deploy via GitHub** (Recommended):
   - Push your code to GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Elite portfolio"
     git branch -M main
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

4. **Configure Custom Domain** (Optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

**Environment Variables** (if needed in future):
- Go to Project Settings → Environment Variables
- Add any API keys or secrets

---

### Option 2: Netlify

**Why Netlify?**
- Easy drag-and-drop deployment
- Free SSL certificates
- Form handling (useful for contact form)
- Serverless functions support

**Steps:**

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy via Drag & Drop**:
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist/` folder
   - Your site is live!

3. **Deploy via Git** (Recommended):
   - Push code to GitHub (see Vercel steps)
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy"

4. **Configure Custom Domain**:
   - Go to Site settings → Domain management
   - Add custom domain
   - Update DNS records

---

### Option 3: GitHub Pages

**Why GitHub Pages?**
- Free hosting for public repositories
- Simple setup
- Good for personal sites

**Steps:**

1. **Install gh-pages package**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   Add to scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

   Add base URL:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
   ```

3. **Update vite.config.ts**:
   ```typescript
   export default defineConfig({
     base: '/YOUR_REPO_NAME/', // Add this line
     plugins: [react()],
     // ... rest of config
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages`
   - Save

---

### Option 4: Firebase Hosting

**Why Firebase?**
- Google infrastructure
- Free tier available
- Easy integration with Firebase services

**Steps:**

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```
   - Select or create project
   - Public directory: `dist`
   - Single-page app: Yes
   - GitHub Actions: Optional

4. **Build and Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

---

## 🔧 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally: `npm run preview`
- [ ] Update meta tags in `index.html`
- [ ] Add favicon (replace `public/vite.svg`)
- [ ] Add Open Graph image
- [ ] Test all links work
- [ ] Test contact form
- [ ] Verify all animations work
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Add Google Analytics (optional)
- [ ] Setup error tracking (optional)

---

## 📊 Analytics Setup (Optional)

### Vercel Analytics
1. Go to Project → Analytics
2. Enable Analytics
3. Free 100k events/month

### Google Analytics 4
1. Create GA4 property
2. Get Measurement ID
3. Add to `index.html`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

## 🔒 Security Headers

Already configured in `vercel.json` and `netlify.toml`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

---

## ⚡ Performance Optimization

**Before Deployment:**

1. **Optimize Images**:
   - Use WebP format
   - Compress images
   - Use appropriate sizes

2. **Code Splitting**:
   - Already handled by Vite
   - Lazy load routes if needed

3. **Bundle Analysis**:
   ```bash
   npm run build -- --mode analyze
   ```

4. **Lighthouse Audit**:
   - Run in Chrome DevTools
   - Aim for 90+ scores

---

## 🌐 Custom Domain Setup

### General Steps:
1. Purchase domain (Namecheap, GoDaddy, Google Domains)
2. Add domain to hosting platform
3. Update DNS records:
   - A record: Point to hosting IP
   - CNAME record: `www` to your domain
4. Wait for DNS propagation (up to 48 hours)

### Recommended Domains:
- `nourkhadour.com`
- `nourkhadour.dev`
- `nkdev.io`

---

## 🐛 Troubleshooting

### Build Fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf .vite`
- Check Node version: `node -v` (should be 18+)

### 404 on Refresh
- Ensure SPA redirect is configured
- Check `vercel.json` or `netlify.toml`

### Assets Not Loading
- Check base URL in `vite.config.ts`
- Verify asset paths are absolute

### Slow Performance
- Enable caching headers
- Use CDN
- Optimize images
- Check Lighthouse report

---

## 📝 Post-Deployment

1. **Test Everything**:
   - All pages load
   - All links work
   - Forms submit correctly
   - Animations run smoothly
   - Mobile experience is good

2. **Share Your Portfolio**:
   - LinkedIn
   - GitHub profile
   - Resume/CV
   - GitLab profile
   - Email signature

3. **Monitor**:
   - Setup uptime monitoring
   - Check analytics weekly
   - Review error logs

4. **Maintain**:
   - Add new projects regularly
   - Update experience section
   - Write blog posts
   - Keep dependencies updated

---

## 🎉 Congratulations!

Your portfolio is now live! Share it with the world:

- **Email**: nournh95@gmail.com
- **GitLab**: https://gitlab.com/enn_kh
- **Company**: https://intertech.services

---

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
