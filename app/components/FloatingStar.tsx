interface FloatingStarProps {
  size?: number;
  responsiveSize?: number;
  fill?: string;
  className?: string;
}

export default function FloatingStar({
  size = 128,
  responsiveSize = 128,
  fill = "#F5DEDA",
  className = "",
}: FloatingStarProps) {
  return (
    <div data-aos="fade-up" className={`w-fit pointer-events-none ${className}`} aria-hidden="true">
      <div className="w-fit">
        <svg
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="star-svg animate-spin-slow"
          style={
            {
              "--star-size-sm": `${responsiveSize}px`,
              "--star-size-lg": `${size}px`,
            } as React.CSSProperties
          }
        >
          <path
            d="M128 128C69.8695 84.3471 58.1305 84.3471 0 128C43.6529 69.8695 43.6529 58.1305 0 0C58.1305 43.6529 69.8695 43.6529 128 0C84.3471 58.1305 84.3471 69.8695 128 128Z"
            fill={fill}
          />
        </svg>
      </div>
    </div>
  );
}
