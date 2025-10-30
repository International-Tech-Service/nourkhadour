# Nour Khadour - Portfolio Website

An elite, animation-rich portfolio website showcasing 26+ projects across mobile, web, and full-stack development. Built with modern technologies and featuring heavy animations, 3D graphics, and professional design.

## ✨ Features

- 🎨 **Black & Purple Theme** - Professional dark theme with purple accents
- 🎬 **Heavy Animations** - GSAP, Framer Motion, and Three.js animations throughout
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🚀 **High Performance** - Optimized for speed with code splitting and lazy loading
- 🔍 **SEO Optimized** - Meta tags, sitemap, and semantic HTML
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation
- 🎯 **Custom Cursor** - Interactive custom cursor for desktop (heavy animation mode)
- 📊 **26+ Projects** - Comprehensive project showcase with filtering and search
- 📝 **Contact Form** - Validated contact form with React Hook Form and Zod
- 🌐 **GitLab Integration** - Links to public repositories (NDA-protected private projects)

## 🛠️ Tech Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 5** - Build tool and dev server

### Animation
- **GSAP 3.12** with ScrollTrigger - Scroll-based animations
- **Framer Motion 11** - React animations and page transitions
- **Three.js + React Three Fiber** - 3D graphics for hero section

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS
- **Tailwind Animate** - Animation utilities
- **Radix UI** - Accessible component primitives

### Routing & Forms
- **React Router DOM 7** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Utilities
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants
- **clsx + tailwind-merge** - Conditional styling

## 📁 Project Structure

```
portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   ├── Footer.tsx           # Footer with links
│   │   │   └── Layout.tsx           # Main layout wrapper
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Hero with 3D background
│   │   │   ├── AboutSection.tsx     # About with animated stats
│   │   │   ├── SkillsSection.tsx    # Skills with tech cards
│   │   │   ├── ExperienceSection.tsx # Timeline
│   │   │   ├── FeaturedProjects.tsx  # Featured projects
│   │   │   └── ContactCTA.tsx       # Contact CTA
│   │   └── ui/
│   │       ├── CustomCursor.tsx     # Custom cursor
│   │       └── ScrollToTop.tsx      # Scroll to top button
│   ├── data/
│   │   └── projects.ts              # All 26+ projects data
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── pages/
│   │   ├── Home.tsx                 # Home page (all sections)
│   │   ├── Projects.tsx             # Projects with filtering
│   │   ├── ProjectDetail.tsx        # Project case study
│   │   ├── Blog.tsx                 # Blog listing
│   │   ├── BlogPost.tsx             # Individual blog post
│   │   ├── About.tsx                # About page
│   │   └── Contact.tsx              # Contact form
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📄 Pages

### Home (`/`)
Complete portfolio homepage featuring:
- Animated hero section with Three.js 3D sphere
- About section with animated counters
- Skills section with interactive tech cards
- Work experience timeline
- Featured projects showcase
- Contact CTA

### Projects (`/projects`)
- All 26+ projects displayed in grid
- Filter by category (Mobile, Web, Full-Stack, Desktop, Other)
- Search by name, description, or technology
- Real-time results count
- NDA indicators for private projects
- Links to live demos and source code (where available)

### Project Detail (`/projects/:id`)
Individual project case studies with:
- Full description
- Tech stack breakdown
- Key features and highlights
- Links to live demo, source code, or NDA notice

### Contact (`/contact`)
Professional contact page featuring:
- Validated contact form (React Hook Form + Zod)
- Contact information cards
- Availability status
- Social links (GitLab, International Tech Service)

### Blog (`/blog`)
Blog listing page (template ready for content)

### About (`/about`)
Extended about page (template ready for content)

## 🎨 Color Palette

### Backgrounds
- Primary: `#0a0a0a`
- Secondary: `#121212`
- Surface: `#1a1a1a`, `#242424`

### Purple Accents
- Purple 400: `#c084fc`
- Purple 500: `#a855f7`
- Purple 600: `#9333ea`
- Purple Glow: `rgba(139, 92, 246, 0.3)`

### Text
- Primary: `#ffffff`
- Secondary: `#e5e5e5`
- Tertiary: `#a3a3a3`

## 🎬 Animation Features

### GSAP Animations
- Scroll-triggered section animations
- Parallax effects
- Timeline-based sequences
- Stagger animations

### Framer Motion
- Page transitions
- Component animations
- Hover effects
- Gesture animations

### Three.js
- Animated 3D sphere in hero
- Floating particles
- Auto-rotating scene
- Responsive canvas

### Custom Animations
- Custom cursor with trailing effect
- Animated gradient text
- Glow effects on hover
- Loading spinners
- Number counters

## 📊 Projects Data

All projects are defined in `src/data/projects.ts` with the following structure:

```typescript
{
  id: string,
  title: string,
  description: string,
  longDescription: string,
  tech: string[],
  category: 'Mobile' | 'Web' | 'Full-Stack' | 'Desktop' | 'Other',
  featured: boolean,
  nda: boolean,
  liveUrl?: string,
  githubUrl?: string,
  gitlabUrl?: string,
  images?: string[],
  highlights?: string[]
}
```

## 🔧 Customization

### Adding Projects
Edit `src/data/projects.ts` and add your project to the array:

```typescript
{
  id: 'my-project',
  title: 'My Project',
  description: 'Short description',
  longDescription: 'Detailed description',
  tech: ['React', 'Node.js'],
  category: 'Web',
  featured: true,
  nda: false,
  liveUrl: 'https://example.com',
  highlights: ['Feature 1', 'Feature 2']
}
```

### Changing Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  background: {
    DEFAULT: '#0a0a0a',  // Change this
  },
  purple: {
    600: '#9333ea',  // And this
  }
}
```

### Adding Blog Posts
Blog system is template-ready. To add MDX support:
1. Install MDX dependencies (already in package.json)
2. Create blog posts in a `content/` directory
3. Update Blog.tsx and BlogPost.tsx to load MDX content

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub/GitLab
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting
```

## 📈 Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Code Splitting**: Automatic via Vite
- **Lazy Loading**: Images and components

## 🔒 Security

- No sensitive data in frontend code
- Environment variables for API keys (if needed)
- Content Security Policy headers
- HTTPS enforced in production

## 📝 License

© 2024 Nour Khadour. All rights reserved.

## 🤝 Contact

- **Email**: nournh95@gmail.com
- **Phone**: +963-9-54325875
- **GitLab**: https://gitlab.com/enn_kh
- **Company**: https://intertech.services
- **Location**: Damascus, Syria

---

**Built with** React, TypeScript, Vite, Tailwind CSS, GSAP, Framer Motion, and Three.js
