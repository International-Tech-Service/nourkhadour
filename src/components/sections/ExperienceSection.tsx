import { motion } from 'framer-motion';
import { Briefcase, Building2, TrendingUp, Code2, ExternalLink } from 'lucide-react';
import NeuralNetwork from '../ui/NeuralNetwork';

const experiences = [
  {
    company: 'Qanater Technologies',
    companyUrl: 'https://qanater-co.com',
    role: 'Senior Flutter Developer',
    previousRole: 'Technical Team Lead → Senior Flutter Developer',
    period: '2025 - Present (3+ months)',
    location: 'Damascus, Syria',
    icon: Code2,
    achievements: [
      'Led development of Syrian National Budgeting System',
      'Transitioned from Technical Team Lead to Senior Flutter Developer',
      'Built enterprise-grade Flutter applications',
      'Implemented complex state management solutions',
      'Collaborated with government stakeholders on critical infrastructure',
    ],
    current: true,
    highlight: true,
  },
  {
    company: 'International Tech Service',
    companyUrl: 'https://intertech.services',
    role: 'Founder & Lead Developer',
    period: '2022 - Present',
    location: 'Damascus, Syria',
    icon: Building2,
    achievements: [
      'Built tech startup from ground up',
      'Delivered 8+ Flutter mobile applications',
      'Developed 12+ responsive websites',
      'Increased client productivity by 25%',
      'Generated $10K revenue increase in 2023',
    ],
    current: true,
  },
  {
    company: 'Alfouad Money Transfer',
    role: 'General Manager',
    period: '2021 - Present',
    location: 'Damascus, Syria',
    icon: Briefcase,
    achievements: [
      'Managed team of 10 across 3 branches',
      'Increased operational efficiency by 20%',
      'Reduced costs by 15%',
      'Financial operations & compliance expertise',
      'Streamlined cross-branch communication',
    ],
    current: true,
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-surface/50 relative overflow-hidden">
      {/* Interactive Neural Network Background */}
      <NeuralNetwork />

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
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-text-tertiary text-lg max-w-2xl mx-auto">
            Dual expertise in software development and business management
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-purple-400 to-purple-600" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-background z-10" />

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-1/2 glass p-6 rounded-2xl glow-hover group ${
                  exp.highlight ? 'border-2 border-purple-600/50' : ''
                }`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-600/20 rounded-lg">
                        <exp.icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary group-hover:text-purple-400 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 font-semibold hover:text-purple-300 inline-flex items-center gap-1"
                          >
                            {exp.company}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <p className="text-purple-400 font-semibold">{exp.company}</p>
                        )}
                        {exp.previousRole && (
                          <p className="text-xs text-text-tertiary mt-1">{exp.previousRole}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {exp.current && (
                        <span className="px-3 py-1 text-xs bg-green-600/20 text-green-400 rounded-full border border-green-600/30">
                          Current
                        </span>
                      )}
                      {exp.highlight && (
                        <span className="px-3 py-1 text-xs bg-purple-600/20 text-purple-400 rounded-full border border-purple-600/30">
                          Latest
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Period & Location */}
                  <div className="flex flex-wrap gap-4 text-sm text-text-tertiary mb-4">
                    <span>📅 {exp.period}</span>
                    <span>📍 {exp.location}</span>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-2 text-text-secondary text-sm"
                      >
                        <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
