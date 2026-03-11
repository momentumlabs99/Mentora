import React from 'react';

const SignUp = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col items-center">
      
<div className="relative flex h-auto min-h-screen w-full max-w-md flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
{/*  Top App Bar  */}
<div className="flex items-center p-4 pb-2 justify-between">
<div className="text-primary flex size-12 shrink-0 items-center cursor-pointer" data-icon="ArrowBack">
<span className="material-symbols-outlined text-2xl">arrow_back</span>
</div>
<h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Join Mentora</h2>
</div>
{/*  Hero Illustration  */}
<div className="@container">
<div className="px-4 py-3">
<div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[180px] bg-primary/10" data-alt="Group of diverse students collaborating together happily" style={{ backgroundImage: "url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuD-EwrBYEKuJek9ycKEN_nZ8sOu2GBvvzTe4WkYNurDW2fdLuYy1rZxBN0xditPotxoUVZSRqDZKuPNxwnnp62PXLcEiwJrMz2FxoU81MGiQLmOiPT7D1RU96CPJ4U--oowoK9T9EfW3F8IkyhhXMtNUxlk5Rjgu7mPgb5Ykol0i2YDzYKLcgd0lI4Z60qm6SlzVU8YzpA4x3DGDbG3Pgr4hergfR3056wFxddH_2_Rn-abP39x4it3m2V0PY71u333tdJWFa25beQH\")" }}>
</div>
</div>
</div>
<div className="px-4 pt-5 pb-2 text-center">
<h2 className="text-slate-900 dark:text-slate-100 tracking-light text-2xl font-bold leading-tight">Create Your Account</h2>
<p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal mt-2">Empowering education through mentorship and transparency.</p>
</div>
{/*  Role Selector  */}
<div className="px-4 py-4">
<p className="text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">Choose your role</p>
<div className="flex h-12 w-full items-center justify-center rounded-xl bg-primary/5 dark:bg-white/5 p-1 border border-primary/10">
<label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:text-white text-slate-600 dark:text-slate-400 text-sm font-semibold transition-all">
<span className="truncate">Student</span>
<input checked="" className="invisible w-0" name="role-selector" type="radio" value="Student"/>
</label>
<label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:text-white text-slate-600 dark:text-slate-400 text-sm font-semibold transition-all">
<span className="truncate">Donor</span>
<input className="invisible w-0" name="role-selector" type="radio" value="Donor"/>
</label>
<label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-primary has-[:checked]:text-white text-slate-600 dark:text-slate-400 text-sm font-semibold transition-all">
<span className="truncate">NGO</span>
<input className="invisible w-0" name="role-selector" type="radio" value="NGO"/>
</label>
</div>
</div>
{/*  Registration Form  */}
<form className="px-4 space-y-4">
<div>
<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
<input className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Alex Johnson" type="text"/>
</div>
<div>
<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
<input className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="alex@example.com" type="email"/>
</div>
<div>
<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Create Password</label>
<div className="relative">
<input className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="••••••••" type="password"/>
<button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" type="button">
<span className="material-symbols-outlined text-xl">visibility</span>
</button>
</div>
</div>
{/*  Action Buttons  */}
<div className="pt-4 space-y-3">
<button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20" type="submit">
                    Create Account
                </button>
<div className="flex items-center gap-4 py-2">
<div className="h-px grow bg-primary/10"></div>
<span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Or connect via Web3</span>
<div className="h-px grow bg-primary/10"></div>
</div>
<button className="w-full flex items-center justify-center gap-2 border-2 border-primary/20 hover:bg-primary/5 text-primary font-bold py-3 rounded-xl transition-all" type="button">
<span className="material-symbols-outlined">account_balance_wallet</span>
                    Connect Wallet
                </button>
</div>
</form>
{/*  Footer  */}
<div className="px-4 py-8 text-center">
<p className="text-sm text-slate-500 dark:text-slate-400">
                Already have an account? 
                <a className="text-primary font-bold hover:underline" href="#">Log in</a>
</p>
</div>
<div className="h-8"></div>
</div>

    </div>
  );
};

export default SignUp;
