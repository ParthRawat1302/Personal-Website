import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Type } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ isOpen, onClose }) => {
  const { themeConfig, updateThemeConfig } = useTheme();

  const colorOptions = [
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' },
  ];

  const fontOptions = [
    { name: 'Inter', value: 'Inter' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Poppins', value: 'Poppins' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 glass backdrop-blur-md border-l border-secondary-200 dark:border-secondary-700 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                    Theme Customizer
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Primary Color */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-3 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-500 mr-2" />
                  Primary Color
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateThemeConfig({ primaryColor: color.value })}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        themeConfig.primaryColor === color.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${color.color} mx-auto mb-2`} />
                      <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
                        {color.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-3 flex items-center">
                  <Type className="w-3 h-3 mr-2" />
                  Font Family
                </h3>
                <div className="space-y-2">
                  {fontOptions.map((font) => (
                    <motion.button
                      key={font.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateThemeConfig({ fontFamily: font.value })}
                      className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                        themeConfig.fontFamily === font.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600 text-secondary-700 dark:text-secondary-300'
                      }`}
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 rounded-lg glass border border-secondary-200 dark:border-secondary-700">
                <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                  Preview
                </h4>
                <div className="space-y-2">
                  <div className="h-2 bg-primary-500 rounded-full w-3/4" />
                  <div className="h-2 bg-secondary-300 dark:bg-secondary-600 rounded-full w-1/2" />
                  <div className="h-2 bg-accent-500 rounded-full w-2/3" />
                </div>
                <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-3">
                  Sample text with current theme settings
                </p>
              </div>

              {/* Reset Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateThemeConfig({
                  primaryColor: 'blue',
                  secondaryColor: 'gray',
                  accentColor: 'red',
                  fontFamily: 'Inter',
                })}
                className="w-full mt-6 p-3 rounded-lg border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
              >
                Reset to Default
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeCustomizer;