import React from 'react';

const CourseMarketplace = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      
<div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-20">
{/*  Header  */}
<header className="flex items-center bg-background-light dark:bg-background-dark p-4 justify-between sticky top-0 z-10 border-b border-primary/10">
<div className="text-primary flex size-12 shrink-0 items-center justify-start">
<span className="material-symbols-outlined text-2xl">menu</span>
</div>
<h2 className="text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">Mentora</h2>
<div className="flex w-12 items-center justify-end">
<button className="flex items-center justify-center rounded h-12 bg-transparent text-primary p-0">
<span className="material-symbols-outlined text-2xl">shopping_cart</span>
</button>
</div>
</header>
{/*  Search Bar  */}
<div className="px-4 py-3">
<label className="flex flex-col min-w-40 h-12 w-full">
<div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-primary/20 shadow-sm">
<div className="text-primary/60 flex bg-white dark:bg-slate-800 items-center justify-center pl-4">
<span className="material-symbols-outlined text-xl">search</span>
</div>
<input className="form-input flex w-full min-w-0 flex-1 border-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-0 h-full placeholder:text-primary/40 px-4 pl-2 text-base font-normal" placeholder="Search courses..." value=""/>
</div>
</label>
</div>
{/*  Filter Chips: Categories  */}
<div className="px-4 py-2">
<p className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">Categories</p>
<div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-4 text-sm font-medium">
                    All
                </button>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 text-primary px-4 text-sm font-medium border border-primary/20">
                    IT
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
</button>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 text-primary px-4 text-sm font-medium border border-primary/20">
                    Health
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
</button>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 text-primary px-4 text-sm font-medium border border-primary/20">
                    Agriculture
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
</button>
</div>
</div>
{/*  Filter Chips: Levels  */}
<div className="px-4 py-2">
<p className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">Skill Level</p>
<div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-secondary/10 text-secondary px-4 text-sm font-medium border border-secondary/20">
                    Beginner
                </button>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-secondary/10 text-secondary px-4 text-sm font-medium border border-secondary/20">
                    Intermediate
                </button>
<button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-secondary/10 text-secondary px-4 text-sm font-medium border border-secondary/20">
                    Advanced
                </button>
</div>
</div>
{/*  Course List  */}
<div className="flex flex-col gap-4 p-4">
{/*  Course Card 1  */}
<div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-primary/10">
<div className="h-40 w-full bg-cover bg-center" data-alt="Modern office setup with laptop and plants" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfvpVow7h2BjP6drYf5zQt8yoqmJD5A-9mNJN1wFO7A-EcDVBJwpQVRn2Vcwq3WINURtDwJRyPyBJLDZwl0ODDZDCqdrZ9PZ78bacdrPo7DG8WVX6rXXmRtyaAn8V9MYZ95XOBRd-mnuVjTq4ce8a9DXNNZwciDh09HqVCWuV_0BQ0OgtE1s_126j-HfSYRlJxB5OFvxUtOlhGS8KEy5BW8UWa5JTjj4AGrpQq5S7jkeSGXVdVvTEKk2_8VE7mI54F5t5RM0_2UHF3')" }}></div>
<div className="p-4 flex flex-col gap-2">
<div className="flex justify-between items-start">
<h3 className="text-primary font-bold text-lg leading-tight">Advanced Cloud Infrastructure</h3>
<span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-1 rounded uppercase">IT</span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm">Dr. Sarah Jenkins</p>
<div className="flex items-center gap-4 mt-1 text-slate-600 dark:text-slate-300 text-xs">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">schedule</span>
                            12 Hours
                        </div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">signal_cellular_alt</span>
                            Advanced
                        </div>
</div>
<div className="flex items-center justify-between mt-4">
<p className="text-xl font-bold text-primary">$89.99</p>
<button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90">Enroll</button>
</div>
</div>
</div>
{/*  Course Card 2  */}
<div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-primary/10">
<div className="h-40 w-full bg-cover bg-center" data-alt="Green lush sustainable farm fields" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2jufNBgdfSeILmYDCtku9bBnOXGZ6tmm2KmE315qgzhcxR5dXjjpK-AzX9IIC0WTliroRLPPTZjALO6bncSbd0EhC9YaXaTa-fuOtLHkiCF8bzobopdIdgkGaCLiYHf02EUggWaRtqOLubj65k40jQbVvxT_gzWK-tvfoUOlDYu2xQLRTEXDyaVhH_w4bdFw9gNRAiAysZlTNaGdi0JKJgP5P1wl3RrNOpNjEJX2UHwmhiX079NzBVwUGJtLhQK3UBWAoEa6znacL')" }}></div>
<div className="p-4 flex flex-col gap-2">
<div className="flex justify-between items-start">
<h3 className="text-primary font-bold text-lg leading-tight">Sustainable Urban Farming</h3>
<span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-1 rounded uppercase">Agriculture</span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm">Marcus Thorne</p>
<div className="flex items-center gap-4 mt-1 text-slate-600 dark:text-slate-300 text-xs">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">schedule</span>
                            8 Hours
                        </div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">signal_cellular_alt</span>
                            Beginner
                        </div>
</div>
<div className="flex items-center justify-between mt-4">
<p className="text-xl font-bold text-primary">$45.00</p>
<button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90">Enroll</button>
</div>
</div>
</div>
{/*  Course Card 3  */}
<div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-primary/10">
<div className="h-40 w-full bg-cover bg-center" data-alt="Doctor holding a digital tablet in clinic" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0R9Q2GE1qlLzbI0rhQ9wd5gUFEz2VMdKXXxakcx9WbbGhqNQM9bcJhK0Llasf38PSwerFnXmfqRUX0ZE8lHhe9fKbVC40XYxUPUiwhXplncFIOPTj8AF5r7CqCIJjpdW0CHxMvqZpnXKNbbtjLx_0uv4-FP_x4UX1YXbG2-vJKugyxTusrFNEAhoDiozfvcRZzUmAtnChZRKTg8tuMdQUSrRiuKF-fSwn4CDMpAcW6akfmpGm1PHxSLWx0yA1uQRibmg_pZfakWzL')" }}></div>
<div className="p-4 flex flex-col gap-2">
<div className="flex justify-between items-start">
<h3 className="text-primary font-bold text-lg leading-tight">Patient Care Management</h3>
<span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-1 rounded uppercase">Health</span>
</div>
<p className="text-slate-500 dark:text-slate-400 text-sm">Emily Rodriguez, RN</p>
<div className="flex items-center gap-4 mt-1 text-slate-600 dark:text-slate-300 text-xs">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">schedule</span>
                            15 Hours
                        </div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">signal_cellular_alt</span>
                            Intermediate
                        </div>
</div>
<div className="flex items-center justify-between mt-4">
<p className="text-xl font-bold text-primary">$64.50</p>
<button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90">Enroll</button>
</div>
</div>
</div>
</div>
{/*  Bottom Navigation Bar  */}
<nav className="fixed bottom-0 left-0 right-0 border-t border-primary/10 bg-white dark:bg-slate-900 px-4 pb-4 pt-2 flex justify-between items-center z-20">
<a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined">home</span>
<p className="text-[10px] font-medium">Home</p>
</a>
<a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary/50" href="#">
<span className="material-symbols-outlined">book_4</span>
<p className="text-[10px] font-medium">My Courses</p>
</a>
<a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary/50" href="#">
<span className="material-symbols-outlined">search</span>
<p className="text-[10px] font-medium">Search</p>
</a>
<a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary/50" href="#">
<span className="material-symbols-outlined">person</span>
<p className="text-[10px] font-medium">Profile</p>
</a>
</nav>
</div>

    </div>
  );
};

export default CourseMarketplace;
