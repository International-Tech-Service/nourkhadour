import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-surface">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass p-12 md:p-16 rounded-3xl glow text-center relative overflow-hidden"
        >
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-6"
            >
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Work <span className="gradient-text">Together</span>
            </h2>

            <p className="text-text-tertiary text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Have a project in mind? Looking for a developer who combines technical expertise with business
              understanding? Let's create something amazing together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-4 text-lg inline-flex items-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get In Touch</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <a href="mailto:nournh95@gmail.com">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline px-8 py-4 text-lg"
                >
                  nournh95@gmail.com
                </motion.button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">26+</div>
                <div className="text-text-tertiary text-sm">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">3+</div>
                <div className="text-text-tertiary text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <div className="text-text-tertiary text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
