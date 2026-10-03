import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import H4xBackground from './components/H4xBackground';
import CursorLine from './components/CursorLine';

// Code-split blog views so main landing page remains ultra-lightweight
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const LoadingFallback: React.FC = () => (
  <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-40 pb-20 text-center text-xs font-mono text-light-muted dark:text-muted animate-pulse">
    Loading...
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen flex flex-col justify-between">
        <ScrollToTop />
        <H4xBackground />
        <CursorLine />
        <Navbar />
        <main className="relative z-10 flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;