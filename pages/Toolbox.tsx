import React, { useState } from 'react';
import { Calculator, Zap, DollarSign } from 'lucide-react';

const Toolbox: React.FC = () => {
  const [users, setUsers] = useState(1000);
  const [msgsPerUser, setMsgsPerUser] = useState(50);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  
  // Costs per 1M tokens (Standard GPT-4o approx for simulation)
  const inputCostPer1M = 2.50; 
  const outputCostPer1M = 10.00;
  const subPrice = 20; // $20/month subscription

  const totalInputTokens = users * msgsPerUser * inputTokens * 30; // Monthly
  const totalOutputTokens = users * msgsPerUser * outputTokens * 30;
  
  const monthlyInputCost = (totalInputTokens / 1000000) * inputCostPer1M;
  const monthlyOutputCost = (totalOutputTokens / 1000000) * outputCostPer1M;
  const totalCost = monthlyInputCost + monthlyOutputCost;
  
  const revenue = users * subPrice;
  const margin = revenue - totalCost;
  const costPerUser = totalCost / users;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">AI PM Toolbox</h1>
        <p className="text-slate-400">
           Essential utilities for the modern AI Product Manager. Start with Unit Economics—the #1 failure point for new AI features.
        </p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded text-emerald-500">
               <Calculator size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Tokenomics Calculator</h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Model: GPT-4o Class ($2.50 in / $10.00 out)
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-6">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Assumptions</h3>
             
             <div className="space-y-2">
               <label className="text-sm text-slate-300 flex justify-between">
                 Active Users <span className="text-slate-500">{users.toLocaleString()}</span>
               </label>
               <input type="range" min="100" max="10000" step="100" value={users} onChange={(e) => setUsers(Number(e.target.value))} className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg appearance-none" />
             </div>

             <div className="space-y-2">
               <label className="text-sm text-slate-300 flex justify-between">
                 Daily Msgs / User <span className="text-slate-500">{msgsPerUser}</span>
               </label>
               <input type="range" min="1" max="200" value={msgsPerUser} onChange={(e) => setMsgsPerUser(Number(e.target.value))} className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg appearance-none" />
             </div>

             <div className="space-y-2">
               <label className="text-sm text-slate-300 flex justify-between">
                 Avg Input Tokens <span className="text-slate-500">{inputTokens}</span>
               </label>
               <input type="range" min="100" max="5000" step="100" value={inputTokens} onChange={(e) => setInputTokens(Number(e.target.value))} className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg appearance-none" />
             </div>

             <div className="space-y-2">
               <label className="text-sm text-slate-300 flex justify-between">
                 Avg Output Tokens <span className="text-slate-500">{outputTokens}</span>
               </label>
               <input type="range" min="10" max="2000" step="10" value={outputTokens} onChange={(e) => setOutputTokens(Number(e.target.value))} className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg appearance-none" />
             </div>
          </div>

          {/* Outputs */}
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Monthly Projection</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-slate-500 text-xs mb-1">Cost per User</div>
                <div className="text-2xl font-mono text-white">${costPerUser.toFixed(2)}</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                 <div className="text-slate-500 text-xs mb-1">Total Cost</div>
                 <div className="text-2xl font-mono text-red-400">-${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400">Revenue (@$20/mo)</span>
                <span className="text-slate-200">${revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Total Inference Cost</span>
                <span className="text-red-400">-${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="font-bold text-white text-lg">Net Margin</span>
                <span className={`font-mono text-2xl font-bold ${margin > 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                  {margin > 0 ? '+' : ''}{margin.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
            
            {margin < 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded p-3 flex gap-2 items-start">
                <Zap size={16} className="text-red-500 mt-0.5" />
                <p className="text-xs text-red-300">
                  <span className="font-bold">Warning: Negative Unit Economics.</span> Consider Model Routing (using cheaper models for simple queries) or caching to reduce costs.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
