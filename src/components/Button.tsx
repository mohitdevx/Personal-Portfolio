import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type BaseButtonProps = {
  children: ReactNode;
  icon?: string;
  endIcon?: string;
  variant?: 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = ({
  children,
  icon,
  endIcon,
  variant = 'outline',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'group inline-flex items-center justify-center gap-2 font-poppins font-medium rounded-xl transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }[size];

  const variantStyles = {
    outline:
      'border border-black/[0.1] dark:border-white/[0.12] bg-black/[0.02] dark:bg-white/[0.03] text-light-main dark:text-main hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:border-black/[0.2] dark:hover:border-white/[0.25]',
    ghost:
      'text-light-muted dark:text-muted hover:text-light-main dark:hover:text-main hover:bg-black/[0.05] dark:hover:bg-white/[0.06]',
    secondary:
      'bg-secondary text-white dark:text-primary hover:opacity-90 shadow-sm',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();

  const content = (
    <>
      {icon && (
        <i
          className={`${icon} text-base transition-transform duration-200 group-hover:scale-110`}
        />
      )}
      <span>{children}</span>
      {endIcon && (
        <i
          className={`${endIcon} text-xs text-light-muted dark:text-muted group-hover:text-light-main dark:group-hover:text-main transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
        />
      )}
    </>
  );

  if ('href' in props && props.href) {
    const {
      href,
      target = '_blank',
      rel = 'noopener noreferrer',
      ...linkProps
    } = props as ButtonAsLink;

    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        {...linkProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedClasses}
      {...(props as ButtonAsButton)}
    >
      {content}
    </button>
  );
};

export default Button;
