import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { skills } from '../../data/portfolio';

const Skills: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'tools', name: 'Tools' },
    { id: 'design', name: 'Design' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const CircularProgress: React.FC<{ skill: typeof skills[0]; delay: number }> = ({ skill, delay }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay }}
        className="relative group"
      >
        <div className="glass rounded-xl p-6 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:scale-105">
          <div className="flex flex-col items-center space-y-4">
            {/* Circular Progress */}
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-secondary-200 dark:text-secondary-700"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  className="text-primary-500"
                  initial={{ strokeDasharray, strokeDashoffset: circumference }}
                  animate={isIntersecting ? { strokeDashoffset } : {}}
                  transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
                  style={{ strokeDasharray }}
                />
              </svg>
              
              {/* Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isIntersecting ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: delay + 1 }}
                  className="text-lg font-bold text-secondary-900 dark:text-secondary-100"
                >
                  {skill.level}%
                </motion.span>
              </div>
            </div>

            {/* Skill Info */}
            <div className="text-center">
              <div className="text-2xl mb-2">{skill.icon}</div>
              <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">
                {skill.name}
              </h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 capitalize">
                {skill.category}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels across various technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'glass text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-primary-900/20'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <CircularProgress
              key={skill.name}
              skill={skill}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Frontend Excellence',
              description: 'Specialized in modern React ecosystem with TypeScript, creating responsive and interactive user interfaces.',
              icon: '🎨',
            },
            {
              title: 'Backend Proficiency',
              description: 'Strong foundation in Node.js, Python, and database technologies for building scalable server-side applications.',
              icon: '⚙️',
            },
            {
              title: 'Full Stack Mindset',
              description: 'Comprehensive understanding of the entire development lifecycle from conception to deployment.',
              icon: '🚀',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              className="glass rounded-xl p-6 text-center hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                {item.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;