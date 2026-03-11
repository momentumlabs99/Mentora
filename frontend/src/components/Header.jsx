function Header() {
  return (
    <header className="flex flex-col gap-3 rounded-3xl bg-teal-deep px-4 py-4 text-white shadow-sm sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-100">
            Mentora
          </p>
          <h1 className="mt-0.5 text-lg font-semibold sm:text-xl">
            Learning & Scholarships
          </h1>
        </div>
        <div className="hidden flex-col items-end text-[11px] sm:flex">
          <span className="rounded-full bg-white/10 px-3 py-1 font-medium">
            Rural-first · Humanitarian
          </span>
          <span className="mt-1 text-teal-100">
            For learners, NGOs & donors
          </span>
        </div>
      </div>
      <p className="max-w-xl text-xs text-teal-100">
        Mentora helps students learn, keep their certificates safe, and follow how scholarships are used.
      </p>
    </header>
  );
}

export default Header;

