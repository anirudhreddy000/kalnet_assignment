import { Target, Layers, ListTodo, Clock, FileText, AlertTriangle, ChevronRight, RefreshCw, CheckCircle2, Table as TableIcon } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

export default function ResultPanel({ result, originalIdea, onReAnalyze, isLoading }: any) {
  const [editMode, setEditMode] = useState(false);
  const [editedIdea, setEditedIdea] = useState(originalIdea);

  const scoreColor = 
    result.clarityScore >= 80 ? 'text-green-500' : 
    result.clarityScore >= 50 ? 'text-amber-500' : 'text-red-500';

  const handleReAnalyze = () => {
    onReAnalyze(editedIdea);
    setEditMode(false);
  };

  return (
    <div className="w-full space-y-8 pb-12">
      {/* Top Banner: Simplified Version & Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200/50 flex flex-col justify-center transform transition hover:scale-[1.01]">
          <div className="flex items-center gap-3 mb-4 text-indigo-100">
            <SparklesIcon size={20} className="animate-pulse" />
            <span className="font-bold tracking-widest uppercase text-xs opacity-90">The Refined Vision</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold leading-relaxed text-indigo-50">
            {result.simplifiedVersion}
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center ring-1 ring-slate-200 hover:ring-indigo-100 transition-all">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Clarity Score</div>
          <div className={`text-7xl font-black mb-4 ${scoreColor} drop-shadow-sm`}>
            {result.clarityScore}
          </div>
          <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-2xl w-full">
            {result.scoreDisclaimer}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Structured Plan */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/40 ring-1 ring-slate-200">
            <h4 className="flex items-center gap-3 text-2xl font-black text-slate-800 mb-8 pb-4 border-b border-slate-100">
              <Layers className="text-indigo-500" size={28} /> Structured Components
            </h4>
            
            <div className="space-y-6">
              <PlanSection icon={<Target />} title="Core Goal" content={result.structuredPlan.goal} bgColor="bg-blue-50/70" iconColor="text-blue-600" />
              <PlanSection icon={<FileText />} title="Method / Approach" content={result.structuredPlan.method} bgColor="bg-purple-50/70" iconColor="text-purple-600" />
              
              <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100/50 hover:shadow-md hover:shadow-indigo-100/50 transition-all">
                <h5 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-lg">
                  <ListTodo size={20} className="text-indigo-600" /> Key Steps
                </h5>
                <ul className="space-y-3">
                  {result.structuredPlan.steps.map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 bg-white/60 p-3 rounded-xl ring-1 ring-indigo-50">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-black shadow-sm mt-0.5">{i+1}</span>
                      <span className="leading-relaxed font-medium mt-0.5">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <PlanSection icon={<Clock />} title="Timeline" content={result.structuredPlan.timeline} bgColor="bg-amber-50/70" iconColor="text-amber-600" />
            </div>
          </div>
        </div>

        {/* Right Column: Missing Elements */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/40 ring-1 ring-rose-100 bg-gradient-to-b from-white to-rose-50/20">
            <h4 className="flex items-center gap-3 text-2xl font-black text-slate-800 mb-6 border-b border-rose-100 pb-4">
              <AlertTriangle className="text-rose-500" size={28} /> Growth Areas
            </h4>
            {result.missingElements && result.missingElements.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {result.missingElements.map((el: any, i: number) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-md transition-all">
                    <div className="font-bold text-rose-800 text-sm mb-2 uppercase tracking-wide">{el.category}</div>
                    <div className="text-slate-600 text-sm leading-relaxed">{el.description}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={32} />
                <div className="font-bold text-emerald-800">You're all set!</div>
                <div className="text-emerald-600 text-sm mt-1">Your plan is incredibly structured with no major gaps.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plan of Action */}
      <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/40 ring-1 ring-emerald-100 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <h4 className="flex items-center gap-3 text-2xl font-black mb-6">
          <CheckCircle2 className="text-emerald-100" size={28} /> Plan of Action
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.actionableSteps.map((step: string, i: number) => (
            <li key={i} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex-shrink-0 mt-0.5 bg-white text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                {i + 1}
              </div>
              <span className="text-sm font-medium leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Comparison Table */}
      {result.comparisonTable && result.comparisonTable.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/40 ring-1 ring-slate-200">
          <h4 className="flex items-center gap-3 text-2xl font-black text-slate-800 mb-6 pb-4 border-b border-slate-100">
            <TableIcon className="text-indigo-500" size={28} /> Before vs After
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider rounded-tl-xl border-b border-slate-200 w-1/4">Aspect</th>
                  <th className="p-4 bg-slate-50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-200 w-3/8">Your Original Idea</th>
                  <th className="p-4 bg-slate-50 text-indigo-600 font-bold uppercase text-xs tracking-wider rounded-tr-xl border-b border-slate-200 w-3/8">Structured Version</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.comparisonTable.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 align-top font-bold text-sm text-slate-700">{row.aspect}</td>
                    <td className="p-4 align-top text-sm text-slate-500 leading-relaxed italic border-r border-slate-50">{row.before}</td>
                    <td className="p-4 align-top text-sm text-indigo-900 font-medium leading-relaxed bg-indigo-50/30">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Iteration Layer */}
      <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <RefreshCw size={120} className="animate-spin-slow" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1 w-full">
            <h4 className="text-2xl font-black text-white mb-2">Iterate and Improve</h4>
            <p className="text-sm text-slate-400 mb-6">Modify your original idea based on the growth areas above to score higher and get an even tighter plan.</p>
            {editMode ? (
              <div className="space-y-4 max-w-4xl">
                <textarea 
                  className="w-full text-base p-5 rounded-2xl bg-white/10 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  rows={4}
                  value={editedIdea}
                  onChange={(e) => setEditedIdea(e.target.value)}
                  disabled={isLoading}
                />
                <div className="flex gap-4">
                  <button 
                    onClick={handleReAnalyze}
                    disabled={isLoading}
                    className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-95"
                  >
                    {isLoading ? <RefreshCw size={18} className="animate-spin" /> : <RefreshCw size={18} />} 
                    {isLoading ? 'Processing...' : 'Re-Analyze Plan'}
                  </button>
                  <button onClick={() => setEditMode(false)} className="px-6 py-3 text-slate-300 hover:bg-white/10 rounded-xl text-sm font-bold transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-white/5 rounded-2xl text-slate-300 border border-white/10 flex justify-between items-center group/edit cursor-text max-w-4xl" onClick={() => setEditMode(true)}>
                <span className="truncate pr-4 text-sm font-medium">{editedIdea}</span>
                <button 
                  className="px-5 py-2 bg-white text-slate-900 font-bold rounded-xl text-xs opacity-0 group-hover/edit:opacity-100 transition-all shadow-lg hover:bg-indigo-50"
                >
                  Edit Input
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanSection({ icon, title, content, bgColor, iconColor }: any) {
  return (
    <div className={clsx("p-6 rounded-2xl border border-white hover:shadow-md transition-shadow", bgColor)}>
      <h5 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-lg">
        <span className={iconColor}>{icon && <icon.type size={20} />}</span> {title}
      </h5>
      <p className="text-slate-700 text-base leading-relaxed pl-7 font-medium">{content}</p>
    </div>
  );
}

function SparklesIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
}
