import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Shield, Tag } from 'lucide-react';
import { getProject } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  if (project.nda) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom max-w-4xl">
          <Link to="/projects" className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 rounded-3xl text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-6">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-text-tertiary text-lg mb-8">
              This project is protected under a Non-Disclosure Agreement (NDA).
            </p>
            <p className="text-text-secondary mb-6">
              While I can't share detailed information about this project, it represents work done for a client
              requiring confidentiality. The project involved:
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-600/30"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-text-tertiary">
              For more information about my work and capabilities, please{' '}
              <Link to="/contact" className="text-purple-400 hover:text-purple-300 underline">
                get in touch
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom max-w-5xl">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-4 py-1.5 bg-purple-600/20 text-purple-400 rounded-full border border-purple-600/30 text-sm font-semibold">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-4 py-1.5 bg-green-600/20 text-green-400 rounded-full border border-green-600/30 text-sm font-semibold">
                Featured Project
              </span>
            )}
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">{project.title}</h1>

          <p className="text-xl text-text-secondary leading-relaxed mb-8">{project.description}</p>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Live Site</span>
              </a>
            )}
            {(project.githubUrl || project.gitlabUrl) && (
              <a
                href={project.githubUrl || project.gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl overflow-hidden mb-12 aspect-video flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-purple-600/10"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📱</div>
            <p className="text-text-tertiary">Project Screenshot</p>
            <p className="text-sm text-text-tertiary mt-2">Image coming soon</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-6">
                Project <span className="gradient-text">Overview</span>
              </h2>
              <p className="text-text-secondary leading-relaxed text-lg">{project.longDescription}</p>
            </motion.section>

            {/* Key Features */}
            {project.highlights && project.highlights.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass p-8 rounded-2xl"
              >
                <h2 className="text-3xl font-bold mb-6">
                  Key <span className="gradient-text">Features</span>
                </h2>
                <ul className="space-y-4">
                  {project.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-6 h-6 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-400 text-sm">✓</span>
                      </div>
                      <span className="text-text-secondary">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Tech Stack Details */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-6">
                Technologies <span className="gradient-text">Used</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.tech.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="glass p-4 rounded-xl text-center border border-purple-600/30 hover:border-purple-600/60 transition-colors"
                  >
                    <Tag className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-text-primary">{tech}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass p-6 rounded-2xl sticky top-24"
            >
              <h3 className="text-xl font-bold mb-6">Project Info</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-text-tertiary text-sm mb-1">
                    <Tag className="w-4 h-4" />
                    <span>Category</span>
                  </div>
                  <p className="text-text-primary font-semibold">{project.category}</p>
                </div>

                {project.liveUrl && (
                  <div>
                    <div className="flex items-center space-x-2 text-text-tertiary text-sm mb-1">
                      <ExternalLink className="w-4 h-4" />
                      <span>Live URL</span>
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm break-all"
                    >
                      {project.liveUrl}
                    </a>
                  </div>
                )}

                {(project.githubUrl || project.gitlabUrl) && (
                  <div>
                    <div className="flex items-center space-x-2 text-text-tertiary text-sm mb-1">
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </div>
                    <a
                      href={project.githubUrl || project.gitlabUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm"
                    >
                      View Repository
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link to="/contact" className="w-full btn-primary block text-center">
                  Discuss Similar Project
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            More <span className="gradient-text">Projects</span>
          </h2>
          <div className="text-center">
            <Link to="/projects">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-outline">
                View All Projects
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
