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
        .wave-rect {
          fill: #df5f3e;
        }
      `}</style>
      <rect x="0" width="10" rx="5" className="wave-rect">
        <animate attributeName="height" values="40;16;40" dur="1s" begin="0ms" repeatCount="indefinite" />
        <animate attributeName="y" values="20;32;20" dur="1s" begin="0ms" repeatCount="indefinite" />
      </rect>
      <rect x="17" width="10" rx="5" className="wave-rect">
        <animate attributeName="height" values="60;24;60" dur="1s" begin="100ms" repeatCount="indefinite" />
        <animate attributeName="y" values="10;28;10" dur="1s" begin="100ms" repeatCount="indefinite" />
      </rect>
      <rect x="34" width="10" rx="5" className="wave-rect">
        <animate attributeName="height" values="80;32;80" dur="1s" begin="200ms" repeatCount="indefinite" />
        <animate attributeName="y" values="0;24;0" dur="1s" begin="200ms" repeatCount="indefinite" />
      </rect>
      <rect x="51" width="10" rx="5" className="wave-rect">
        <animate attributeName="height" values="60;24;60" dur="1s" begin="300ms" repeatCount="indefinite" />
        <animate attributeName="y" values="10;28;10" dur="1s" begin="300ms" repeatCount="indefinite" />
      </rect>
      <rect x="68" width="10" rx="5" className="wave-rect">
        <animate attributeName="height" values="40;16;40" dur="1s" begin="400ms" repeatCount="indefinite" />
        <animate attributeName="y" values="20;32;20" dur="1s" begin="400ms" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

export default Wave;
