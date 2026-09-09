import type { IconType } from 'react-icons';
import SectionHeader from '../components/SectionHeader';
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

type TechItem = {
  name: string;
  Icon: IconType;
};

const ROW_ONE: TechItem[] = [
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

const ROW_TWO: TechItem[] = [
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

const TechStack = () => {
  return (
    <section
      id="tech-stack"
      className="max-w-3xl mx-auto px-6 sm:px-8 py-8 sm:py-12 font-poppins"
    >
      {/* Section Header */}
      <SectionHeader
        title="Tech Stack"
        description="Tools, languages, and technologies I use to build robust software."
        badge="Hover to pause"
      />

      {/* Marquee Wrapper with horizontal mask fade */}
      <div className="overflow-hidden mask-fade-x space-y-2.5 py-1">
        {/* Row 1 - Left Marquee */}
        <div className="animate-marquee-left flex gap-2.5">
          {[...ROW_ONE, ...ROW_ONE].map((tech, idx) => (
            <div
              key={`row1-${tech.name}-${idx}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:border-secondary/40 text-xs sm:text-sm font-medium text-light-main dark:text-main transition-colors select-none flex-shrink-0 cursor-default"
            >
              <tech.Icon className="text-secondary text-sm sm:text-base flex-shrink-0" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2 - Right Marquee */}
        <div className="animate-marquee-right flex gap-2.5">
          {[...ROW_TWO, ...ROW_TWO].map((tech, idx) => (
            <div
              key={`row2-${tech.name}-${idx}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:border-secondary/40 text-xs sm:text-sm font-medium text-light-main dark:text-main transition-colors select-none flex-shrink-0 cursor-default"
            >
              <tech.Icon className="text-secondary text-sm sm:text-base flex-shrink-0" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
