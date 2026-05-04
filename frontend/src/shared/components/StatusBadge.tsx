const VARIANTS: Record<string, { className: string; label?: string }> = {
  // Estados genéricos
  active: {
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    label: "Activo",
  },
  inactive: {
    className: "bg-slate-50 text-slate-700 ring-slate-600/20",
    label: "Inactivo",
  },
  pending: {
    className: "bg-blue-50 text-blue-700 ring-blue-600/20",
    label: "Pendiente",
  },
  cancelled: {
    className: "bg-slate-50 text-slate-600 ring-slate-500/20",
    label: "Cancelada",
  },

  // Instalaciones
  available: {
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    label: "Disponible",
  },
  occupied: {
    className: "bg-amber-50 text-amber-700 ring-amber-600/20",
    label: "Ocupado",
  },
  maintenance: {
    className: "bg-rose-50 text-rose-700 ring-rose-600/20",
    label: "Mantenimiento",
  },

  // Material / préstamos
  borrowed: {
    className: "bg-amber-50 text-amber-700 ring-amber-600/20",
    label: "Prestado",
  },
  returned: {
    className: "bg-slate-50 text-slate-700 ring-slate-600/20",
    label: "Devuelto",
  },
  overdue: {
    className: "bg-rose-50 text-rose-700 ring-rose-600/20",
    label: "Vencido",
  },
};

export function StatusBadge({
  value,
  label,
}: {
  value: string;
  label?: string;
}) {
  const variant = VARIANTS[value] ?? {
    className: "bg-slate-50 text-slate-700 ring-slate-600/20",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
        "whitespace-nowrap",
        variant.className,
      ].join(" ")}
    >
      {label ?? variant.label ?? value}
    </span>
  );
}
