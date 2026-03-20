'use client';
import { useState } from 'react';
import axios from 'axios';
import InputForm from '@/components/InputForm';
import ResultPanel from '@/components/ResultPanel';
import Header from '@/components/Header';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (userIdea: string) => {
    if (!userIdea.trim()) return;
    setIdea(userIdea);
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', { plan: userIdea });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setIdea('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <Header />
      
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
        {!result && (
          <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                Bring clarity to your chaos.
              </h2>
              <p className="text-lg text-slate-600">
                Turn your vague ideas into structured, actionable plans in seconds using AI.
              </p>
            </div>
            
            <InputForm 
              initialValue={idea} 
              onSubmit={handleAnalyze} 
              isLoading={loading} 
            />
            
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                {error}
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-3xl font-bold">Your Structured Plan</h2>
              <button 
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Start Over
              </button>
            </div>
            
            <ResultPanel 
              result={result} 
              originalIdea={idea} 
              onReAnalyze={handleAnalyze} 
              isLoading={loading}
            />
          </div>
        )}
      </main>
    </div>
  );
}
