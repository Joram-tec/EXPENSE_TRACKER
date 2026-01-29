"use client";
import React, { useState } from 'react';

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState<{ id: number; text: string; amount: number }[]>([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !amount) return;
    const newTransaction = { id: Date.now(), text, amount: +amount };
    setTransactions([newTransaction, ...transactions]);
    setText('');
    setAmount('');
  };

  const total = transactions.reduce((acc, item) => acc + item.amount, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-8 text-slate-900 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 mt-10">
        <h1 className="text-3xl font-extrabold text-center mb-8 tracking-tight">Wallet Watch</h1>
        
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl mb-8 text-white shadow-lg">
          <p className="text-xs uppercase tracking-widest opacity-80 mb-1 font-semibold">Total Balance</p>
          <h2 className="text-4xl font-mono font-bold">${total}</h2>
        </div>

        <form onSubmit={addTransaction} className="space-y-4 mb-8">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Description</label>
            <input className="w-full p-4 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-1" placeholder="e.g. Coffee" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Amount (+ income, - expense)</label>
            <input className="w-full p-4 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all mt-1 font-mono" type="number" placeholder="-5.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <button className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-md">Add Transaction</button>
        </form>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Recent History</h3>
          <div className="max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {transactions.length === 0 && <p className="text-center text-slate-400 py-4 italic">No transactions yet.</p>}
            {transactions.map(t => (
              <div key={t.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="font-medium text-slate-700">{t.text}</span>
                <span className={`font-bold ${t.amount < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}