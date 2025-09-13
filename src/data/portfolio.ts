import { Project, Skill, Experience} from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'CHITRA | AI IMAGE GENERATOR',
    description: 'A full-stack website with HTML,CSS,JavaScript,Flask(for image generation), Node.js(as Backend) and MongoDB.Image generation is done by pre-trained model. Features include user authentication, history viewing, and Contact form.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Flask', 'Node.js', 'MongoDB', 'HTML','CSS','JavaScript','OAuth Authentication'],
    category: 'Full Stack',
    demoUrl: '/',
    githubUrl: 'https://github.com/ParthRawat1302/CHITRA-AI-IMAGE-GENERATOR',
    featured: false,
  },{
    id: '2',
    title: 'MauSam | Weather App',
    description: 'A full-stack website with React,TypeScript,TailwindCSS, Node.js(as Backend) and PostgreSQL(as Database).Live Weather is Fetching with the help of APIs. Features include user authentication, Weather Dashboard,Settings(include unit changes) and Contact form.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0sKR5dx_Y0aodiBZ4Ls2ZDxT5JLCZhbm8Q&s',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'PostgreSQL','OAuth Authentication'],
    category: 'Full Stack',
    demoUrl: 'https://weather-dashboard-b6kp.onrender.com/',
    githubUrl: 'https://github.com/ParthRawat1302/Weather-Dashboard',
    featured: true,
  }
];

export const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', level: 90, category: 'frontend', icon: '🔷' },
  { name: 'JavaScript', level: 95, category: 'frontend', icon: '🟨' },
  { name: 'Tailwind CSS', level: 92, category: 'frontend', icon: '🎨' },
  { name: 'Node.js', level: 88, category: 'backend', icon: '🟢' },
  { name: 'Python', level: 82, category: 'backend', icon: '🐍' },
  { name: 'MongoDB', level: 80, category: 'backend', icon: '🍃' },
  { name: 'REST APIs', level: 90, category: 'backend', icon: '🔗' },
  { name: 'Git', level: 92, category: 'tools', icon: '📝' },
  { name: 'Docker', level: 75, category: 'tools', icon: '🐳' },
  { name: 'UI/UX Design', level: 88, category: 'design', icon: '🎨' },
  { name: 'Figma', level: 85, category: 'design', icon: '🎯' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Internship-Zidio Development',
    position: 'Full Stack Developer',
    duration: 'July 2025 - Present',
    description: 'Lead development of enterprise web applications using React, TypeScript, and Spring-Boot as Backend.',
    technologies: ['React', 'Spring-Boot', 'MySQL', 'TypeScript'],
  }
];
