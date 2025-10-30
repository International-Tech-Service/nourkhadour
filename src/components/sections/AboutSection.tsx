import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Briefcase, Code2, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Code2, label: 'Projects Completed', value: 26, suffix: '+' },
  { icon: Briefcase, label: 'Years Experience', value: 3, suffix: '+' },
  { icon: Users, label: 'Team Members', value: 10, suffix: '' },
  { icon: Award, label: 'Certifications', value: 7, suffix: '' },
];

// Animated Counter Component
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const duration = 2000; // 2 seconds

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold gradient-text">
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        '.about-text',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-surface/50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-text-tertiary text-lg max-w-2xl mx-auto">
            A passionate developer with a unique blend of technical expertise and business acumen
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl text-center glow-hover"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-600/20 rounded-xl">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-text-tertiary mt-2 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="about-text">
              <h3 className="text-3xl font-bold mb-4 gradient-text">
                Full-Stack Developer & Tech Entrepreneur
              </h3>
              <p className="text-text-secondary leading-relaxed">
                I'm Nour Khadour, a Full-Stack Developer and Tech Entrepreneur based in Damascus, Syria.
                I combine technical expertise with business leadership as the Founder of{' '}
                <a
                  href="https://intertech.services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                >
                  International Tech Service
                </a>
                , where we've delivered 8+ Flutter applications and 12+ responsive websites.
              </p>
            </div>

            <div className="about-text">
              <h4 className="text-xl font-semibold mb-3 text-purple-400">Dual Expertise</h4>
              <p className="text-text-secondary leading-relaxed">
                Beyond development, I serve as General Manager at Alfouad Money Transfer, leading a team of 10
                across 3 branches. This unique combination of technical skills and management experience allows
                me to bridge the gap between code and business strategy.
              </p>
            </div>

            <div className="about-text">
              <h4 className="text-xl font-semibold mb-3 text-purple-400">Education & Certifications</h4>
              <p className="text-text-secondary leading-relaxed">
                Currently pursuing a Bachelor of Science in IT Engineering with AI specialization at Arabic
                International University. I hold 7 professional certifications including Google Cybersecurity,
                Python Specialization, and Flutter Development.
              </p>
            </div>

            <div className="about-text">
              <h4 className="text-xl font-semibold mb-3 text-purple-400">Languages</h4>
              <div className="flex flex-wrap gap-3">
                {['Arabic (Native)', 'English (Fluent)', 'French (Proficient)'].map((lang) => (
                  <span
                    key={lang}
                    className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-600/30 text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image/Visual Side */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative glass p-8 rounded-3xl glow"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-surface rounded-xl">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-text-primary">Technical Excellence</h5>
                    <p className="text-sm text-text-tertiary">Flutter, React, Next.js, Vue.js</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-surface rounded-xl">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-text-primary">Business Leadership</h5>
                    <p className="text-sm text-text-tertiary">Team management, Operations</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-surface rounded-xl">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-text-primary">Continuous Learning</h5>
                    <p className="text-sm text-text-tertiary">7 Professional Certifications</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-surface rounded-xl">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-text-primary">Global Mindset</h5>
                    <p className="text-sm text-text-tertiary">Trilingual: Arabic, English, French</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
