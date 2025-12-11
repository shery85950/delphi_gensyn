import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { AI_MODELS } from '../constants';
import { AIModel, DemoStep } from '../types';
import { Button } from './ui/Button';
import { Check, TrendingUp, Trophy, ArrowRight, Loader2, Brain } from 'lucide-react';

const MOCK_CHART_DATA = [
  { v: 40 }, { v: 42 }, { v: 41 }, { v: 44 }, { v: 43 }, { v: 45 }, { v: 48 }, { v: 52 }, { v: 55 }
];

export const DemoSection: React.FC = () => {
  const [step, setStep] = useState<DemoStep>(DemoStep.SELECT);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [winner, setWinner] = useState<string | null>(null);

  // Reset progress when entering compete step
  useEffect(() => {
    if (step === DemoStep.COMPETE) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = { ...prev };
          let finishedCount = 0;
          let newWinner = null;
          
          AI_MODELS.forEach(m => {
            const current = prev[m.id] || 0;
            if (current >= 100) {
              finishedCount++;
              if (!newWinner) newWinner = m.id; // First to finish wins in this simple logic
              return;
            }
            // Random speed based on "winProbability" mock
            const speed = Math.random() * 3 + (m.winProbability * 2); 
            newProgress[m.id] = Math.min(100, current + speed);
          });

          if (finishedCount === AI_MODELS.length) {
            clearInterval(interval);
            setWinner(newWinner);
            setTimeout(() => setStep(DemoStep.REWARD), 1000);
          }
          return newProgress;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleModelSelect = (model: AIModel) => {
    if (step === DemoStep.SELECT) {
      setSelectedModel(model);
    }
  };

  const nextStep = () => {
    if (step === DemoStep.SELECT && selectedModel) setStep(DemoStep.INVEST);
    else if (step === DemoStep.INVEST) setStep(DemoStep.COMPETE);
  };

  const resetDemo = () => {
    setStep(DemoStep.SELECT);
    setSelectedModel(null);
    setProgress({});
    setWinner(null);
  };

  return (
    <section id="demo" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f24455] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.07] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            See How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Experience the full lifecycle of a prediction market in seconds. <br/>No risk, just simulation.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />
          {['Pick', 'Invest', 'Compete', 'Win'].map((label, idx) => (
            <div key={label} className="flex flex-col items-center gap-3 bg-[#050505] px-4 z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500
                ${step >= idx 
                  ? 'border-[#f24455] bg-[#f24455] text-white shadow-[0_0_15px_rgba(242,68,85,0.4)]' 
                  : 'border-neutral-800 bg-neutral-900 text-neutral-600'}`}>
                {idx + 1}
              </div>
              <span className={`text-xs font-medium uppercase tracking-wider ${step >= idx ? 'text-white' : 'text-neutral-600'}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Game Container */}
        <div className="glass-panel rounded-3xl p-6 md:p-12 min-h-[500px] flex flex-col items-center justify-center transition-all duration-500 max-w-5xl mx-auto border-t border-white/10 shadow-2xl shadow-black/50">
          
          {/* STEP 1: SELECT */}
          {step === DemoStep.SELECT && (
            <div className="w-full animate-fadeIn">
              <h3 className="text-2xl font-bold mb-3 text-center">Choose a Model to Back</h3>
              <p className="text-neutral-400 text-center mb-10">Analyze the initial stats and trust your gut.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {AI_MODELS.map((model) => (
                  <div 
                    key={model.id}
                    onClick={() => handleModelSelect(model)}
                    className={`cursor-pointer group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                      ${selectedModel?.id === model.id 
                        ? 'border-[#f24455] bg-[#f24455]/10 shadow-[0_0_30px_rgba(242,68,85,0.15)]' 
                        : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg transition-colors ${selectedModel?.id === model.id ? 'bg-[#f24455] text-white' : 'bg-white/10 text-neutral-400 group-hover:text-white'}`}>
                        <Brain className="w-6 h-6" />
                      </div>
                      {selectedModel?.id === model.id && (
                        <div className="bg-[#f24455] rounded-full p-1 animate-scaleIn">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold text-lg mb-1 text-neutral-200">{model.name}</h4>
                    <p className="text-xs text-neutral-500 mb-6">{model.type}</p>
                    <div className="flex justify-between items-end border-t border-white/5 pt-4">
                      <div>
                        <span className="text-xs text-neutral-500 block mb-1">Price</span>
                        <span className="font-mono text-[#f24455] font-semibold tracking-tight">${model.initialPrice.toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                         <span className={`text-xs px-2 py-1 rounded-full border ${model.trend === 'up' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                           {model.trend === 'up' ? '▲ Up' : '• Stable'}
                         </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button 
                  disabled={!selectedModel} 
                  onClick={nextStep}
                  className="w-full md:w-auto min-w-[200px]"
                >
                  Select {selectedModel?.name || 'Model'}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: INVEST */}
          {step === DemoStep.INVEST && selectedModel && (
            <div className="w-full max-w-4xl animate-fadeIn text-center">
              <h3 className="text-2xl font-bold mb-3">Buy Your Stake</h3>
              <p className="text-neutral-400 mb-10">By purchasing shares in <span className="text-white font-semibold">{selectedModel.name}</span>, you increase its market demand.</p>
              
              <div className="grid md:grid-cols-2 gap-8 items-center bg-white/[0.02] rounded-3xl p-2 border border-white/5">
                <div className="p-8 rounded-2xl text-left relative overflow-hidden">
                  <div className="flex justify-between mb-4 relative z-10">
                    <span className="text-neutral-400">Current Price</span>
                    <span className="text-3xl font-bold font-mono text-white">${selectedModel.initialPrice.toFixed(2)}</span>
                  </div>
                  <div className="h-48 w-full relative z-10">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_CHART_DATA}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f24455" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#f24455" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="v" stroke="#f24455" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                          <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-neutral-500 mt-4 text-center">Live market simulation</p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-8 p-8 border-l border-white/5">
                   <div className="text-lg font-medium text-neutral-300">
                      Buying pushes the price <br/><span className="text-green-400 font-bold text-2xl">▲ UP</span>
                   </div>
                   <Button size="lg" onClick={nextStep} className="w-full hover:scale-105 transform transition-transform shadow-lg shadow-[#f24455]/20">
                     Confirm Purchase <TrendingUp className="ml-2 w-5 h-5" />
                   </Button>
                   <p className="text-sm text-neutral-500 flex items-center gap-2">
                     <Check className="w-4 h-4 text-green-500" /> Transaction verified
                   </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: COMPETE */}
          {step === DemoStep.COMPETE && (
            <div className="w-full max-w-3xl animate-fadeIn">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-[#f24455] w-6 h-6" />
                  Benchmarking in Progress
                </h3>
                <p className="text-neutral-400">Models are solving complex coding problems. Validating results...</p>
              </div>

              <div className="space-y-8 bg-black/20 p-8 rounded-3xl border border-white/5">
                {AI_MODELS.map((model) => (
                  <div key={model.id} className="relative">
                    <div className="flex justify-between text-sm mb-3">
                      <span className={`font-semibold text-lg ${selectedModel?.id === model.id ? 'text-[#f24455]' : 'text-neutral-300'}`}>
                        {model.name} {selectedModel?.id === model.id && '(You)'}
                      </span>
                      <span className="font-mono text-neutral-500">{(progress[model.id] || 0).toFixed(0)}%</span>
                    </div>
                    <div className="h-4 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden ${selectedModel?.id === model.id ? 'bg-gradient-to-r from-[#f24455] to-[#660f24]' : 'bg-neutral-700'}`}
                        style={{ width: `${progress[model.id] || 0}%` }}
                      >
                         {/* Shimmer effect */}
                         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: REWARD */}
          {step === DemoStep.REWARD && winner && (
            <div className="w-full max-w-md animate-fadeIn text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.4)] animate-float">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4">
                {winner === selectedModel?.id ? "Victory!" : "Round Complete"}
              </h3>
              
              <p className="text-lg text-neutral-300 mb-10 leading-relaxed">
                The winner is <span className="font-bold text-white">{AI_MODELS.find(m => m.id === winner)?.name}</span>.
                {winner === selectedModel?.id 
                  ? " Your astute prediction earned you a 42% return!" 
                  : " Your model performed well, but didn't take the top spot this time."}
              </p>

              <div className="bg-neutral-900 p-6 rounded-2xl border border-white/10 mb-8 shadow-inner">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-neutral-500 text-sm uppercase tracking-wide">Initial Stake</span>
                  <span className="text-neutral-300 font-mono">$100.00</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="text-neutral-500 text-sm uppercase tracking-wide">Current Value</span>
                  <span className={`font-mono font-bold text-2xl ${winner === selectedModel?.id ? 'text-green-400' : 'text-neutral-300'}`}>
                    ${winner === selectedModel?.id ? '142.00' : '98.50'}
                  </span>
                </div>
              </div>

              <Button onClick={resetDemo} variant="outline" className="border-white/20 hover:bg-white/10">
                Run Another Simulation
              </Button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};