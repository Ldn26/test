import React from "react";

interface StatsCardProps {
  title: string;
  stat: number | string  | undefined;
  icon: React.ReactNode;
  iconBg?: string; // background color for icon circle
  iconColor?: string; // color of the icon
  footer?: React.ReactNode; // optional footer (like sparkline or % change)
}

function StatsCard({
  title,
  stat,
  icon,
  iconBg = "bg-gray-100",
  iconColor = "text-gray-600",
  footer,
}: StatsCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] p-5 min-w-[220px] h-[160px]">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="text-gray-600 font-medium text-sm">{title}</div>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl border ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>

      {/* Stat Number */}
      <div className="mt-4">
        <h2 className="text-3xl font-semibold text-gray-900">{stat}</h2>
      </div>

      {/* Optional Footer */}
      {footer && <div className="text-xs text-gray-400 mt-1">{footer}</div>}
    </div>
  );
}

export default StatsCard;
