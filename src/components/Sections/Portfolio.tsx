import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Filter } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { projects } from '../../data/portfolio';

const Portfolio: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const ProjectCard: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl glass hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.05 }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex space-x-2">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  <Github className="w-5 h-5 text-white" />
                </motion.a>
              )}
              <motion.button
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-primary-600/80 backdrop-blur-sm rounded-full hover:bg-primary-600 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {project.title}
          </h3>
          <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
            {project.category}
          </span>
        </div>
        
        <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 rounded-full text-xs font-medium">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="portfolio" className="py-20 bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            A showcase of my recent projects and creative solutions across various domains and technologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            <span className="text-secondary-600 dark:text-secondary-400 font-medium">Filter by:</span>
          </div>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                activeFilter === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'glass text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-primary-900/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 z-50 glass backdrop-blur-md rounded-2xl overflow-hidden"
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                      {selectedProject.title}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProject(null)}
                      className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Image */}
                      <div className="space-y-4">
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full h-64 lg:h-80 object-cover rounded-lg"
                        />
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                          {selectedProject.demoUrl && (
                            <motion.a
                              href={selectedProject.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
                            >
                              <ExternalLink className="w-5 h-5" />
                              <span>Live Demo</span>
                            </motion.a>
                          )}
                          {selectedProject.githubUrl && (
                            <motion.a
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 px-6 py-3 glass border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
                            >
                              <Github className="w-5 h-5" />
                              <span>Source Code</span>
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                            Project Description
                          </h4>
                          <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                            {selectedProject.description}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                            Category
                          </h4>
                          <span className="px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg font-medium">
                            {selectedProject.category}
                          </span>
                        </div>

                        {selectedProject.featured && (
                          <div className="p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg border border-primary-200 dark:border-primary-700">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                Featured Project
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;