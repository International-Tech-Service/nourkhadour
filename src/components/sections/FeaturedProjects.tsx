import { motion } from 'framer-motion';
import { ExternalLink, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../../data/projects';

const featuredProjects = getFeaturedProjects();

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-padding">
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-text-tertiary text-lg max-w-2xl mx-auto mb-8">
            Showcasing my best work across mobile, web, and full-stack development
          </p>
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline"
            >
              View All 26+ Projects
            </motion.button>
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass p-6 rounded-2xl glow-hover group cursor-pointer"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-xs bg-purple-600/20 text-purple-400 rounded-full border border-purple-600/30">
                  {project.category}
                </span>
                {project.nda && (
                  <div className="flex items-center space-x-1 text-xs text-text-tertiary">
                    <Shield className="w-3 h-3" />
                    <span>NDA</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-text-primary group-hover:text-purple-400 transition-colors mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-text-tertiary text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-surface text-purple-400 rounded border border-purple-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 text-sm font-semibold"
                >
                  <span>View Live</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
