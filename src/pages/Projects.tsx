type Project = {
  title: string;
  year: string;
  summary: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
};

const PROJECTS: Project[] = [
  {
    title: 'LumiStream',
    year: '2026',
    summary:
      'A real-time telemetry pipeline built to test how Redis pub/sub handles high write volumes without dropping messages. Uses Dockerized worker services to ingest and broadcast event streams with minimal latency.',
    stack: ['TypeScript', 'Node.js', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/mohitdevx/lumistream',
  },
  {
    title: 'SOC System',
    year: '2026',
    summary:
      'A security monitoring dashboard I built to track vulnerabilities across my own containerized environments. It aggregates CVE advisory feeds, monitors open network ports, and flags misconfigurations before deployment.',
    stack: ['Python', 'React', 'Docker', 'PostgreSQL'],
    githubUrl: 'https://github.com/mohitdevx/soc-system',
  },
  {
    title: 'RAG Chatbot',
    year: '2026',
    summary:
      'An experiment with retrieval-augmented generation to search and chat with local technical documentation. Focuses on data privacy, local vector embeddings, and token-based authentication on the API layer.',
    stack: ['Python', 'FastAPI', 'React', 'MongoDB'],
    githubUrl: 'https://github.com/mohitdevx/RAG-Chatbot',
  },
  {
    title: 'API Rate Limiter & Gateway',
    year: '2025',
    summary:
      'A lightweight reverse proxy written in Go to dive deeper into networking and rate-limiting algorithms. Implements a distributed token-bucket strategy with Redis to protect upstream endpoints from burst traffic.',
    stack: ['Golang', 'Redis', 'Docker', 'Bash'],
    githubUrl: 'https://github.com/mohitdevx',
  },
];

const Projects = () => {
  return (
    <section
      id="work"
      className="scroll-mt-24 max-w-3xl mx-auto px-6 sm:px-8 py-8 sm:py-12 font-poppins"
    >
      {/* Section Header */}
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-light-main dark:text-main">
          Projects
        </h2>
        <span className="text-xs text-light-muted dark:text-muted">
          Things I&apos;ve built
        </span>
      </div>

      {/* Editorial Project List */}
      <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="group py-5 first:pt-0 last:pb-0 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
              <div className="flex items-baseline gap-2.5">
                <h3 className="text-base font-semibold text-light-main dark:text-main group-hover:text-secondary transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs text-light-muted dark:text-muted font-mono">
                  {project.year}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-light-muted dark:text-muted hover:text-secondary transition-colors"
                >
                  <span>Code</span>
                  <i className="ri-arrow-right-up-line text-xs" />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-light-muted dark:text-muted hover:text-secondary transition-colors"
                  >
                    <span>Demo</span>
                    <i className="ri-arrow-right-up-line text-xs" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-light-muted dark:text-muted leading-relaxed mb-3">
              {project.summary}
            </p>

            {/* Stack Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/[0.025] dark:bg-white/[0.03] text-light-muted dark:text-muted border border-black/[0.04] dark:border-white/[0.04]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
