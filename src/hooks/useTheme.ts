import { useState, useEffect } from 'react';
import { ThemeConfig } from '../types';

const defaultTheme: ThemeConfig = {
  primaryColor: 'blue',
  secondaryColor: 'gray',
  accentColor: 'red',
  fontFamily: 'Inter',
};

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('themeConfig');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('themeConfig', JSON.stringify(themeConfig));
    
    // Apply theme colors and fonts to CSS variables
    const root = document.documentElement;
    const colorMap = {
      blue: {
        50: '239 246 255',
        100: '219 234 254',
        200: '191 219 254',
        300: '147 197 253',
        400: '96 165 250',
        500: '59 130 246',
        600: '37 99 235',
        700: '29 78 216',
        800: '30 64 175',
        900: '30 58 138',
      },
      purple: {
        50: '250 245 255',
        100: '243 232 255',
        200: '233 213 255',
        300: '196 181 253',
        400: '167 139 250',
        500: '139 92 246',
        600: '124 58 237',
        700: '109 40 217',
        800: '91 33 182',
        900: '76 29 149',
      },
      green: {
        50: '240 253 244',
        100: '220 252 231',
        200: '187 247 208',
        300: '134 239 172',
        400: '74 222 128',
        500: '34 197 94',
        600: '22 163 74',
        700: '21 128 61',
        800: '22 101 52',
        900: '20 83 45',
      },
      red: {
        50: '254 242 242',
        100: '254 226 226',
        200: '254 202 202',
        300: '252 165 165',
        400: '248 113 113',
        500: '239 68 68',
        600: '220 38 38',
        700: '185 28 28',
        800: '153 27 27',
        900: '127 29 29',
      },
    };

    const primaryColors = colorMap[themeConfig.primaryColor as keyof typeof colorMap] || colorMap.blue;
    Object.entries(primaryColors).forEach(([shade, value]) => {
      root.style.setProperty(`--primary-${shade}`, value);
    });

    // Apply font family
    root.style.setProperty('--font-family', themeConfig.fontFamily);
    document.body.style.fontFamily = `${themeConfig.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;
  }, [themeConfig]);

  const toggleTheme = () => setIsDark(!isDark);

  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    setThemeConfig(prev => ({ ...prev, ...config }));
  };

  return {
    isDark,
    themeConfig,
    toggleTheme,
    updateThemeConfig,
  };
};