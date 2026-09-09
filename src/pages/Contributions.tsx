import { useState, useEffect } from 'react';
import ContributionShooter from '../components/ContributionShooter';

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubEvent = {
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
};

const Contributions = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(119);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGitHubData = async () => {
      try {
        const contribRes = await fetch(
          'https://github-contributions-api.jogruber.de/v4/mohitdevx?y=last'
        );
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          if (isMounted && contribData.contributions) {
            setContributions(contribData.contributions);
            if (contribData.total?.lastYear) {
              setTotalContributions(contribData.total.lastYear);
            }
          }
        }
      } catch (err) {
        console.warn('Failed to load GitHub contribution graph:', err);
      }

      try {
        const eventsRes = await fetch(
          'https://api.github.com/users/mohitdevx/events?per_page=6'
        );
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          if (isMounted && Array.isArray(eventsData)) {
            setEvents(eventsData);
          }
        }
      } catch (err) {
        console.warn('Failed to load GitHub events:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo ago`;
  };

  // Group contributions into 53 columns (weeks of 7 days)
  const weeks: ContributionDay[][] = [];
  if (contributions.length > 0) {
    let currentWeek: ContributionDay[] = [];
    const firstDayIndex = new Date(contributions[0].date).getDay();

    for (let i = 0; i < firstDayIndex; i++) {
      currentWeek.push({ date: '', count: -1, level: 0 });
    }

    contributions.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: -1, level: 0 });
      }
      weeks.push(currentWeek);
    }
  }

  const getMonthLabel = (weekIndex: number) => {
    const week = weeks[weekIndex];
    if (!week) return null;
    const firstValidDay = week.find((d) => d.date);
    if (!firstValidDay) return null;
    const date = new Date(firstValidDay.date);
    if (date.getDate() <= 7) {
      return date.toLocaleDateString('en-US', { month: 'short' });
    }
    return null;
  };

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-secondary/35';
      case 2:
        return 'bg-secondary/60';
      case 3:
        return 'bg-secondary/85';
      case 4:
        return 'bg-secondary';
      default:
        return 'bg-black/[0.04] dark:bg-white/[0.05]';
    }
  };

  const renderEventAction = (event: GitHubEvent) => {
    const repoShortName = event.repo.name.replace('mohitdevx/', '');
    switch (event.type) {
      case 'PushEvent': {
        const firstMessage = event.payload.commits?.[0]?.message;
        return (
          <div className="flex-1 min-w-0">
            <span className="text-light-main dark:text-main font-medium">
              Pushed to {repoShortName}
            </span>
            {firstMessage && (
              <span className="text-light-muted dark:text-muted truncate block text-[11px]">
                {firstMessage}
              </span>
            )}
          </div>
        );
      }
      case 'CreateEvent':
        return (
          <div className="flex-1 min-w-0">
            <span className="text-light-main dark:text-main font-medium">
              Created {event.payload.ref_type || 'repo'}{' '}
              {event.payload.ref || repoShortName}
            </span>
          </div>
        );
      case 'ForkEvent':
        return (
          <div className="flex-1 min-w-0">
            <span className="text-light-main dark:text-main font-medium">
              Forked {repoShortName}
            </span>
          </div>
        );
      default:
        return (
          <div className="flex-1 min-w-0">
            <span className="text-light-main dark:text-main font-medium">
              Activity on {repoShortName}
            </span>
          </div>
        );
    }
  };

  return (
    <section
      id="contributions"
      className="max-w-3xl mx-auto px-6 sm:px-8 py-8 sm:py-12 font-poppins"
    >
      {/* Title */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-light-main dark:text-main">
          Contributions
        </h2>
        <a
          href="https://github.com/mohitdevx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-light-muted dark:text-muted hover:text-secondary flex items-center gap-1 transition-colors"
        >
          <span>github.com/mohitdevx</span>
          <i className="ri-arrow-right-up-line text-[10px]" />
        </a>
      </div>

      {/* 1. Compact Contribution Graph with Ambient Shooter */}
      <ContributionShooter
        weeks={weeks}
        totalContributions={totalContributions}
        hoveredDay={hoveredDay}
        setHoveredDay={setHoveredDay}
        formatDate={formatDate}
        getLevelClass={getLevelClass}
        getMonthLabel={getMonthLabel}
        loading={loading}
      />

      {/* 2. Compact Running Scrolling Recent Activity */}
      <div className="p-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="flex items-center justify-between mb-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-semibold text-light-main dark:text-main">
              Recent Activity
            </span>
          </div>
          <span className="text-[10px] text-light-muted dark:text-muted">
            Hover to pause
          </span>
        </div>

        {/* Small Container with Top & Bottom Mask Blur Fade */}
        <div className="relative h-[125px] overflow-hidden mask-fade-y">
          {loading && events.length === 0 ? (
            <div className="flex items-center justify-center h-full text-xs text-light-muted dark:text-muted">
              Syncing activity stream...
            </div>
          ) : events.length === 0 ? (
            <div className="flex items-center justify-center h-full text-xs text-light-muted dark:text-muted">
              No recent activity.
            </div>
          ) : (
            <div className="animate-vertical-scroll space-y-1.5 py-1 cursor-default">
              {/* Loop list twice for seamless infinite marquee scroll */}
              {[...events, ...events].map((event, idx) => {
                const repoUrl = `https://github.com/${event.repo.name}`;
                return (
                  <div
                    key={`${event.id}-${idx}`}
                    className="p-2 rounded-xl bg-black/[0.015] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] flex items-center justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      {renderEventAction(event)}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 text-[10px] text-light-muted dark:text-muted">
                      <span>{formatRelativeTime(event.created_at)}</span>
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary transition-colors p-1"
                        aria-label="View on GitHub"
                      >
                        <i className="ri-external-link-line text-xs" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contributions;
