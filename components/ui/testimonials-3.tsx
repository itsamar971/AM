import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "AM Studio's design system completely transformed our user flow. The new architecture directly contributed to a 40% bump in our quarterly revenue.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?fit=crop&w=100&h=100",
    name: "Naresh",
    role: "Founder",
    company: "kisankadukan",
  },
  {
    quote:
      "We obsess over design. Shipping with their UI components didn't just look beautiful—it drove our conversion rates up and scaled our revenue effortlessly.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=100&h=100",
    name: "Rahul Sharma",
    role: "CTO",
    company: "",
  },
  {
    quote:
      "The frontend overhaul was our best ROI decision this year, instantly unlocking new revenue streams.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=100&h=100",
    name: "Keshav Reddy",
    role: "Partner",
    company: "Venture Capital",
  },
];

function DecorIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-1 size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] stroke-1 stroke-zinc-500",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function QuoteIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <div className="mx-auto mt-20 md:mt-24 grid w-full max-w-6xl gap-12 md:grid-cols-3 md:gap-16">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          index={index}
          key={testimonial.name}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
  index: number;
}) {
  const { quote, name, role, company, image } = testimonial;

  return (
    <figure
      className={cn(
        "group relative flex flex-col justify-between gap-6 px-8 pt-8 pb-6 shadow-xs md:translate-y-[calc(3rem*var(--t-card-index))]",
        "dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
        className,
      )}
      style={
        {
          "--t-card-index": index,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="absolute -inset-y-4 -left-px w-px bg-[#333]" />
      <div className="absolute -inset-y-4 -right-px w-px bg-[#333]" />
      <div className="absolute -inset-x-4 -top-px h-px bg-[#333]" />
      <div className="absolute -right-4 -bottom-px -left-4 h-px bg-[#333]" />
      <DecorIcon />

      <blockquote className="flex gap-4">
        <QuoteIcon
          aria-hidden="true"
          className="size-6 shrink-0 stroke-1 text-zinc-500"
        />

        <p className="flex-1 font-normal text-base text-zinc-400 leading-relaxed">
          {quote}
        </p>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar className="size-10 rounded-full ring-2 ring-[#333] ring-offset-2 ring-offset-black transition-shadow group-hover:ring-[#f2efe6]/20 flex items-center justify-center bg-zinc-800">
          <AvatarFallback className="bg-transparent">
            <User className="size-5 text-zinc-400" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-medium text-[#f2efe6] text-sm not-italic">
            {name}
          </cite>
          <p className="text-zinc-500 text-xs">
            {role}{company && ", "}<span className="text-[#f2efe6]/80">{company}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
