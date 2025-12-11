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
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#f24455] rounded-full mix-blend-screen filter blur-[128px] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            See How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-neutral-400 text-lg">
            Experience the full lifecycle of a prediction market in seconds. No risk, just simulation.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between max-w-3xl mx-auto mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-800 -z-10" />
          {['Pick', 'Invest', 'Compete', 'Win'].map((label, idx) => (
            <div key={label} className="flex flex-col items-center gap-2 bg-[#050505] px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300
                ${step >= idx 
                  ? 'border-[#f24455] bg-[#f24455] text-white' 
                  : 'border-neutral-700 bg-neutral-900 text-neutral-500'}`}>
                {idx + 1}
              </div>
              <span className={`text-sm ${step >= idx ? 'text-white' : 'text-neutral-600'}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Game Container */}
        <div className="glass-panel rounded-3xl p-6 md:p-12 min-h-[500px] flex flex-col items-center justify-center transition-all duration-500 max-w-5xl mx-auto border-t border-white/10">
          
          {/* STEP 1: SELECT */}
          {step === DemoStep.SELECT && (
            <div className="w-full animate-fadeIn">
              <h3 className="text-2xl font-bold mb-2 text-center">Choose a Model to Back</h3>
              <p className="text-neutral-400 text-center mb-8">Analyze the initial stats and trust your gut.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {AI_MODELS.map((model) => (
                  <div 
                    key={model.id}
                    onClick={() => handleModelSelect(model)}
                    className={`cursor-pointer group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                      ${selectedModel?.id === model.id 
                        ? 'border-[#f24455] bg-[#f24455]/10 shadow-[0_0_30px_rgba(242,68,85,0.15)]' 
                        : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-600'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-neutral-800 p-2 rounded-lg group-hover:bg-[#f24455] group-hover:text-white transition-colors">
                        <Brain className="w-6 h-6" />
                      </div>
                      {selectedModel?.id === model.id && (
                        <div className="bg-[#f24455] rounded-full p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold text-lg mb-1">{model.name}</h4>
                    <p className="text-xs text-neutral-400 mb-4">{model.type}</p>
                    <div className="flex justify-between items-end border-t border-white/5 pt-4">
                      <div>
                        <span className="text-xs text-neutral-500 block">Price</span>
                        <span className="font-mono text-[#f24455] font-semibold">${model.initialPrice.toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                         <span className={`text-xs px-2 py-1 rounded-full ${model.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                           {model.trend === 'up' ? '▲ Trending' : '• Stable'}
                         </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
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
            <div className="w-full max-w-3xl animate-fadeIn text-center">
              <h3 className="text-2xl font-bold mb-2">Buy Your Stake</h3>
              <p className="text-neutral-400 mb-8">By purchasing shares in <span className="text-white font-semibold">{selectedModel.name}</span>, you increase its market demand.</p>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 text-left">
                  <div className="flex justify-between mb-4">
                    <span className="text-neutral-400">Current Price</span>
                    <span className="text-2xl font-bold font-mono">${selectedModel.initialPrice.toFixed(2)}</span>
                  </div>
                  <div className="h-40 w-full relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_CHART_DATA}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f24455" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#f24455" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="v" stroke="#f24455" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                          <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2 text-center">Live market simulation</p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-6">
                   <div className="text-lg">
                      Buying pushes the price <span className="text-green-400 font-bold">UP</span>
                   </div>
                   <Button size="lg" onClick={nextStep} className="w-full hover:scale-105 transform transition-transform">
                     Confirm Purchase <TrendingUp className="ml-2 w-5 h-5" />
                   </Button>
                   <p className="text-sm text-neutral-500">
                     Transaction verified on simulation layer
                   </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: COMPETE */}
          {step === DemoStep.COMPETE && (
            <div className="w-full max-w-3xl animate-fadeIn">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin text-[#f24455]" />
                  Benchmarking in Progress
                </h3>
                <p className="text-neutral-400">Models are solving complex coding problems. Validating results...</p>
              </div>

              <div className="space-y-6">
                {AI_MODELS.map((model) => (
                  <div key={model.id} className="relative">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={`font-semibold ${selectedModel?.id === model.id ? 'text-[#f24455]' : 'text-neutral-300'}`}>
                        {model.name} {selectedModel?.id === model.id && '(You)'}
                      </span>
                      <span className="font-mono text-neutral-500">{(progress[model.id] || 0).toFixed(0)}%</span>
                    </div>
                    <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ease-out ${selectedModel?.id === model.id ? 'bg-gradient-to-r from-[#f24455] to-[#660f24]' : 'bg-neutral-600'}`}
                        style={{ width: `${progress[model.id] || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: REWARD */}
          {step === DemoStep.REWARD && winner && (
            <div className="w-full max-w-md animate-fadeIn text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.4)] animate-float">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-2">
                {winner === selectedModel?.id ? "Victory!" : "Round Complete"}
              </h3>
              
              <p className="text-lg text-neutral-300 mb-8">
                The winner is <span className="font-bold text-white">{AI_MODELS.find(m => m.id === winner)?.name}</span>.
                {winner === selectedModel?.id 
                  ? " Your astute prediction earned you a 42% return!" 
                  : " Your model performed well, but didn't take the top spot this time."}
              </p>

              <div className="bg-neutral-900/80 p-6 rounded-xl border border-neutral-800 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neutral-500">Initial Stake</span>
                  <span className="text-neutral-300">$100.00</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-2">
                  <span className="text-neutral-500">Current Value</span>
                  <span className={`font-mono font-bold text-xl ${winner === selectedModel?.id ? 'text-green-400' : 'text-neutral-300'}`}>
                    ${winner === selectedModel?.id ? '142.00' : '98.50'}
                  </span>
                </div>
              </div>

              <Button onClick={resetDemo} variant="outline">
                Run Another Simulation
              </Button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};