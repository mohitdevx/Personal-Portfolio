import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getBlogPostBySlug } from '../data/blogLoader';
import {
  RiArrowLeftLine,
  RiFileCopyLine,
  RiCheckLine,
} from 'react-icons/ri';

// Custom Pre/Code Block: Single clean surface with copy button & language label
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
      // ignore clipboard error
    }
  };

  return (
    <div className="relative my-6 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-[#0c0c0f] overflow-hidden">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02] text-xs font-mono text-zinc-400 select-none">
        <span className="text-[11px] lowercase tracking-wide text-zinc-400">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <RiCheckLine className="text-secondary text-xs" />
              <span className="text-secondary">copied</span>
            </>
          ) : (
            <>
              <RiFileCopyLine className="text-xs" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* Actual Pre/Code Body - Single seamless background */}
      <pre
        {...props}
        className="!m-0 !p-4 !bg-transparent !border-none !rounded-none overflow-x-auto text-[13px] font-mono leading-relaxed text-zinc-200"
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
      <div className="max-w-2xl mx-auto px-6 sm:px-8 pt-36 pb-20 font-poppins text-center">
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
    <article className="max-w-2xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-24 font-poppins animate-in fade-in duration-300">
      {/* Minimal Top Back Link */}
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

      {/* Minimal Bottom Footer Navigation */}
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
