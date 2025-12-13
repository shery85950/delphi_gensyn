import React, { useState, useEffect } from 'react';
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

  const openApp = () => {
    window.open('https://delphi.gensyn.ai/market/0', '_blank');
  };

  // Scroll Reveal Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen font-sans selection:bg-[#f24455] selection:text-white relative">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#050505]/70 supports-[backdrop-filter]:bg-[#050505]/30 transition-all duration-500">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f24455] to-[#660f24] flex items-center justify-center shadow-[0_0_15px_rgba(242,68,85,0.3)]">
              <span className="font-bold text-white font-display">D</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-neutral-200">Delphi</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">How it works</a>
            <a href="#features" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Features</a>
            <a href="#faq" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">FAQ</a>
          </div>
          <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" onClick={openApp}>Launch App</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Organic Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#f24455] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.15] animate-float" />
           <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-[#660f24] rounded-full mix-blend-screen filter blur-[140px] opacity-[0.2] animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up opacity-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md animate-float hover:bg-white/10 transition-colors cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f24455] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-300">Live on Testnet Phase 2</span>
            </div>
          </div>
          
          <h1 className="animate-fade-in-up animation-delay-100 opacity-0 text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-8 tracking-tight text-white">
            The Prediction Market <br />
            <span className="gradient-text">For AI Intelligence</span>
          </h1>
          
          <p className="animate-fade-in-up animation-delay-200 opacity-0 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Don't just watch the AI race. <span className="text-white font-medium">Invest in the winners.</span> 
            Identify top-performing models, stake your claim, and earn when they outperform the competition.
          </p>
          
          <div className="animate-fade-in-up animation-delay-300 opacity-0 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={scrollToDemo} className="group w-full md:w-auto shadow-[0_4px_30px_rgba(242,68,85,0.25)]">
              See How It Works 
              <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform opacity-70" />
            </Button>
            <Button size="lg" variant="secondary" className="w-full md:w-auto font-semibold">
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
      <section className="py-24 bg-[#080808]/50 border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Why Delphi Matters</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal-on-scroll reveal-delay-100 group p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-[#f24455]/30 transition-all duration-500">
              <div className="w-12 h-12 rounded-lg bg-[#f24455]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ExternalLink className="w-6 h-6 text-[#f24455]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-200">Transparent Evaluation</h3>
              <p className="text-neutral-400 leading-relaxed">
                Leaderboards can be gamed. Market prices cannot. We replace subjective rankings with efficient market dynamics.
              </p>
            </div>
            <div className="reveal-on-scroll reveal-delay-200 group p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-[#f24455]/30 transition-all duration-500">
               <div className="w-12 h-12 rounded-lg bg-[#f24455]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ExternalLink className="w-6 h-6 text-[#f24455]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-200">Verifiable Results</h3>
              <p className="text-neutral-400 leading-relaxed">
                Powered by Gensyn's Verde system, every inference task is cryptographically verified on-chain.
              </p>
            </div>
            <div className="reveal-on-scroll reveal-delay-300 group p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-[#f24455]/30 transition-all duration-500">
               <div className="w-12 h-12 rounded-lg bg-[#f24455]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ExternalLink className="w-6 h-6 text-[#f24455]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-200">Incentivized Truth</h3>
              <p className="text-neutral-400 leading-relaxed">
                With real value at stake, the market converges on the truth faster than any centralized benchmark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <div key={feature.id} className={`reveal-on-scroll reveal-delay-${(index + 1) * 100} group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-[#f24455]/40 transition-colors duration-300`}>
                <feature.icon className="w-8 h-8 text-neutral-600 group-hover:text-[#f24455] mb-4 transition-colors duration-300" />
                <h3 className="text-lg font-bold mb-2 text-neutral-200">{feature.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="reveal-on-scroll text-3xl font-display font-bold mb-12 text-center text-neutral-200">Common Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className={`reveal-on-scroll reveal-delay-${(index % 3) * 100} border border-white/5 rounded-2xl overflow-hidden bg-[#0f0f0f]`}>
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium text-lg text-neutral-200">{faq.question}</span>
                  {openFaq === index ? <Minus className="text-[#f24455]" /> : <Plus className="text-neutral-600" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#f24455]/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="reveal-on-scroll text-4xl md:text-6xl font-display font-bold mb-8 text-white">
            Ready to <span className="gradient-text">Predict the Future?</span>
          </h2>
          <p className="reveal-on-scroll reveal-delay-100 text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of others on the testnet. Identify the best models, build your portfolio, and prove your foresight.
          </p>
          <div className="reveal-on-scroll reveal-delay-200 flex flex-col items-center gap-6">
             <Button size="lg" className="px-12 py-5 text-lg shadow-[0_0_50px_rgba(242,68,85,0.25)] hover:shadow-[0_0_60px_rgba(242,68,85,0.4)]" onClick={openApp}>
                Launch Testnet App <ArrowRight className="ml-2" />
             </Button>
             <span className="text-sm text-neutral-500 font-medium tracking-wide">
               Mainnet launching Q1 2026
             </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center md:text-left bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-neutral-600 text-sm">
              © 2024 Delphi Protocol. Built on Gensyn.
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-neutral-500 hover:text-[#f24455] transition-colors text-sm font-medium">Twitter</a>
              <a href="#" className="text-neutral-500 hover:text-[#f24455] transition-colors text-sm font-medium">Discord</a>
              <a href="#" className="text-neutral-500 hover:text-[#f24455] transition-colors text-sm font-medium">Github</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;
