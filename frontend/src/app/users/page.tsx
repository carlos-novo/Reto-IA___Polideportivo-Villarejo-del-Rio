"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@/mock-data/users";
import { getUsers, setUserStatus } from "@/modules/users/services/usersService";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { Table, type Column } from "@/shared/components/Table";

function roleLabel(role: User["role"]) {
  switch (role) {
    case "admin":
      return "Administrador";
    case "receptionist":
      return "Recepción";
    case "coach":
      return "Monitor";
    default:
      return role;
  }
}

function roleBadgeValue(role: User["role"]) {
  // Reutilizamos variantes existentes del StatusBadge
  if (role === "admin") return "active";
  if (role === "receptionist") return "pending";
  return "available";
}

function userStatusLabel(status: User["status"]) {
  return status === "active" ? "Activo" : "Inactivo";
}

function userStatusBadgeValue(status: User["status"]) {
  return status === "active" ? "active" : "inactive";
}

export default function UsersPage() {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ type: "ok" | "error"; text: string } | null>(
    null
  );

  async function refresh() {
    setLoading(true);
    const u = await getUsers();
    setRows(u);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const kpis = useMemo(() => {
    const total = rows.length;
    const active = rows.filter((u) => u.status === "active").length;
    const inactive = rows.filter((u) => u.status === "inactive").length;
    const byRole = {
      admin: rows.filter((u) => u.role === "admin").length,
      receptionist: rows.filter((u) => u.role === "receptionist").length,
      coach: rows.filter((u) => u.role === "coach").length,
    };
    return { total, active, inactive, byRole };
  }, [rows]);

  const columns: Column<User>[] = [
    {
      key: "user",
      header: "Usuario",
      render: (r) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-slate-900">{r.fullName}</div>
          <div className="truncate text-xs text-slate-500">{r.id}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Rol",
      render: (r) => (
        <div className="flex items-center gap-2">
          <StatusBadge value={roleBadgeValue(r.role)} label={roleLabel(r.role)} />
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contacto",
      render: (r) => (
        <div className="min-w-0">
          <div className="truncate text-slate-800">{r.email}</div>
          <div className="truncate text-xs text-slate-500">{r.phone}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (r) => (
        <StatusBadge
          value={userStatusBadgeValue(r.status)}
          label={userStatusLabel(r.status)}
        />
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      className: "text-right",
      render: (r) => {
        const next = r.status === "active" ? "inactive" : "active";
        return (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              onClick={async () => {
                setMsg(null);
                const updated = await setUserStatus(r.id, next);
                if (!updated) {
                  setMsg({ type: "error", text: "No se pudo actualizar el estado." });
                  return;
                }
                setRows((prev) => prev.map((x) => (x.id === r.id ? updated : x)));
                setMsg({
                  type: "ok",
                  text:
                    updated.status === "active"
                      ? "Usuario activado."
                      : "Usuario desactivado.",
                });
              }}
            >
              {next === "active" ? "Activar" : "Desactivar"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PageHeader
        title="Usuarios"
        description="Gestión básica de usuarios y roles (demo sin autenticación real)"
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Nuevo usuario
            </button>
            <button
              type="button"
              className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={async () => {
                setMsg(null);
                await refresh();
              }}
            >
              Refrescar
            </button>
          </div>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total usuarios
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {kpis.total}
          </div>
          <div className="mt-1 text-xs text-slate-500">Personal del centro (simulado)</div>
        </Card>

        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Activos
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {kpis.active}
          </div>
          <div className="mt-1 text-xs text-slate-500">Operativos</div>
        </Card>

        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Inactivos
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {kpis.inactive}
          </div>
          <div className="mt-1 text-xs text-slate-500">Sin turnos asignados</div>
        </Card>

        <Card
          title="Distribución por rol"
          subtitle="Recuento actual"
        >
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Administrador</span>
              <span className="tabular-nums font-medium text-slate-900">
                {kpis.byRole.admin}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Recepción</span>
              <span className="tabular-nums font-medium text-slate-900">
                {kpis.byRole.receptionist}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Monitores</span>
              <span className="tabular-nums font-medium text-slate-900">
                {kpis.byRole.coach}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {msg && (
        <div className="mb-6">
          <div
            className={[
              "rounded-md border px-3 py-2 text-sm",
              msg.type === "ok"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-700",
            ].join(" ")}
          >
            {msg.text}
          </div>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">Listado de usuarios</div>
        <div className="text-xs text-slate-600">{rows.length} registros</div>
      </div>

      <Table
        columns={columns}
        rows={loading ? [] : rows}
        emptyState={loading ? "Cargando usuarios…" : "No hay usuarios"}
      />

      <div className="mt-4 rounded-md border bg-white p-4 text-xs text-slate-600">
        Nota: esta versión no incluye autenticación real. Los roles se muestran para
        simular un sistema administrativo municipal.
      </div>
    </div>
  );
}
