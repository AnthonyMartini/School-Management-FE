import { LucideProps } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange" | "red";
  tooltip?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
  tooltip,
}) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  const tooltipClasses = {
    blue: "bg-white border-blue-100 text-gray-900",
    green: "bg-white border-green-100 text-gray-900",
    purple: "bg-white border-purple-100 text-gray-900",
    orange: "bg-white border-orange-100 text-gray-900",
    red: "bg-white border-red-100 text-gray-900",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group relative overflow-visible cursor-help">
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            {title}
          </p>
          <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
          {trend && (
            <p
              className={`text-xs mt-1 font-bold ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}% from last month
            </p>
          )}
        </div>
        <div
          className={`${colorClasses[color]} p-4 rounded-2xl shadow-lg shadow-${color}-500/20`}
        >
          <Icon size={24} className="text-white" />
        </div>
      </div>

      {/* Interactive Tooltip */}
      {tooltip && (
        <div
          className={`absolute left-0 right-0 top-full mt-4 ${tooltipClasses[color]} rounded-3xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0 z-50 shadow-2xl border backdrop-blur-3xl bg-opacity-95`}
        >
          <div className="relative">
            <div className="space-y-3">{tooltip}</div>
            {/* Tooltip Arrow (Top) */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rotate-45 border-t border-l border-inherit"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
