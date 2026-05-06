import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, Clock, CornerDownRight } from "lucide-react";

interface HistoryItem {
  id: string;
  original: string;
  humanized: string;
  timestamp: number;
}

interface HistoryProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function History({ items, onSelect }: HistoryProps) {
  if (items.length === 0) return null;

  return (
    <Card className="border-slate-200 shadow-sm mt-8">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <HistoryIcon className="h-4 w-4 text-slate-500" />
        <CardTitle className="text-sm font-semibold text-slate-700">Recent Humanizations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelect(item)}
            className="group cursor-pointer p-3 rounded-lg border border-slate-100 bg-white hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <CornerDownRight className="h-3 w-3 text-slate-300 group-hover:text-slate-900 transition-colors" />
            </div>
            <p className="text-xs text-slate-600 line-clamp-1 italic">
              "{item.original.slice(0, 60)}..."
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
