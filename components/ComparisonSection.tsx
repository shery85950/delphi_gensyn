import React from 'react';
import { Building2, Cpu, TrendingUp, Search } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#f24455] font-semibold tracking-wider text-sm uppercase">The Concept</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
            Like the Stock Market, <br />
            <span className="text-neutral-400">But for Intelligence</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Market */}
          <div className="group relative p-8 rounded-3xl bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800 rounded-t-3xl" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neutral-800 rounded-xl">
                <Building2 className="w-6 h-6 text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold">Traditional Stocks</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Search className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-300">Evaluate Companies</p>
                  <p className="text-sm text-neutral-500">Read balance sheets and earnings reports.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-neutral-500 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-300">Speculate on Profit</p>
                  <p className="text-sm text-neutral-500">Stock price moves based on future earnings potential.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Delphi Market */}
          <div className="group relative p-8 rounded-3xl glass-panel hover:shadow-[0_0_30px_rgba(242,68,85,0.1)] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f24455] to-[#660f24] rounded-t-3xl" />
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#f24455]/10 rounded-xl border border-[#f24455]/20">
                <Cpu className="w-6 h-6 text-[#f24455]" />
              </div>
              <h3 className="text-xl font-bold">Delphi Markets</h3>
            </div>

            <ul className="space-y-4">
               <li className="flex items-start gap-3">
                <Search className="w-5 h-5 text-[#f24455] mt-1" />
                <div>
                  <p className="font-semibold text-white">Evaluate Capabilities</p>
                  <p className="text-sm text-neutral-400">Test logic, creativity, and coding skills.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-[#f24455] mt-1" />
                <div>
                  <p className="font-semibold text-white">Speculate on Performance</p>
                  <p className="text-sm text-neutral-400">Asset price moves based on benchmark dominance.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};