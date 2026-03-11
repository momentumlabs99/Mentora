import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      
{/*  Main Container  */}
<div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-white dark:bg-background-dark shadow-xl">
{/*  Top Navigation Header  */}
<header className="flex items-center p-4 justify-between sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-primary/10">
<div className="text-primary flex size-10 shrink-0 items-center justify-center">
<span className="material-symbols-outlined text-2xl">menu</span>
</div>
<h1 className="text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">Mentora</h1>
<div className="flex w-10 items-center justify-end">
<button className="flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-2xl">notifications</span>
</button>
</div>
</header>
{/*  Profile Section  */}
<section className="p-6 bg-gradient-to-b from-primary/10 to-transparent">
<div className="flex items-center gap-5">
<div className="relative">
<div className="bg-primary/20 rounded-full p-1 border-2 border-primary">
<img alt="Alex Rivera" className="size-20 rounded-full object-cover" data-alt="Student profile portrait of a smiling young man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiwKsgQ5c7GXh5dqGL4H2_TjgrDl8qBrT_M749D7vriru1NLnpHRJFEY4mJiUQLCV8fu7xeBoFapoSjyCxGjl0N87Rb07uKJAP77p8dXPAMvz7L0WRg6A2uOMtTy-uj4N4lbQqeu-pz2pyzD5F0G6qnh9Qe4DGVeRfXWfzj7gqU9LoRpEgVTNb_Xftznc1zeKmXthysoFIkyKkfD1A_4q8O_I5ThvfTyY9qyv1nswl_gdBWK6Br53-6y9ZBL1PE2ZYKuEIVrLQ1p2k"/>
</div>
<div className="absolute -bottom-1 -right-1 bg-accent-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white dark:border-background-dark">
                        PRO
                    </div>
</div>
<div className="flex flex-col">
<h2 className="text-primary text-2xl font-bold leading-tight">Alex Rivera</h2>
<div className="flex items-center gap-2 mt-1">
<span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">Level 4</span>
<span className="text-slate-500 dark:text-slate-400 text-xs font-mono">0x71C...492a</span>
<span className="material-symbols-outlined text-sm text-slate-400 cursor-pointer">content_copy</span>
</div>
</div>
</div>
</section>
{/*  My Passport Section  */}
<section className="px-4 py-2">
<div className="flex items-center justify-between mb-4">
<h3 className="text-primary text-xl font-bold">My Passport</h3>
<a className="text-primary text-sm font-medium" href="#">View all</a>
</div>
<div className="grid grid-cols-2 gap-3">
{/*  Certificate Card 1  */}
<div className="relative group">
<div className="bg-slate-100 dark:bg-primary/5 rounded-xl overflow-hidden border border-primary/5 aspect-square flex flex-col">
<div className="h-2/3 bg-cover bg-center" data-alt="Abstract design tools and UI layouts" style={{ backgroundImage: "linear-gradient(0deg, rgba(13, 92, 99, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuD14AaamFD5cRu0mg6xnBYf_Hxtyn7m5ngPofyTaL0s3WhZ229i9TKOuIyZxz1iEmk9poIgTUGlVid7dhMO62QAiGj8hUOs0TlUtPO9CabFFNGyN7jFojz8GCZWlhDvHCUrdKJY0bU8zaNpMmPSMaqq6H2wq114W9-2LS68ZUWv6Cl9mh7X4ZaCs0uM35Xd7UVqFzJNmuEmS6o1W_j5XrzIc9o3KV-QVmFhJZRU130nTFQgaNJbKrk9TwjQJ-JhGc35zY__z6aHniA0\")" }}></div>
<div className="p-3 flex-1 flex flex-col justify-between">
<p className="text-xs font-bold text-primary line-clamp-2">Advanced UX Design</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-accent-green text-sm">verified_user</span>
<span className="text-[10px] font-bold text-accent-green uppercase tracking-wider">Verified</span>
</div>
</div>
</div>
</div>
{/*  Certificate Card 2  */}
<div className="relative group">
<div className="bg-slate-100 dark:bg-primary/5 rounded-xl overflow-hidden border border-primary/5 aspect-square flex flex-col">
<div className="h-2/3 bg-cover bg-center" data-alt="Digital blockchain network nodes illustration" style={{ backgroundImage: "linear-gradient(0deg, rgba(13, 92, 99, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuC4RAU_16r_TOLZm1CcL3KV21T7pAbfOzPf5dmvk84TuJPputYfbFfRIxO9XmMV3ebKHXyeLnE2nzy5l33HxNZ2IHl7w8izyLb-D1hfJR0V4fQkDJqcYjLAcCD9ZL2RJRq4jFc8cAeZPSuoI3Q1-sxdJgoFYijjWxx0hYBOBKTdrjWG7obC7RVxZgWq0_Vglj4V9gWR2S8PzaiK0N9rk0tYw7qd8ag7Qrw3l2zuh8m1q-5tg6Bc0-6soHQHLnKSxeAtzGv8Y_HwT5vw\")" }}></div>
<div className="p-3 flex-1 flex flex-col justify-between">
<p className="text-xs font-bold text-primary line-clamp-2">Blockchain Basics</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-accent-green text-sm">verified_user</span>
<span className="text-[10px] font-bold text-accent-green uppercase tracking-wider">Verified</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  Active Enrollments Section  */}
<section className="px-4 py-8">
<h3 className="text-primary text-xl font-bold mb-4">Active Enrollments</h3>
<div className="space-y-4">
{/*  Course Progress 1  */}
<div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-4 shadow-sm">
<div className="flex justify-between items-start mb-3">
<div>
<p className="text-sm font-bold text-primary">Web3 Development Bootcamp</p>
<p className="text-xs text-slate-500 mt-0.5">Module 4: Smart Contracts</p>
</div>
<span className="text-sm font-bold text-accent-green">75%</span>
</div>
<div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
<div className="bg-accent-green h-2 rounded-full" style={{ width: "75%" }}></div>
</div>
</div>
{/*  Course Progress 2  */}
<div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl p-4 shadow-sm">
<div className="flex justify-between items-start mb-3">
<div>
<p className="text-sm font-bold text-primary">Product Psychology</p>
<p className="text-xs text-slate-500 mt-0.5">Module 2: Cognitive Biases</p>
</div>
<span className="text-sm font-bold text-accent-green">32%</span>
</div>
<div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
<div className="bg-accent-green h-2 rounded-full" style={{ width: "32%" }}></div>
</div>
</div>
</div>
</section>
{/*  Bottom Navigation Spacer  */}
<div className="h-20"></div>
{/*  Bottom Navigation Bar  */}
<nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-primary/10 px-6 pb-6 pt-3 flex justify-between items-center z-20">
<a className="flex flex-col items-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined">home</span>
<span className="text-[10px] font-medium">Home</span>
</a>
<a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">book_4</span>
<span className="text-[10px] font-medium">Courses</span>
</a>
<a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">workspace_premium</span>
<span className="text-[10px] font-medium">Passport</span>
</a>
<a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-[10px] font-medium">Settings</span>
</a>
</nav>
</div>

    </div>
  );
};

export default Dashboard;
