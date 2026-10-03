import React from 'react';
import { RiArrowUpLine } from 'react-icons/ri';
import { SOCIAL_LINKS } from '../data/portfolioData';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="max-w-3xl mx-auto px-6 sm:px-8 pt-8 pb-16 font-poppins">
      <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-light-muted dark:text-muted">
        {/* Dynamic Year and Username */}
        <div className="flex items-center gap-1.5 font-mono">
          <span>&copy;</span>
          <span>{currentYear}</span>
          <span className="text-light-main dark:text-main font-medium">
            mohitdevx
          </span>
        </div>

        {/* Links and Scroll to Top */}
        <div className="flex items-center gap-4 sm:gap-5 text-xs">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-secondary transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <RiArrowUpLine className="text-xs" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
