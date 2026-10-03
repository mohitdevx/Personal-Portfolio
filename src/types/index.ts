import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

export interface Project {
  title: string;
  year: string;
  summary: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface TechItem {
  name: string;
  Icon: IconType;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: ReactNode;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload: {
    commits?: Array<{ message: string; sha: string }>;
    ref?: string;
    ref_type?: string;
    action?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  content: string;
}
