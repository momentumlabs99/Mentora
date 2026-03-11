import React from 'react';

const VerificationPortal = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      
<div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
{/*  Header  */}
<header className="flex items-center bg-background-light dark:bg-background-dark p-4 border-b border-primary/10 justify-between sticky top-0 z-10">
<div className="text-primary flex size-10 shrink-0 items-center justify-center">
<span className="material-symbols-outlined text-3xl">menu</span>
</div>
<h2 className="text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">Mentora Verify</h2>
<div className="flex w-10 items-center justify-end">
<button className="flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">account_circle</span>
</button>
</div>
</header>
{/*  Main Content  */}
<main className="flex-1 flex flex-col px-4 py-8">
{/*  Hero Section  */}
<div className="text-center mb-8">
<div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
<span className="material-symbols-outlined text-4xl">verified_user</span>
</div>
<h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight mb-3">Verify a Certificate</h1>
<p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-sm mx-auto">
                    Securely validate certificate authenticity using decentralized blockchain technology.
                </p>
</div>
{/*  Search Bar  */}
<div className="mb-10">
<div className="flex flex-col w-full group">
<div className="flex w-full items-stretch rounded-xl border-2 border-primary/20 bg-white dark:bg-slate-800 shadow-sm focus-within:border-primary transition-colors overflow-hidden h-14">
<div className="text-primary/60 flex items-center justify-center px-4">
<span className="material-symbols-outlined">search</span>
</div>
<input className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-base py-0 px-2" placeholder="Enter Certificate ID or Hash..." type="text"/>
<button className="bg-primary text-white px-6 font-semibold flex items-center justify-center active:bg-primary/90 transition-colors">
                            Verify
                        </button>
</div>
</div>
<p className="text-xs text-slate-500 dark:text-slate-500 mt-2 text-center">Example: MNT-8829-XJ2-2024</p>
</div>
{/*  Verification Result (Sample)  */}
<div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-primary/10 overflow-hidden mb-8">
<div className="bg-secondary/10 dark:bg-secondary/20 p-4 flex items-center justify-between border-b border-secondary/10">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary font-bold">check_circle</span>
<span className="text-secondary font-bold text-lg">Status: Active</span>
</div>
<span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">Verified on Chain</span>
</div>
<div className="p-5 space-y-6">
<div className="flex flex-col gap-1">
<span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Recipient Name</span>
<p className="text-lg font-bold text-slate-900 dark:text-slate-100">Alexander Thorne</p>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="flex flex-col gap-1">
<span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Issued Date</span>
<p className="font-medium text-slate-900 dark:text-slate-100">Oct 12, 2023</p>
</div>
<div className="flex flex-col gap-1">
<span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Valid Until</span>
<p className="font-medium text-slate-900 dark:text-slate-100">Lifetime</p>
</div>
</div>
<div className="flex flex-col gap-1">
<span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Blockchain Hash</span>
<div className="flex items-center gap-2 bg-background-light dark:bg-slate-900 p-2 rounded border border-primary/5">
<p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 break-all leading-tight">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
<span className="material-symbols-outlined text-sm text-primary cursor-pointer">content_copy</span>
</div>
</div>
<div className="pt-4 border-t border-slate-100 dark:border-slate-700">
<div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
<img className="w-full h-full object-cover opacity-80" data-alt="Modern geometric certificate template with security seals" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiRsACi3EZo8k2f5FWDbAapuyY-r6v4X3j7udB7xWaKXGMZj21ssRNyuRgjrzM8cMQt03JWagimVprMOGuldObsRTKMRFd0pMDomXIzv6PjcQCd8bOi-T-ulAkZKhZD8dHYgmd0kObnxnpm1C2f5SZOWhNeEgy0h62CKvAKtQMxyUsB_joFPwrqrQ7F_ffEilCn7h87VP98r95dRZJ-jV3QAD7mq7dxQrunGirtZYV9b0pGB8d8HenKtSIaygF7WpaeW7s4u84B7cp"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
<button className="bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 shadow-lg">
<span className="material-symbols-outlined text-base">download</span>
                                    PDF Certificate
                                </button>
</div>
</div>
</div>
</div>
</div>
{/*  Trust Badge Section  */}
<div className="flex flex-col items-center gap-4 py-6 border-t border-primary/5 mt-auto">
<p className="text-sm text-slate-500 font-medium">Powering global educational trust</p>
<div className="flex gap-8 opacity-40 grayscale contrast-125">
<span className="material-symbols-outlined text-3xl">hub</span>
<span className="material-symbols-outlined text-3xl">token</span>
<span className="material-symbols-outlined text-3xl">shield_with_heart</span>
</div>
</div>
</main>
{/*  Bottom Navigation  */}
<nav className="sticky bottom-0 bg-white dark:bg-background-dark border-t border-primary/10 px-4 py-2 flex items-center justify-around z-10">
<a className="flex flex-col items-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined">home</span>
<span className="text-[10px] font-bold">Home</span>
</a>
<a className="flex flex-col items-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
<span className="text-[10px] font-bold">Verify</span>
</a>
<a className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600" href="#">
<span className="material-symbols-outlined">history</span>
<span className="text-[10px] font-bold">History</span>
</a>
<a className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-[10px] font-bold">Settings</span>
</a>
</nav>
</div>

    </div>
  );
};

export default VerificationPortal;
