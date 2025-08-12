import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Users } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { experiences } from '../../data/portfolio';

const About: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following best practices.',
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting beautiful and intuitive user interfaces that enhance user experience.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and cross-platform compatibility.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively with teams to deliver projects on time and exceed expectations.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            Passionate developer with a keen eye for design and a love for creating exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                Hi there! I'm Parth Rawat
              </h3>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed">
                I'm a passionate full-stack developer creating 
                digital solutions that make a difference. My journey began with a curiosity about 
                how things work on the web, and it has evolved into a career dedicated to crafting 
                exceptional user experiences.
              </p>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed">
                I specialize in modern web technologies including React, TypeScript, Node.js,spring-boot and 
                cloud platforms. When I'm not coding, you'll find me to learn new things or following my passion.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="glass rounded-lg p-4 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-300"
                >
                  <highlight.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
                  <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
              Career Journey
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500" />
              
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  className="relative pl-12 pb-8"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2 top-2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-secondary-900 shadow-lg" />
                  
                  {/* Content */}
                  <div className="glass rounded-lg p-6 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                        {experience.position}
                      </h4>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {experience.duration}
                      </span>
                    </div>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {experience.company}
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                      {experience.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;