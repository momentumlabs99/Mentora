import { NavLink } from 'react-router-dom';

const items = [
  { to: '/app', label: 'Home', icon: HomeIcon, end: true },
  { to: '/app/courses', label: 'Courses', icon: BookIcon },
  { to: '/app/student', label: 'Student', icon: UserIcon },
  { to: '/app/donor', label: 'Donor', icon: HeartIcon },
  { to: '/app/verify', label: 'Verify', icon: CheckIcon },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-5">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'flex flex-col items-center justify-center gap-1 px-2 py-2 text-[10px] font-medium',
                isActive ? 'text-teal-deep' : 'text-slate-500',
              ].join(' ')
            }
          >
            <Icon />
            <span className="leading-none">{label}</span>
          </NavLink>
        ))}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

function IconBase({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function HomeIcon() {
  return (
    <IconBase>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10.5V20h14v-9.5" />
    </IconBase>
  );
}

function BookIcon() {
  return (
    <IconBase>
      <path d="M4 19a2 2 0 0 0 2 2h13" />
      <path d="M6 3h13v18H6a2 2 0 0 0-2 2V5a2 2 0 0 1 2-2z" />
    </IconBase>
  );
}

function UserIcon() {
  return (
    <IconBase>
      <path d="M20 21a8 8 0 1 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </IconBase>
  );
}

function HeartIcon() {
  return (
    <IconBase>
      <path d="M12 21s-7-4.4-9.5-8.5C.7 9.4 2.6 6 6.2 6c2 0 3.2 1.1 3.8 2 0.6-0.9 1.8-2 3.8-2 3.6 0 5.5 3.4 3.7 6.5C19 16.6 12 21 12 21z" />
    </IconBase>
  );
}

function CheckIcon() {
  return (
    <IconBase>
      <path d="M20 6 9 17l-5-5" />
    </IconBase>
  );
}

export default BottomNav;

