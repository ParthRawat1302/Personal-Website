import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Developer & UI/UX Designer';

  const downloadPDF = () => {
  const link = document.createElement('a');
  link.href = '/Resumes.pdf';  // Make sure case matches exact filename
  link.download = 'Resumes.pdf';  // Suggested file name on download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary-600 dark:text-primary-400 font-medium text-lg"
              >
                Hello, I'm
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-secondary-900 dark:text-secondary-100"
              >
                Parth <span className="gradient-text">Rawat</span>
              </motion.h1>
              
              <div className="h-16 flex items-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-400 font-medium"
                >
                  {typedText}
                  <span className="animate-pulse">|</span>
                </motion.p>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl leading-relaxed"
              >
              I create exceptional digital experiences by combining beautiful, user-friendly web design with robust software development. Passionate about building scalable and efficient solutions that solve real problems and bring innovative ideas to life.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                <span>Hire Me</span>
              </motion.button>

              <motion.button
                onClick={downloadPDF}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass border border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </motion.button>

            </motion.div>

            

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
{ number: '2+', label: 'Personal Projects' },
{ number: 'Learning', label: 'Years of Growth' },
{ number: '100%', label: 'Passion & Dedication' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/*Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Main Image Container */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative z-10 glass rounded-2xl p-4 backdrop-blur-sm"
              >
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Parth Rawat"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 glass rounded-full p-4 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-6 glass rounded-full p-3 backdrop-blur-sm"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-2 rounded-full glass hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-300"
        >
          <ChevronDown className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;