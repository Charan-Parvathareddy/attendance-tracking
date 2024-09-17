"use client";
import { CardStack } from "../ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Real-time Reporting and Analytics",
   
    content: (
      <p>
       Managers gain instant access to <Highlight>attendance</Highlight> data, enabling quick decision-making with<Highlight>visualized reports</Highlight>, absence summaries, and detailed employee timelines.
      </p>
    ),
  },
  {
    id: 1,
    name: "Customizable Leave Management",
  
    content: (
      <p>
       Empower employees to request<Highlight>leave</Highlight> and <Highlight>track</Highlight> their time off with a <Highlight>user-friendly</Highlight> interface that automatically calculates remaining leave balance.
      </p>
    ),
  },
  {
    id: 2,
    name: "Notifications and Alerts",
    content: (
      <p>
        Ensure no one misses a
            beat with <Highlight>automated notifications</Highlight> for shift reminders, missed
            check-ins, or leave <Highlight>approval updates</Highlight>.
      </p>
    ),
  },
  {
    id: 3,
    name: "Seamless Integration",
    content: (
      <p>
        Sync <Highlight>effortlessly</Highlight> with your
            existing HR systems and <Highlight>productivity</Highlight> tools to create a unified
            workflow experience.
      </p>
    ),
  },
];


