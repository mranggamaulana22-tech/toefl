// src/components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/auth-session";

type NavbarProps = {
  showLogout?: boolean;
  onLogout?: () => void;
  toggleDemoMode?: () => void;
  hasTakenTest?: boolean;
  isDemo?: boolean;
};

const studentNavItems = [
  { href: "/student/dashboard", label: "Home" },
  { href: "/student/history", label: "History" },
];

const adminNavItems = [
  { href: "/admin/questions", label: "Questions" },
  { href: "/admin/students", label: "Students" },
];

export default function Navbar({ showLogout = true, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isAdminArea = pathname.startsWith("/admin");
  const navItems = isAdminArea ? adminNavItems : studentNavItems;

  const activeIndex = navItems.findIndex((item) => pathname === item.href);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      return;
    }

    clearAuthSession();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1e293b] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={isAdminArea ? "/admin/questions" : "/student/dashboard"} className="font-bold text-base tracking-tight">
            TOEFL Analytics
          </Link>

          <nav className="relative flex bg-[#0f172a]/60 p-1 rounded-full border border-slate-700/40 text-xs font-semibold">
            {activeIndex !== -1 && (
              <div
                className="absolute top-1 bottom-1 left-1 rounded-full bg-[#334155] shadow-sm transition-all duration-300 ease-in-out"
                style={{
                  width: `calc(${100 / navItems.length}% - 4px)`,
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
              />
            )}

            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative z-10 px-5 py-1.5 rounded-full transition-colors duration-200 min-w-[86px] text-center block ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {showLogout ? (
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-all hover:translate-x-0.5"
          >
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </header>
  );
}
