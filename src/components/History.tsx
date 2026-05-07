import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History as HistoryIcon, Clock, CornerDownRight } from "lucide-react";

interface HistoryItem {
  id: string;
  original: string;
  humanized: string;
  timestamp: number;
  score?: number;
}

interface HistoryProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function History({ items, onSelect }: HistoryProps) {
  if (items.length === 0) return null;

  return (
    <Card className="border-slate-200 shadow-sm mt-8 bg-white/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-2 pb-3 border-b border-slate-50/50">
        <HistoryIcon className="h-4 w-4 text-slate-500" />
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Recent Humanizations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-50">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              className="group cursor-pointer p-4 hover:bg-white transition-all flex justify-between items-center"
            >
              <div className="space-y-1.5 overflow-hidden pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                    <Clock className="h-3 w-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 font-medium group-hover:text-slate-900 transition-colors">
                  {item.original}
                </p>
              </div>
              
              <div className="flex items-center gap-4 shrink-0">
                {item.score !== undefined && (
                  <div className="text-right">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter leading-none mb-0.5">Humanity</div>
                    <div className={`text-xs font-black leading-none ${
                      item.score > 80 ? 'text-emerald-500' : item.score > 60 ? 'text-amber-500' : 'text-rose-500'
                    }`}>
                      {item.score}%
                    </div>
                  </div>
                )}
                <CornerDownRight className="h-4 w-4 text-slate-200 group-hover:text-slate-900 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
