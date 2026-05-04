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
    // Advertencia / en curso: ámbar (más coherente que azul para backoffice)
    className: "bg-amber-50 text-amber-700 ring-amber-600/20",
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
    label: "Ocupada",
  },
  maintenance: {
    // Crítico / requiere intervención: rojo/rosa
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

  // Material (normalización de estados visibles)
  damaged: {
    className: "bg-rose-50 text-rose-700 ring-rose-600/20",
    label: "Deteriorado",
  },
  deteriorated: {
    className: "bg-rose-50 text-rose-700 ring-rose-600/20",
    label: "Deteriorado",
  },
};

export function StatusBadge({
  value,
  label,
}: {
  value: string;
  label?: string;
}) {
  // Normalización de valores para asegurar variantes explícitas en UI
  const normalized =
    value === "deteriorado" ||
    value === "deteriorada" ||
    value === "deteriorated"
      ? "deteriorated"
      : value === "damaged"
        ? "damaged"
        : value;

  const variant = VARIANTS[normalized] ?? {
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
