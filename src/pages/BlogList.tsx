import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { getBlogPosts } from '../data/blogLoader';
import { RiArrowRightLine, RiTimeLine, RiCalendarLine } from 'react-icons/ri';

const BlogList: React.FC = () => {
  const posts = useMemo(() => getBlogPosts(), []);

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-20 font-poppins animate-in fade-in duration-300">
      <SectionHeader
        title="Writing & Notes"
        description="Deep dives on application security, distributed systems, and real-world engineering."
        badge={`${posts.length} article${posts.length === 1 ? '' : 's'}`}
      />

      {/* Blog List Summary Cards */}
      <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group py-6 first:pt-0 last:pb-0 transition-all"
          >
            <Link to={`/blog/${post.slug}`} className="block">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
                <h2 className="text-base sm:text-lg font-semibold text-light-main dark:text-main group-hover:text-secondary transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-light-muted dark:text-muted font-mono flex-shrink-0">
                  <span className="inline-flex items-center gap-1">
                    <RiCalendarLine className="text-[11px]" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <RiTimeLine className="text-[11px]" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-light-muted dark:text-muted leading-relaxed mb-3">
                {post.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/[0.025] dark:bg-white/[0.03] text-light-muted dark:text-muted border border-black/[0.04] dark:border-white/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs text-secondary font-medium group-hover:translate-x-1 transition-transform">
                  <span>Read full post</span>
                  <RiArrowRightLine className="text-xs" />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
