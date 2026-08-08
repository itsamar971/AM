import { cn } from "@/lib/utils";

export function Wave({ className, style, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <style>{`
        @keyframes loading-ui-wave-svg {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }
        .wave-rect {
          fill: #df5f3e;
          transform-origin: center;
          animation: loading-ui-wave-svg 1s ease-in-out infinite;
        }
      `}</style>
      <rect x="0" y="20" width="10" height="40" rx="5" className="wave-rect" style={{ animationDelay: '0ms' }} />
      <rect x="17" y="10" width="10" height="60" rx="5" className="wave-rect" style={{ animationDelay: '100ms' }} />
      <rect x="34" y="0" width="10" height="80" rx="5" className="wave-rect" style={{ animationDelay: '200ms' }} />
      <rect x="51" y="10" width="10" height="60" rx="5" className="wave-rect" style={{ animationDelay: '300ms' }} />
      <rect x="68" y="20" width="10" height="40" rx="5" className="wave-rect" style={{ animationDelay: '400ms' }} />
    </svg>
  );
}

export default Wave;
