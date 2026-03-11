function OverviewPage() {
  return (
    <section className="space-y-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Welcome to Mentora
          </h2>
          <p className="mt-0.5 text-xs text-slate-600">
            A learning and scholarship platform designed for rural learners, NGOs, donors, and educators.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-teal-deep/10 px-3 py-1 text-[11px] font-medium text-teal-deep">
          Learn · Earn · Grow
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <article className="rounded-xl bg-slate-50/90 p-3">
          <p className="text-xs font-semibold text-teal-deep">Students</p>
          <p className="mt-1 text-xs text-slate-600">
            Join courses, follow your progress, and keep all your certificates in one place.
          </p>
        </article>
        <article className="rounded-xl bg-slate-50/90 p-3">
          <p className="text-xs font-semibold text-teal-deep">NGOs &amp; Educators</p>
          <p className="mt-1 text-xs text-slate-600">
            Manage programs, cohorts, and learning outcomes for marginalized communities.
          </p>
        </article>
        <article className="rounded-xl bg-slate-50/90 p-3">
          <p className="text-xs font-semibold text-teal-deep">Donors</p>
          <p className="mt-1 text-xs text-slate-600">
            See how your support turns into real learning opportunities for communities.
          </p>
        </article>
      </div>

      <ul className="mt-1 grid list-none grid-cols-1 gap-2 text-xs text-slate-700 sm:grid-cols-2">
        <li className="flex items-start gap-2">
          <span className="mt-0.5 h-1.5 w-1.5 flex-none rounded-full bg-green-earth" />
          <div>
            <p className="font-semibold">Mobile-first design</p>
            <p className="text-[11px] text-slate-600">
              Optimized for low-end Android devices and intermittent connectivity.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 h-1.5 w-1.5 flex-none rounded-full bg-green-earth" />
          <div>
            <p className="font-semibold">Transparent by default</p>
            <p className="text-[11px] text-slate-600">
              Every certificate and scholarship traceable through the Mentora API.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default OverviewPage;

