import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';

const socialLinks = [
  {
    name: 'GitLab',
    href: 'https://gitlab.com/enn_kh',
    icon: ExternalLink,
    label: 'View my GitLab profile'
  },
  {
    name: 'Email',
    href: 'mailto:nournh95@gmail.com',
    icon: Mail,
    label: 'Send me an email'
  },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const techStack = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Framer Motion',
  'GSAP',
  'Three.js',
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Nour Khadour</h3>
            <p className="text-text-tertiary text-sm leading-relaxed">
              Full-Stack Developer & Tech Entrepreneur building innovative digital solutions.
              Founder of International Tech Service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-surface-secondary rounded-lg text-text-tertiary hover:text-purple-400 hover:bg-purple-600/20 transition-all duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-text-tertiary hover:text-purple-400 transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-purple-600 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-text-tertiary">
                <Mail size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:nournh95@gmail.com"
                  className="hover:text-purple-400 transition-colors"
                >
                  nournh95@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-text-tertiary">
                <Phone size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+963954325875"
                  className="hover:text-purple-400 transition-colors"
                >
                  +963-9-54325875
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-text-tertiary">
                <MapPin size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Damascus, Syria</span>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Built With</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 text-xs bg-surface-secondary text-purple-400 rounded-full border border-purple-600/30 hover:border-purple-600/60 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-tertiary text-sm flex items-center">
              © {new Date().getFullYear()} Nour Khadour. Crafted with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mx-1"
              >
                <Heart size={14} className="text-purple-500 fill-purple-500" />
              </motion.span>
              and code.
            </p>
            <div className="flex items-center space-x-4 text-sm text-text-tertiary">
              <a
                href="https://intertech.services"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                International Tech Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
