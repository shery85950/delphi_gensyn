import React from 'react';
import { Building2, Cpu, TrendingUp, Search } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] relative z-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="text-[#f24455] font-semibold tracking-wider text-xs uppercase bg-[#f24455]/10 px-3 py-1 rounded-full border border-[#f24455]/20">The Concept</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-6">
            Like the Stock Market, <br />
            <span className="text-neutral-500">But for Intelligence</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Market */}
          <div className="reveal-on-scroll reveal-delay-100 group relative p-8 rounded-3xl bg-[#0f0f0f] border border-white/5 hover:border-white/10 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800 rounded-t-3xl opacity-50" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neutral-900 rounded-xl border border-white/5">
                <Building2 className="w-6 h-6 text-neutral-500" />
              </div>
              <h3 className="text-xl font-bold text-neutral-300">Traditional Stocks</h3>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Search className="w-5 h-5 text-neutral-600 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-400">Evaluate Companies</p>
                  <p className="text-sm text-neutral-600 mt-1">Read balance sheets, earnings reports, and analyst projections.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <TrendingUp className="w-5 h-5 text-neutral-600 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-400">Speculate on Profit</p>
                  <p className="text-sm text-neutral-600 mt-1">Stock prices move based on future earnings potential and market sentiment.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Delphi Market */}
          <div className="reveal-on-scroll reveal-delay-200 group relative p-8 rounded-3xl glass-panel hover:shadow-[0_0_40px_rgba(242,68,85,0.1)] transition-all duration-500 border border-[#f24455]/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f24455] to-[#660f24] rounded-t-3xl" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#f24455]/10 rounded-xl border border-[#f24455]/20 shadow-[0_0_15px_rgba(242,68,85,0.1)]">
                <Cpu className="w-6 h-6 text-[#f24455]" />
              </div>
              <h3 className="text-xl font-bold text-white">Delphi Markets</h3>
            </div>

            <ul className="space-y-6">
               <li className="flex items-start gap-4">
                <Search className="w-5 h-5 text-[#f24455] mt-1" />
                <div>
                  <p className="font-semibold text-white">Evaluate Capabilities</p>
                  <p className="text-sm text-neutral-400 mt-1">Test logic, creativity, coding skills, and reasoning depth.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <TrendingUp className="w-5 h-5 text-[#f24455] mt-1" />
                <div>
                  <p className="font-semibold text-white">Speculate on Performance</p>
                  <p className="text-sm text-neutral-400 mt-1">Asset prices move based on benchmark dominance and verified inference.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};