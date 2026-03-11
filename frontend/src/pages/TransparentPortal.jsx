import React from 'react';

const TransparentPortal = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      
<div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
{/*  Header  */}
<header className="flex items-center bg-background-light dark:bg-background-dark p-4 border-b border-primary/10 justify-between sticky top-0 z-10">
<div className="flex items-center gap-3">
<div className="text-primary flex size-10 items-center justify-center rounded-lg bg-primary/10">
<span className="material-symbols-outlined">account_balance_wallet</span>
</div>
<h1 className="text-primary text-xl font-bold leading-tight tracking-tight">Mentora Portal</h1>
</div>
<div className="flex items-center gap-2">
<button className="flex size-10 items-center justify-center rounded-full bg-primary/5 hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
<button className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
<span className="material-symbols-outlined">person</span>
</button>
</div>
</header>
{/*  Stats Section  */}
<main className="flex-1 pb-24">
<div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="flex flex-col gap-2 rounded-xl p-6 bg-primary text-white shadow-lg shadow-primary/20">
<div className="flex justify-between items-start">
<p className="text-white/80 text-sm font-medium uppercase tracking-wider">Total Funds Raised</p>
<span className="material-symbols-outlined text-white/60">trending_up</span>
</div>
<p className="text-3xl font-bold leading-tight mt-1">$1,250,000.00</p>
<div className="flex items-center gap-1 mt-2">
<span className="text-white bg-white/20 px-2 py-0.5 rounded text-xs font-bold">+12.5%</span>
<span className="text-white/60 text-xs italic">vs last month</span>
</div>
</div>
<div className="flex flex-col gap-2 rounded-xl p-6 bg-earth-green text-white shadow-lg shadow-earth-green/20">
<div className="flex justify-between items-start">
<p className="text-white/80 text-sm font-medium uppercase tracking-wider">Funds Disbursed</p>
<span className="material-symbols-outlined text-white/60">payments</span>
</div>
<p className="text-3xl font-bold leading-tight mt-1">$840,000.00</p>
<div className="flex items-center gap-1 mt-2">
<span className="text-white bg-white/20 px-2 py-0.5 rounded text-xs font-bold">67% Allocation</span>
</div>
</div>
</div>
{/*  Ledger Controls  */}
<div className="px-4 pt-4">
<div className="flex items-center justify-between mb-4">
<h2 className="text-primary text-xl font-bold tracking-tight">Live Ledger</h2>
<button className="text-primary text-sm font-semibold flex items-center gap-1">
                        View Audit Log <span className="material-symbols-outlined text-sm">open_in_new</span>
</button>
</div>
<div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
<button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 text-white text-sm font-medium">
                        All Activity
                    </button>
<button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary/10 px-5 text-primary text-sm font-medium">
                        Pending <span className="bg-primary/20 px-1.5 rounded-full text-[10px]">12</span>
</button>
<button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary/10 px-5 text-primary text-sm font-medium">
                        Completed
                    </button>
<button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary/10 px-5 text-primary text-sm font-medium">
                        Grants
                    </button>
</div>
</div>
{/*  Transaction Feed  */}
<div className="px-4 mt-2 space-y-3">
{/*  Transaction Item: Pending (Admin Action)  */}
<div className="bg-white dark:bg-background-dark/50 border border-primary/10 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
<div className="flex justify-between items-start">
<div className="flex gap-3">
<div className="size-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
<span className="material-symbols-outlined">hourglass_empty</span>
</div>
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Clean Water Project #402</p>
<p className="text-xs text-slate-500 font-mono uppercase">TXN: 0x82...E4A1</p>
</div>
</div>
<div className="text-right">
<p className="font-bold text-primary">$12,400.00</p>
<p className="text-[10px] text-slate-400">2 mins ago</p>
</div>
</div>
<div className="flex gap-2 pt-1 border-t border-slate-50 dark:border-slate-800">
<button className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/10">
<span className="material-symbols-outlined text-sm">send</span> Disburse
                        </button>
<button className="px-4 bg-primary/5 text-primary py-2.5 rounded-lg text-sm font-medium border border-primary/10">
                            Review
                        </button>
</div>
</div>
{/*  Transaction Item: Completed  */}
<div className="bg-white dark:bg-background-dark/50 border border-primary/5 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
<div className="flex justify-between items-start">
<div className="flex gap-3">
<div className="size-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
<span className="material-symbols-outlined">check_circle</span>
</div>
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Education Grant - Nairobi</p>
<p className="text-xs text-slate-500 font-mono uppercase">TXN: 0x31...90BF</p>
</div>
</div>
<div className="text-right">
<p className="font-bold text-earth-green">$5,000.00</p>
<p className="text-[10px] text-slate-400">1 hour ago</p>
</div>
</div>
</div>
{/*  Transaction Item: In Progress  */}
<div className="bg-white dark:bg-background-dark/50 border border-primary/5 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
<div className="flex justify-between items-start">
<div className="flex gap-3">
<div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
<span className="material-symbols-outlined">sync</span>
</div>
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Medical Supplies Allocation</p>
<p className="text-xs text-slate-500 font-mono uppercase">TXN: 0xFA...22C1</p>
</div>
</div>
<div className="text-right">
<p className="font-bold text-primary">$45,200.00</p>
<p className="text-[10px] text-slate-400">4 hours ago</p>
</div>
</div>
</div>
{/*  Transaction Item: Completed  */}
<div className="bg-white dark:bg-background-dark/50 border border-primary/5 rounded-xl p-4 flex flex-col gap-2 shadow-sm opacity-80">
<div className="flex justify-between items-start">
<div className="flex gap-3">
<div className="size-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
<span className="material-symbols-outlined">check_circle</span>
</div>
<div>
<p className="font-bold text-slate-900 dark:text-slate-100">Donor Contribution: Alice W.</p>
<p className="text-xs text-slate-500 font-mono uppercase">TXN: 0x98...DD10</p>
</div>
</div>
<div className="text-right">
<p className="font-bold text-emerald-600">+$1,500.00</p>
<p className="text-[10px] text-slate-400">Yesterday</p>
</div>
</div>
</div>
</div>
</main>
{/*  Bottom Navigation Bar  */}
<nav className="fixed bottom-0 left-0 right-0 border-t border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 pb-4 pt-2 z-20">
<div className="flex gap-2 max-w-md mx-auto">
<a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
<p className="text-[10px] font-bold uppercase tracking-widest">Dashboard</p>
</a>
<a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400" href="#">
<span className="material-symbols-outlined">account_balance</span>
<p className="text-[10px] font-bold uppercase tracking-widest">Ledger</p>
</a>
<a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400" href="#">
<span className="material-symbols-outlined">bar_chart</span>
<p className="text-[10px] font-bold uppercase tracking-widest">Impact</p>
</a>
<a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400" href="#">
<span className="material-symbols-outlined">settings</span>
<p className="text-[10px] font-bold uppercase tracking-widest">Portal</p>
</a>
</div>
</nav>
</div>
<style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
`}} />

    </div>
  );
};

export default TransparentPortal;
