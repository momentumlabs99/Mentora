import { NavLink } from "react-router-dom";
import { useAuth } from "../state/auth";

function BottomNav() {
  const { role } = useAuth();

  const getItemsForRole = () => {
    const baseItems = [
      {
        to: "/app",
        label: "Home",
        icon: HomeIcon,
        end: true,
        roles: ["ADMIN", "NGO", "STUDENT"],
      },
    ];

    if (role === "ADMIN") {
      return [
        ...baseItems,
        {
          to: "/app/courses",
          label: "Courses",
          icon: BookIcon,
          roles: ["ADMIN"],
        },
        {
          to: "/app/student",
          label: "Students",
          icon: UserIcon,
          roles: ["ADMIN"],
        },
        { to: "/app/ngo", label: "NGOs", icon: BuildingIcon, roles: ["ADMIN"] },
        {
          to: "/app/verify",
          label: "Verify",
          icon: CheckIcon,
          roles: ["ADMIN"],
        },
        {
          to: "/app/profile",
          label: "Profile",
          icon: UserIcon,
          roles: ["ADMIN"],
        },
      ];
    }

    if (role === "NGO") {
      return [
        ...baseItems,
        {
          to: "/app/courses",
          label: "Courses",
          icon: BookIcon,
          roles: ["NGO"],
        },
        { to: "/app/donor", label: "Funds", icon: HeartIcon, roles: ["NGO"] },
        { to: "/app/verify", label: "Verify", icon: CheckIcon, roles: ["NGO"] },
        {
          to: "/app/profile",
          label: "Profile",
          icon: BuildingIcon,
          roles: ["NGO"],
        },
      ];
    }

    if (role === "STUDENT") {
      return [
        ...baseItems,
        {
          to: "/app/courses",
          label: "Courses",
          icon: BookIcon,
          roles: ["STUDENT"],
        },
        {
          to: "/app/certificates",
          label: "Certificates",
          icon: CertificateIcon,
          roles: ["STUDENT"],
        },
        {
          to: "/app/profile",
          label: "Profile",
          icon: UserIcon,
          roles: ["STUDENT"],
        },
      ];
    }

    // Default items
    return [
      { to: "/app", label: "Home", icon: HomeIcon, end: true },
      { to: "/app/courses", label: "Courses", icon: BookIcon },
      { to: "/app/student", label: "Student", icon: UserIcon },
      { to: "/app/donor", label: "Donor", icon: HeartIcon },
      { to: "/app/verify", label: "Verify", icon: CheckIcon },
    ];
  };

  const items = getItemsForRole();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-100 bg-white/95 backdrop-blur-lg">
      <div
        className="mx-auto grid max-w-lg"
        style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
      >
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                "relative flex flex-col items-center justify-center gap-0.5 px-1 py-2.5 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-teal-deep"
                  : "text-slate-400 active:text-slate-600",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-teal-deep" />
                )}
                <Icon />
                <span className="leading-none">{label}</span>
              </>
            )}
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
      strokeWidth="1.8"
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
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  );
}

function CertificateIcon() {
  return (
    <IconBase>
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  );
}

function PaymentsIcon() {
  return (
    <IconBase>
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </IconBase>
  );
}

function BuildingIcon() {
  return (
    <IconBase>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9v.01" />
      <path d="M9 12v.01" />
      <path d="M9 15v.01" />
      <path d="M9 18v.01" />
    </IconBase>
  );
}

export default BottomNav;
