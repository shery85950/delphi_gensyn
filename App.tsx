import React, { useState } from 'react';
import { Button } from './components/ui/Button';
import { FEATURES, FAQS } from './constants';
import { DemoSection } from './components/DemoSection';
import { ComparisonSection } from './components/ComparisonSection';
import { ChevronDown, Plus, Minus, ArrowRight, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen font-sans selection:bg-[#f24455] selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#050505]/80">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f24455] to-[#660f24] flex items-center justify-center">
              <span className="font-bold text-white">D</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Delphi</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-neutral-400 hover:text-white transition-colors">How it works</a>
            <a href="#features" className="text-sm text-neutral-400 hover:text-white transition-colors">Features</a>
            <a href="#faq" className="text-sm text-neutral-400 hover:text-white transition-colors">FAQ</a>
          </div>
          <Button size="sm" variant="outline">Launch App</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
           <div className="absolute top-20 left-20 w-72 h-72 bg-[#f24455] rounded-full filter blur-[100px] animate-pulse-slow" />
           <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#660f24] rounded-full filter blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-float">
            <span className="w-2 h-2 rounded-full bg-[#f24455] animate-pulse"></span>
            <span className="text-sm font-medium text-neutral-300">Live on Testnet Phase 2</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-8 tracking-tight">
            The Prediction Market <br />
            <span className="gradient-text">For AI Intelligence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Don't just watch the AI race. <span className="text-white font-medium">Invest in the winners.</span> 
            Identify top-performing models, stake your claim, and earn when they outperform the competition.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={scrollToDemo} className="group w-full md:w-auto">
              See How It Works 
              <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="w-full md:w-auto">
              Read Whitepaper
            </Button>
          </div>
        </div>
      </header>

      {/* Comparison Analogy */}
      <ComparisonSection />

      {/* Interactive Demo */}
      <DemoSection />

      {/* Why It Matters */}
      <section className="py-24 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Why Delphi Matters</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-[#f24455]/20 flex items-center justify-center mb-6">
                <ExternalLink className="w-6 h-6 text-[#f24455]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparent Evaluation</h3>
              <p className="text-neutral-400">
                Leaderboards can be gamed. Market prices cannot. We replace subjective rankings with efficient market dynamics.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
               <div className="w-12 h-12 rounded-lg bg-[#f24455]/20 flex items-center justify-center mb-6">
                <ExternalLink className="w-6 h-6 text-[#f24455]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verifiable Results</h3>
              <p className="text-neutral-400">
                Powered by Gensyn's Verde system, every inference task is cryptographically verified on-chain.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
               <div className="w-12 h-12 rounded-lg bg-[#f24455]/20 flex items-center justify-center mb-6">
                <ExternalLink className="w-6 h-6 text-[#f24455]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Incentivized Truth</h3>
              <p className="text-neutral-400">
                With real value at stake, the market converges on the truth faster than any centralized benchmark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.id} className="group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-[#f24455]/50 transition-colors">
                <feature.icon className="w-8 h-8 text-neutral-500 group-hover:text-[#f24455] mb-4 transition-colors" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Common Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/30">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  {openFaq === index ? <Minus className="text-[#f24455]" /> : <Plus className="text-neutral-500" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 p-6 pt-0' : 'max-h-0'}`}
                >
                  <p className="text-neutral-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f24455]/10 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Ready to <span className="gradient-text">Predict the Future?</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            Join thousands of others on the testnet. Identify the best models, build your portfolio, and prove your foresight.
          </p>
          <div className="flex flex-col items-center gap-4">
             <Button size="lg" className="px-12 py-5 text-lg shadow-[0_0_40px_rgba(242,68,85,0.3)]">
                Launch Testnet App <ArrowRight className="ml-2" />
             </Button>
             <span className="text-sm text-neutral-600 font-medium">
               Mainnet launching Q3 2025
             </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center md:text-left">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-neutral-500 text-sm">
              © 2024 Delphi Protocol. Built on Gensyn.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">Github</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;