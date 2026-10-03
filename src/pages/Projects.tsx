import SectionHeader from '../components/SectionHeader';

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

const Projects = () => {
  return (
    <section
      id="work"
      className="scroll-mt-24 max-w-3xl mx-auto px-6 sm:px-8 py-8 sm:py-12 font-poppins"
    >
      <SectionHeader
        title="Projects"
        description="Production-grade systems, developer tools, and security-focused applications."
        badge="4 projects"
      />

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
