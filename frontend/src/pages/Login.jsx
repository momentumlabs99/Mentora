import React from 'react';

const Login = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      
<div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
{/*  Header / Top Bar  */}
<div className="flex items-center bg-transparent p-4 pb-2 justify-between">
<div className="text-primary flex size-12 shrink-0 items-center justify-start">
<span className="material-symbols-outlined text-3xl">close</span>
</div>
<div className="flex-1 flex justify-center pr-12">
<div className="flex items-center gap-2">
<div className="bg-primary size-8 rounded flex items-center justify-center text-white">
<span className="material-symbols-outlined text-xl">diversity_3</span>
</div>
<h2 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em]">Mentora</h2>
</div>
</div>
</div>
<div className="flex flex-col flex-1 items-center justify-center px-4 py-8">
<div className="w-full max-w-[440px] flex flex-col gap-6">
{/*  Hero Visual  */}
<div className="@container">
<div className="@[480px]:px-0">
<div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-primary/10 rounded-xl min-h-[200px]" data-alt="Group of diverse people collaborating around a table" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuATJEmDf2oOJlZI-KA8QBMwJRqVHhYCJFIkioKKh1XCkM5pHS6lIpdd5eJucBLVToexPO99Z6Bhk6XP05g5sUlrbqxv59eiFBOZdlHW-NnxCAaJRzBiqC8N61M95YbvrG1gDFYYu5fRSOvQiw9A46bN0l_jTmAVU-OReYpPYQrvTHe_wrheE1YUKteAq9RS_4gCj63a71at1y6PfQJJyqWEd0nZDN1dMIO_BF8TY8LkqibJ5fORcevTksTuP-ZZqD1KrgD3DrEf884w\")" }}>
</div>
</div>
</div>
{/*  Welcome Text  */}
<div className="text-center">
<h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-3xl font-bold leading-tight pb-2">Welcome back</h1>
<p className="text-slate-600 dark:text-slate-400 text-base font-normal">Empowering communities through mentorship</p>
</div>
{/*  Form Section  */}
<div className="flex flex-col gap-4">
<label className="flex flex-col w-full">
<p className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">Email or Wallet Address</p>
<div className="relative">
<input className="form-input flex w-full rounded border border-primary/20 bg-white dark:bg-background-dark/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary h-14 placeholder:text-slate-400 p-[15px] pl-11 text-base font-normal transition-all" placeholder="name@email.com or 0x..." type="text"/>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">person</span>
</div>
</label>
<label className="flex flex-col w-full">
<div className="flex justify-between items-center pb-2">
<p className="text-slate-700 dark:text-slate-300 text-sm font-medium">Password</p>
<a className="text-primary text-sm font-semibold hover:underline" href="#">Forgot password?</a>
</div>
<div className="relative">
<input className="form-input flex w-full rounded border border-primary/20 bg-white dark:bg-background-dark/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-primary h-14 placeholder:text-slate-400 p-[15px] pl-11 text-base font-normal transition-all" placeholder="Enter your password" type="password"/>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
</div>
</label>
<button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-lg transition-colors flex items-center justify-center gap-2">
<span>Sign In</span>
<span className="material-symbols-outlined">login</span>
</button>
</div>
{/*  Divider  */}
<div className="relative flex items-center py-2">
<div className="flex-grow border-t border-primary/10"></div>
<span className="flex-shrink mx-4 text-slate-400 text-xs font-medium uppercase tracking-wider">Or continue with Web3</span>
<div className="flex-grow border-t border-primary/10"></div>
</div>
{/*  Web3 Action  */}
<button className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-bold h-14 rounded-lg transition-colors border border-primary/20 flex items-center justify-center gap-3">
<span className="material-symbols-outlined">account_balance_wallet</span>
<span>Sign up with Wallet</span>
</button>
{/*  Footer Link  */}
<p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                    Don't have an account? 
                    <a className="text-primary font-bold hover:underline" href="#">Create an account</a>
</p>
</div>
</div>
{/*  Trust Badges  */}
<div className="p-8 flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
<span className="material-symbols-outlined text-4xl">verified_user</span>
<span className="material-symbols-outlined text-4xl">security</span>
<span className="material-symbols-outlined text-4xl">public</span>
</div>
</div>

    </div>
  );
};

export default Login;
