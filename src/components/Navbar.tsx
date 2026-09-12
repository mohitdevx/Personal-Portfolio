import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : document.documentElement.classList.contains('dark');
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const nextIsDark = !isDark;

    const applyThemeChange = () => {
      setIsDark(nextIsDark);
      if (nextIsDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    };

    // Use View Transitions API if supported and user has not requested reduced motion
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const rect = e?.currentTarget.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : 0;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as unknown as {
        startViewTransition: (cb: () => void) => { ready: Promise<void> };
      }).startViewTransition(() => {
        applyThemeChange();
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 480,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      applyThemeChange();
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <header className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto relative w-full max-w-xl font-poppins rounded-full transition-all duration-300 backdrop-blur-xl border shadow-lg ${isDark
          ? 'bg-[#121215]/85 border-white/[0.08] text-main shadow-black/40'
          : 'bg-white/85 border-black/[0.06] text-light-main shadow-black/5'
          }`}
      >
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2">
          {/* Logo with smooth cross-fade transition */}
          <a
            href="#"
            aria-label="Home"
            className="relative flex items-center justify-center w-5 h-5 outline-none group"
          >
            <img
              src="/logo-dark.svg"
              alt="mohitdevx logo dark"
              className={`absolute inset-0 w-5 h-5 transition-all duration-300 transform group-hover:scale-105 ${
                isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-12 pointer-events-none'
              }`}
            />
            <img
              src="/logo-light.svg"
              alt="mohitdevx logo light"
              className={`absolute inset-0 w-5 h-5 transition-all duration-300 transform group-hover:scale-105 ${
                !isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-12 pointer-events-none'
              }`}
            />
          </a>

          {/* Navlinks: Desktop */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 ${isDark
                  ? 'text-muted hover:text-main hover:bg-white/[0.06]'
                  : 'text-light-muted hover:text-light-main hover:bg-black/[0.04]'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5">
            {/* Theme Toggle Button with morphing icon animation */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Switch Theme"
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${isDark
                ? 'bg-white/[0.05] text-muted hover:text-main hover:bg-white/[0.1] border border-white/[0.08]'
                : 'bg-black/[0.04] text-light-muted hover:text-light-main hover:bg-black/[0.08] border border-black/[0.06]'
                }`}
            >
              <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
                <i
                  className={`ri-sun-line text-sm text-secondary absolute transition-all duration-300 transform ${
                    isDark
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
                  }`}
                />
                <i
                  className={`ri-moon-line text-sm text-secondary absolute transition-all duration-300 transform ${
                    !isDark
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 rotate-90 scale-50 pointer-events-none'
                  }`}
                />
              </div>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer ${isDark
                ? 'bg-white/[0.05] text-main border border-white/[0.08]'
                : 'bg-black/[0.04] text-light-main border border-black/[0.06]'
                }`}
            >
              <i
                className={`text-base ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'
                  }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Card */}
        {isMobileMenuOpen && (
          <div
            className={`sm:hidden absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border backdrop-blur-2xl shadow-xl transition-all duration-300 ${isDark
              ? 'bg-[#121215]/95 border-white/[0.08] shadow-black/60'
              : 'bg-white/95 border-black/[0.06] shadow-black/10'
              }`}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isDark
                    ? 'text-muted hover:text-main hover:bg-white/[0.06]'
                    : 'text-light-muted hover:text-light-main hover:bg-black/[0.04]'
                    }`}
                >
                  <span>{link.name}</span>
                  <i className="ri-arrow-right-s-line text-xs opacity-40"></i>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
