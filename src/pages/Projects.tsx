type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  icon: string;
};

const PROJECTS: Project[] = [
  {
    title: 'LumiStream',
    category: 'Full Stack & Telemetry',
    description:
      'High-throughput distributed event streaming platform built with Redis pub/sub, Dockerized worker microservices, and real-time visualization.',
    tags: ['TypeScript', 'Node.js', 'Redis', 'Docker', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mohitdevx/lumistream',
    liveUrl: '#',
    icon: 'ri-radar-line',
  },
  {
    title: 'Sentinel SOC',
    category: 'Cybersecurity',
    description:
      'Threat hunting and vulnerability monitoring system. Implements automated CVE alerts, container auditing, and zero-trust authentication policies.',
    tags: ['Python', 'React', 'Docker', 'PostgreSQL', 'Linux'],
    githubUrl: 'https://github.com/mohitdevx/soc-system',
    liveUrl: '#',
    icon: 'ri-shield-keyhole-line',
  },
  {
    title: 'Neural RAG',
    category: 'AI & Systems',
    description:
      'Enterprise semantic search knowledge engine with multi-tenant vector storage, cryptographic credential isolation, and clean RESTful endpoints.',
    tags: ['Python', 'FastAPI', 'React', 'MongoDB', 'Prisma'],
    githubUrl: 'https://github.com/mohitdevx/RAG-Chatbot',
    liveUrl: '#',
    icon: 'ri-brain-line',
  },
  {
    title: 'VaultGate',
    category: 'DevOps & Infrastructure',
    description:
      'Zero-trust API reverse proxy featuring distributed token-bucket rate limiting, TLS certificate automation, and granular security audit trails.',
    tags: ['Golang', 'Docker', 'Redis', 'PostgreSQL', 'Bash'],
    githubUrl: 'https://github.com/mohitdevx',
    liveUrl: '#',
    icon: 'ri-server-line',
  },
];

const Projects = () => {
  return (
    <section
      id="work"
      className="scroll-mt-24 max-w-3xl mx-auto px-6 sm:px-8 py-8 sm:py-12 font-poppins"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-light-main dark:text-main">
            Featured Projects
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-light-muted dark:text-muted">
            Production-grade systems, developer tools, and security-focused applications.
          </p>
        </div>
        <span className="text-[11px] text-light-muted dark:text-muted font-mono">
          4 projects
        </span>
      </div>

      {/* Projects 2-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            className="group p-4 sm:p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:border-secondary/40 dark:hover:border-secondary/40 hover:bg-black/[0.035] dark:hover:bg-white/[0.035] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Card Top: Icon & Category */}
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 group-hover:scale-105 transition-transform">
                  <i className={`${project.icon} text-base`} />
                </span>
                <span className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] text-light-muted dark:text-muted">
                  {project.category}
                </span>
              </div>

              {/* Title & Arrow */}
              <h3 className="text-base font-semibold text-light-main dark:text-main flex items-center gap-1 group-hover:text-secondary transition-colors">
                <span>{project.title}</span>
                <i className="ri-arrow-right-up-line text-sm text-light-muted dark:text-muted group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-sm text-light-muted dark:text-muted leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Bottom: Tags & Action Links */}
            <div className="mt-5 pt-3.5 border-t border-black/[0.04] dark:border-white/[0.04] space-y-3">
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/[0.025] dark:bg-white/[0.03] text-light-muted dark:text-muted border border-black/[0.04] dark:border-white/[0.04]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 text-xs font-medium">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-light-muted dark:text-muted hover:text-secondary transition-colors"
                >
                  <i className="ri-github-line text-sm" />
                  <span>Source</span>
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-light-muted dark:text-muted hover:text-secondary transition-colors"
                  >
                    <i className="ri-external-link-line text-sm" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
