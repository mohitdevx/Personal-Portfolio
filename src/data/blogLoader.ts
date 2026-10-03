import type { BlogPost } from '../types';

interface Frontmatter {
  title?: string;
  subtitle?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  summary?: string;
}

const parseMarkdownFile = (
  raw: string
): { frontmatter: Frontmatter; content: string } => {
  const match = raw.match(/^---([\s\S]*?)---([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: raw.trim() };
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, string | string[]> = {};

  rawYaml.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) return;

    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();

    if (val.startsWith('[') && val.endsWith(']')) {
      const items = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      frontmatter[key] = items;
      return;
    }

    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    frontmatter[key] = val;
  });

  return {
    frontmatter: frontmatter as Frontmatter,
    content,
  };
};

// Eagerly import all .md files in the blogs folder
const blogModules = import.meta.glob<string>('/src/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const getBlogPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];

  for (const [path, rawText] of Object.entries(blogModules)) {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { frontmatter, content } = parseMarkdownFile(rawText);

    posts.push({
      id: slug,
      slug,
      title: frontmatter.title || 'Untitled Post',
      subtitle: frontmatter.subtitle || '',
      date: frontmatter.date || 'Recent',
      readTime: frontmatter.readTime || '5 min read',
      tags: frontmatter.tags || ['Security'],
      summary: frontmatter.summary || '',
      content,
    });
  }

  return posts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getBlogPosts();
  return posts.find((p) => p.slug === slug);
};
