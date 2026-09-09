import type { ReactNode } from 'react';

type SectionHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
  action?: ReactNode;
  className?: string;
};

const SectionHeader = ({
  title,
  description,
  badge,
  action,
  className = '',
}: SectionHeaderProps) => {
  return (
    <div className={`mb-6 sm:mb-7 ${className}`.trim()}>
      {/* Heading Row with Vertically Centered White Line */}
      <div className="flex items-center gap-3.5">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-light-main dark:text-main flex-shrink-0">
          {title}
        </h2>

        {/* Medium-Thick White Line at the Vertical Center */}
        <div className="relative flex-1 h-[2px]">
          {/* Diffused glow blur */}
          <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-white via-white/40 to-transparent blur-[2px] opacity-60 dark:opacity-85" />
          {/* Core white line with smooth fade */}
          <div className="relative w-full h-[2px] bg-gradient-to-r from-black/25 via-black/10 to-transparent dark:from-white dark:via-white/70 dark:to-transparent rounded-full" />
        </div>

        {/* Right Badge or Action */}
        {badge && (
          <span className="text-xs font-mono text-light-muted dark:text-muted flex-shrink-0">
            {badge}
          </span>
        )}
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2 text-xs sm:text-sm text-light-muted dark:text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
