/**
 * Example resume data for a fresher — used by "Reset to example" button.
 */
import { ResumeData } from '@/types/resume';

export const exampleResume: ResumeData = {
  personal: {
    fullName: 'Aarav Sharma',
    jobTitle: 'Frontend Developer',
    email: 'aarav.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    portfolioUrl: 'https://aaravsharma.dev',
    linkedinUrl: 'https://linkedin.com/in/aaravsharma',
    githubUrl: 'https://github.com/aaravsharma',
  },
  summary:
    'Motivated frontend developer with hands-on experience in React, TypeScript, and modern web technologies. Passionate about building clean, accessible user interfaces and writing maintainable code.',
  experience: [
    {
      id: '1',
      company: 'TechStart Solutions',
      role: 'Frontend Developer Intern',
      location: 'Bangalore, India',
      startDate: 'Jun 2024',
      endDate: 'Dec 2024',
      isCurrent: false,
      bulletPoints: [
        'Built and maintained 5+ responsive web pages using React and Tailwind CSS, improving page load speed by 25%.',
        'Collaborated with a team of 4 developers to implement REST API integrations.',
        'Wrote unit tests using Jest, achieving 80% code coverage on critical modules.',
      ],
    },
  ],
  education: [
    {
      id: '1',
      schoolName: 'Indian Institute of Technology, Delhi',
      degree: 'B.Tech',
      fieldOfStudy: 'Computer Science & Engineering',
      startYear: '2020',
      endYear: '2024',
      grade: '8.5 CGPA',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'TaskFlow — Project Management App',
      link: 'https://github.com/aaravsharma/taskflow',
      techStack: 'React, TypeScript, Firebase, Tailwind CSS',
      bulletPoints: [
        'Designed and built a Kanban-style project management tool with drag-and-drop functionality.',
        'Implemented real-time collaboration using Firebase Realtime Database.',
        'Achieved 200+ GitHub stars within the first month of release.',
      ],
    },
    {
      id: '2',
      name: 'WeatherNow — Weather Dashboard',
      link: 'https://github.com/aaravsharma/weathernow',
      techStack: 'React, OpenWeather API, Chart.js',
      bulletPoints: [
        'Built a weather dashboard with 7-day forecasts and interactive charts.',
        'Integrated geolocation API for automatic location detection.',
      ],
    },
  ],
  skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Git', 'Node.js', 'REST APIs', 'Jest', 'Figma'],
  extras: {
    certifications: 'AWS Cloud Practitioner (2024)\nGoogle UX Design Certificate (2023)',
    languages: 'English (Fluent), Hindi (Native)',
    achievements: 'Winner, Smart India Hackathon 2023\nTop 5%, LeetCode (1800+ rating)',
  },
};

export const emptyResume: ResumeData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
  },
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: [],
  extras: {
    certifications: '',
    languages: '',
    achievements: '',
  },
};
