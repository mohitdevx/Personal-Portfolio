import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  RiSunLine,
  RiMoonLine,
  RiCloseLine,
  RiMenu4Line,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { NAV_LINKS } from '../data/portfolioData';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync dark class on mount/change
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Scrollspy active section detection on home page
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['about', 'work'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('about');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const toggleTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const nextIsDark = !isDark;

    const applyThemeChange = () => {
      setIsDark(nextIsDark);
      const root = document.documentElement;
      if (nextIsDark) {
        root.classList.add('dark');
        root.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    };

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

      const transition = (
        document as unknown as {
          startViewTransition: (cb: () => void) => { ready: Promise<void> };
        }
      ).startViewTransition(() => {
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

  const getHref = (linkHref: string) => {
    if (linkHref.startsWith('#')) {
      return location.pathname === '/' ? linkHref : `/${linkHref}`;
    }
    return linkHref;
  };

  const isLinkActive = (link: { name: string; href: string }) => {
    if (link.href === '/blog' || link.name.toLowerCase() === 'blog') {
      return location.pathname.startsWith('/blog');
    }
    if (location.pathname === '/') {
      if (link.href === '#about' && activeSection === 'about') return true;
      if (link.href === '#work' && activeSection === 'work') return true;
    }
    return false;
  };

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
          <Link
            to="/"
            aria-label="Home"
            className="relative flex items-center justify-center w-5 h-5 outline-none group"
          >
            <img
              src="/logo-dark.svg"
              alt="mohitdevx logo dark"
              width="20"
              height="20"
              className={`absolute inset-0 w-5 h-5 transition-all duration-300 transform group-hover:scale-105 ${
                isDark
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-90 -rotate-12 pointer-events-none'
              }`}
            />
            <img
              src="/logo-light.svg"
              alt="mohitdevx logo light"
              width="20"
              height="20"
              className={`absolute inset-0 w-5 h-5 transition-all duration-300 transform group-hover:scale-105 ${
                !isDark
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-90 rotate-12 pointer-events-none'
              }`}
            />
          </Link>

          {/* Navlinks: Desktop */}
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const targetHref = getHref(link.href);
              const isExternalOrAnchor = targetHref.includes('#');
              const active = isLinkActive(link);

              const linkClass = `relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 ${
                active
                  ? 'text-light-main dark:text-main font-semibold'
                  : isDark
                    ? 'text-muted hover:text-main hover:bg-white/[0.06]'
                    : 'text-light-muted hover:text-light-main hover:bg-black/[0.04]'
              }`;

              const underlineElement = active ? (
                <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-secondary rounded-full" />
              ) : null;

              return isExternalOrAnchor ? (
                <a
                  key={link.name}
                  href={targetHref}
                  className={linkClass}
                >
                  <span>{link.name}</span>
                  {underlineElement}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={targetHref}
                  className={linkClass}
                >
                  <span>{link.name}</span>
                  {underlineElement}
                </Link>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'bg-white/[0.05] text-muted hover:text-main hover:bg-white/[0.1] border border-white/[0.08]'
                  : 'bg-black/[0.04] text-light-muted hover:text-light-main hover:bg-black/[0.08] border border-black/[0.06]'
              }`}
            >
              <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
                <RiSunLine
                  className={`text-sm text-secondary absolute transition-all duration-300 transform ${
                    isDark
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
                  }`}
                />
                <RiMoonLine
                  className={`text-sm text-secondary absolute transition-all duration-300 transform ${
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
              className={`sm:hidden flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/[0.05] text-main border border-white/[0.08]'
                  : 'bg-black/[0.04] text-light-main border border-black/[0.06]'
              }`}
            >
              {isMobileMenuOpen ? (
                <RiCloseLine className="text-base" />
              ) : (
                <RiMenu4Line className="text-base" />
              )}
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
              {NAV_LINKS.map((link) => {
                const targetHref = getHref(link.href);
                const isExternalOrAnchor = targetHref.includes('#');
                const active = isLinkActive(link);

                const mobileClass = `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'text-secondary bg-secondary/10 font-semibold border-l-2 border-secondary'
                    : isDark
                      ? 'text-muted hover:text-main hover:bg-white/[0.06]'
                      : 'text-light-muted hover:text-light-main hover:bg-black/[0.04]'
                }`;

                return isExternalOrAnchor ? (
                  <a
                    key={link.name}
                    href={targetHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileClass}
                  >
                    <span>{link.name}</span>
                    <RiArrowRightSLine className="text-sm opacity-40" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={targetHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileClass}
                  >
                    <span>{link.name}</span>
                    <RiArrowRightSLine className="text-sm opacity-40" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
