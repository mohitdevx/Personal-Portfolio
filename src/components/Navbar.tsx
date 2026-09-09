import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
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

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
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
        className={`pointer-events-auto relative w-full max-w-xl font-poppins rounded-full transition-all duration-300 backdrop-blur-xl border shadow-lg ${
          isDark
            ? 'bg-[#121215]/85 border-white/[0.08] text-main shadow-black/40'
            : 'bg-white/85 border-black/[0.06] text-light-main shadow-black/5'
        }`}
      >
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2">
          {/* Logo */}
          <a
            href="#"
            aria-label="Home"
            className="flex items-center outline-none"
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                isDark
                  ? 'bg-white/[0.05] text-secondary border border-white/[0.08]'
                  : 'bg-black/[0.04] text-secondary border border-black/[0.06]'
              }`}
            >
              <i className="ri-code-s-slash-line text-base font-semibold"></i>
            </div>
          </a>

          {/* Navlinks: Desktop */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 ${
                  isDark
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
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Switch Theme"
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'bg-white/[0.05] text-muted hover:text-main hover:bg-white/[0.1] border border-white/[0.08]'
                  : 'bg-black/[0.04] text-light-muted hover:text-light-main hover:bg-black/[0.08] border border-black/[0.06]'
              }`}
            >
              <i
                className={`text-sm transition-transform duration-300 hover:rotate-12 ${
                  isDark ? 'ri-sun-line text-secondary' : 'ri-moon-line text-secondary'
                }`}
              ></i>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/[0.05] text-main border border-white/[0.08]'
                  : 'bg-black/[0.04] text-light-main border border-black/[0.06]'
              }`}
            >
              <i
                className={`text-base ${
                  isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'
                }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Card */}
        {isMobileMenuOpen && (
          <div
            className={`sm:hidden absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border backdrop-blur-2xl shadow-xl transition-all duration-300 ${
              isDark
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
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isDark
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
