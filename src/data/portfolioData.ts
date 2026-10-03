import type { Project, TechItem, NavLink } from '../types';
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiGnubash,
  SiGo,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiLinux,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiPrisma,
  SiGithub,
  SiPostman,
  SiMysql,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

export const NAV_LINKS: NavLink[] = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Blog', href: '/blog' },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/mohitdevx',
  linkedin: 'https://linkedin.com/in/mohitdevx',
  resume: '/Mohit_Kumar_Resume.docx',
};

export const PROJECTS: Project[] = [
  {
    title: 'LumiStream',
    year: '2026',
    summary:
      'A synchronized video streaming platform that lets users host rooms and watch content together in real time. Features automated multi-resolution HLS transcoding via FFmpeg, WebSocket-based playback sync, and live room chat.',
    stack: ['TypeScript', 'React', 'Node.js', 'Socket.io', 'FFmpeg', 'PostgreSQL'],
    githubUrl: 'https://github.com/mohitdevx/lumistream',
  },
  {
    title: 'EduClinic',
    year: '2026',
    summary:
      'A full-stack campus platform built for BFGI to connect students with alumni. Features a public directory, real-time messaging and discussion forums, event ticketing, and an admin moderation dashboard.',
    stack: ['Next.js', 'React', 'Node.js', 'Socket.io', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/alumniconnect4/educlinic',
  },
  {
    title: 'RAG Chatbot',
    year: '2026',
    summary:
      'A fully offline retrieval-augmented generation chatbot to ingest and query custom documents with zero external API calls. Runs local Qwen-2.5 and BGE embeddings with Qdrant vector search, Redis caching, and SSE streaming.',
    stack: ['Python', 'FastAPI', 'React', 'Qdrant', 'Redis', 'MongoDB'],
    githubUrl: 'https://github.com/mohitdevx/RAG-Chatbot',
  },
  {
    title: 'VulScan',
    year: '2026',
    summary:
      'A static analysis (SAST) platform for JavaScript and TypeScript codebases. Combines Babel AST taint-flow analysis with local LLM triage to detect vulnerabilities, reduce false positives, and dispatch automated fix PRs.',
    stack: ['TypeScript', 'React', 'Node.js', 'Babel AST', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/mohitdevx/vul-scan',
  },
];

export const TECH_STACK_ROW_ONE: TechItem[] = [
  { name: 'Python', Icon: SiPython },
  { name: 'React', Icon: SiReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Docker', Icon: SiDocker },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'C++', Icon: SiCplusplus },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Redis', Icon: SiRedis },
  { name: 'Linux (Debian / Arch)', Icon: SiLinux },
  { name: 'Postman', Icon: SiPostman },
];

export const TECH_STACK_ROW_TWO: TechItem[] = [
  { name: 'Golang', Icon: SiGo },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'Prisma', Icon: SiPrisma },
  { name: 'Git & GitHub', Icon: SiGithub },
  { name: 'Bash', Icon: SiGnubash },
  { name: 'VS Code', Icon: VscVscode },
  { name: 'MySQL', Icon: SiMysql },
];
