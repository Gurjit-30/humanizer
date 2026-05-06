import { ShieldCheck } from "lucide-react";

export function TrustBanner() {
  return (
    <div className="flex items-center justify-center gap-2 text-slate-400 py-4 mt-4 border-t border-slate-100">
      <ShieldCheck className="h-4 w-4 text-emerald-500/60" />
      <span className="text-[11px] font-medium uppercase tracking-wider">
        Privacy First: Your text is processed securely and is never stored on our servers.
      </span>
    </div>
  );
}
