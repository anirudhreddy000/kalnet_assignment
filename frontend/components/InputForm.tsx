'use client';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface InputFormProps {
  initialValue: string;
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

export default function InputForm({ initialValue, onSubmit, isLoading }: InputFormProps) {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-2 ring-1 ring-slate-900/5 flex flex-col">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. I want to start a YouTube channel and earn money quickly..."
            className="w-full h-40 p-4 text-lg bg-transparent border-0 focus:ring-0 resize-none outline-none text-slate-800 placeholder-slate-400"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center px-4 pb-2 pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">Explain My Plan AI</span>
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-xl transition-all shadow-sm shadow-indigo-200 hover:shadow-md hover:shadow-indigo-300 disabled:shadow-none active:scale-95"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              <span>{isLoading ? 'Structuring...' : 'Make it clear'}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
