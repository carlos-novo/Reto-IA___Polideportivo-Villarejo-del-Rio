"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/facilities", label: "Instalaciones" },
  { href: "/reservations", label: "Reservas" },
  { href: "/equipment", label: "Material" },
  { href: "/users", label: "Usuarios" },
  { href: "/incidents", label: "Incidencias" },
];

function isActivePath(current: string, href: string) {
  if (href === "/dashboard") {
    return current === "/" || current === "/dashboard";
  }
  return current === href || current.startsWith(`${href}/`);
}

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-white md:flex">
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-slate-900" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">Villarejo</div>
            <div className="text-xs text-slate-500">Polideportivo</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname ? isActivePath(pathname, item.href) : false;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "block rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <div className="rounded-md bg-slate-50 p-3 text-xs text-slate-600">
          <div className="font-medium text-slate-800">Entorno: Demo</div>
          <div className="mt-1">
            Datos simulados (mock) · Sin autenticación real
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-3">
        <div className="text-sm font-medium text-slate-900">
          Sistema de Gestión
        </div>
        <div className="text-xs text-slate-500">
          Polideportivo Municipal de Villarejo del Río
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right leading-tight">
          <div className="text-xs text-slate-500">Usuario simulado</div>
          <div className="text-sm font-medium text-slate-900">
            Marta Gómez (Recepción)
          </div>
        </div>
        <div className="h-9 w-9 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-[1600px]">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
