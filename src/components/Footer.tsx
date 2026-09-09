const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            href="https://github.com/mohitdevx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mohitdevx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1 hover:text-secondary transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <i className="ri-arrow-up-line text-xs" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
