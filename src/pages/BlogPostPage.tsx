import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getBlogPostBySlug } from '../data/blogLoader';
import {
  RiArrowLeftLine,
  RiClipboardLine,
  RiCheckLine,
} from 'react-icons/ri';

// Sleek, Minimal Code Block Component
const CustomPre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({
  children,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  // Extract raw text and language from the inner code child if available
  let language = '';
  let rawCode = '';

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const className = (child.props as { className?: string }).className || '';
      const match = /language-(\w+)/.exec(className);
      if (match) {
        language = match[1];
      }
      const codeContent = (child.props as { children?: React.ReactNode }).children;
      if (typeof codeContent === 'string') {
        rawCode = codeContent;
      } else if (Array.isArray(codeContent)) {
        rawCode = codeContent.join('');
      }
    }
  });

  const handleCopy = async () => {
    try {
      if (rawCode) {
        await navigator.clipboard.writeText(rawCode.replace(/\n$/, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative group/code my-6 rounded-xl border border-black/[0.08] dark:border-white/[0.07] bg-black/[0.025] dark:bg-[#09090b] overflow-hidden">
      {/* Sleek Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-black/[0.04] dark:border-white/[0.04] bg-black/[0.015] dark:bg-white/[0.01] text-xs font-mono select-none">
        <span className="text-[11px] font-mono text-light-muted dark:text-muted">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          aria-label={copied ? "Copied" : "Copy code"}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
            copied
              ? 'text-secondary bg-secondary/10'
              : 'text-light-muted dark:text-muted hover:text-light-main dark:hover:text-main hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
          }`}
        >
          {copied ? (
            <>
              <RiCheckLine className="text-xs text-secondary" />
              <span className="text-[10px] text-secondary">Copied</span>
            </>
          ) : (
            <>
              <RiClipboardLine className="text-xs" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area with smooth horizontal scrolling & hidden scrollbar */}
      <pre
        {...props}
        className="!m-0 !p-4 sm:!p-5 !bg-transparent !border-none !rounded-none overflow-x-auto no-scrollbar text-[13px] sm:text-[13.5px] font-mono leading-relaxed"
      >
        {children}
      </pre>
    </div>
  );
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => {
    return slug ? getBlogPostBySlug(slug) : undefined;
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-36 pb-20 font-poppins text-center">
        <h1 className="text-xl font-semibold text-light-main dark:text-main mb-2">
          Post Not Found
        </h1>
        <p className="text-xs sm:text-sm text-light-muted dark:text-muted mb-6">
          The article you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-light-main dark:text-main bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] hover:border-secondary/40 transition-colors"
        >
          <RiArrowLeftLine className="text-sm" />
          <span>Back to all articles</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-24 font-poppins animate-in fade-in duration-300">
      {/* Top Back Link */}
      <div className="mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-light-muted dark:text-muted hover:text-light-main dark:hover:text-main transition-colors"
        >
          <RiArrowLeftLine className="text-xs" />
          <span>Writing</span>
        </Link>
      </div>

      {/* Clean Editorial Article Header */}
      <header className="mb-10 pb-8 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-light-muted dark:text-muted mb-3">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-light-main dark:text-main mb-3 leading-snug">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-light-muted dark:text-muted leading-relaxed mb-4">
          {post.subtitle}
        </p>

        {/* Minimal Understated Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/[0.025] dark:bg-white/[0.03] text-light-muted dark:text-muted border border-black/[0.04] dark:border-white/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Markdown Rendered Body */}
      <div className="prose-custom font-normal">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            pre: CustomPre,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Bottom Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs text-light-muted dark:text-muted hover:text-light-main dark:hover:text-main transition-colors cursor-pointer"
        >
          <RiArrowLeftLine className="text-xs" />
          <span>Back to writing</span>
        </button>
      </div>
    </article>
  );
};

export default BlogPostPage;
