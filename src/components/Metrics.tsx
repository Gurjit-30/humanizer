import { Progress } from "@/components/ui/progress";

export function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-4/5"></div>
    </div>
  );
}

interface MetricsProps {
  text: string;
  score?: number;
}

export function Metrics({ text, score }: MetricsProps) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(words / 225);

  return (
    <div className="flex flex-wrap items-center gap-6 py-4 px-1 border-t border-slate-100 mt-2">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Word Count</span>
        <span className="text-sm font-bold text-slate-700">{words}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Reading Time</span>
        <span className="text-sm font-bold text-slate-700">{readingTime} min</span>
      </div>
      {score !== undefined && (
        <div className="flex flex-col flex-1 min-w-[120px]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Humanity Score</span>
            <span className="text-xs font-bold text-slate-700">{score}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${
                score > 80 ? 'bg-emerald-500' : score > 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
