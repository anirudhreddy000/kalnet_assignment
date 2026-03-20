import { Sparkles, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center border-b border-slate-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">
            Explain My Plan
          </h1>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Clarity Tool</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          View Source
        </a>
      </div>
    </header>
  );
}
