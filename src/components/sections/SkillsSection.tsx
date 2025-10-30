import { motion } from 'framer-motion';
import { Smartphone, Globe, Server, Database, Palette, Shield } from 'lucide-react';
import SkillsBackground from '../ui/SkillsBackground';

const skillCategories = [
  {
    title: 'Mobile Development',
    icon: Smartphone,
    color: 'from-purple-600 to-purple-400',
    skills: ['Flutter', 'Dart', 'Firebase', 'Supabase', 'SQLite', 'Provider', 'GetX'],
  },
  {
    title: 'Frontend Development',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  },
  {
    title: 'Backend Development',
    icon: Server,
    color: 'from-purple-600 to-blue-500',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST API', 'Socket.IO'],
  },
  {
    title: 'Database & Tools',
    icon: Database,
    color: 'from-purple-400 to-purple-600',
    skills: ['Supabase', 'Firebase', 'PostgreSQL', 'SQLite', 'Redis', 'Docker'],
  },
  {
    title: 'Design & Animation',
    icon: Palette,
    color: 'from-pink-500 to-purple-500',
    skills: ['Three.js', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    title: 'Other Skills',
    icon: Shield,
    color: 'from-blue-500 to-purple-600',
    skills: ['Python', 'Cybersecurity', 'Linux', 'Git', 'Data Analysis'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Animated Background */}
      <SkillsBackground />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-text-tertiary text-lg max-w-2xl mx-auto">
            A comprehensive tech stack spanning mobile, web, and backend development
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-6 rounded-2xl glow-hover perspective group cursor-pointer"
            >
              {/* Icon Header */}
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`p-3 bg-gradient-to-br ${category.color} rounded-xl`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-text-primary">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 text-sm bg-surface text-purple-400 rounded-lg border border-purple-600/30 hover:border-purple-600/60 hover:bg-purple-600/10 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Glow Effect on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
