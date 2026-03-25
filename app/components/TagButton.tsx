import clsx from "clsx";

interface TagButtonProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'md' | 'sm';
}

export function TagButton({
  active = false,
  onClick,
  size = 'md',
  children,
  className = '',
}: TagButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-full font-sans-2 uppercase transition-colors",
        size === 'md' && 'px-4 py-2 text-xl',
        size === 'sm' && 'px-3 py-0.5 text-sm lg:text-base',
        active
          ? 'bg-primary text-contrast'
          : 'border border-contrast text-contrast hover:bg-contrast/10',
        className
      )}
    >
      {children}
    </button>
  );
}
