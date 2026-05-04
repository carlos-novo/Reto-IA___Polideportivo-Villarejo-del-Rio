"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getFacilities } from "@/modules/facilities/services/facilitiesService";
import {
  cancelReservation,
  createReservation,
  getReservations,
  type CreateReservationInput,
} from "@/modules/reservations/services/reservationsService";
import type { Facility } from "@/shared/types/facilities";
import type { Reservation } from "@/shared/types/reservations";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { Table, type Column } from "@/shared/components/Table";

function statusLabel(s: Reservation["status"]) {
  switch (s) {
    case "active":
      return "Activa";
    case "pending":
      return "Pendiente";
    case "cancelled":
      return "Cancelada";
    default:
      return s;
  }
}

function formatDate(isoDate: string) {
  // isoDate: YYYY-MM-DD
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ReservationsPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [rows, setRows] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [form, setForm] = useState<CreateReservationInput>(() => ({
    userName: "",
    facilityId: "",
    facilityName: "",
    date: new Date().toISOString().slice(0, 10),
    startTime: "18:00",
    endTime: "19:00",
  }));

  async function refresh() {
    setIsLoading(true);
    const [r, f] = await Promise.all([getReservations(), getFacilities()]);
    setRows(r);
    setFacilities(f);
    setIsLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const facilityOptions = useMemo(() => {
    return facilities.map((f) => ({
      id: f.id,
      name: f.name,
    }));
  }, [facilities]);

  const columns: Column<Reservation>[] = [
    {
      key: "facilityName",
      header: "Instalación",
      render: (r) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-slate-900">
            {r.facilityName}
          </div>
          <div className="truncate text-xs text-slate-500">{r.facilityId}</div>
        </div>
      ),
    },
    {
      key: "userName",
      header: "Usuario",
      render: (r) => <span className="text-slate-800">{r.userName}</span>,
    },
    {
      key: "date",
      header: "Fecha",
      render: (r) => (
        <span className="tabular-nums text-slate-700">{formatDate(r.date)}</span>
      ),
    },
    {
      key: "time",
      header: "Horario",
      render: (r) => (
        <span className="tabular-nums text-slate-700">
          {r.startTime}–{r.endTime}
        </span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (r) => <StatusBadge value={r.status} label={statusLabel(r.status)} />,
    },
    {
      key: "actions",
      header: "Acciones",
      className: "text-right",
      render: (r) => (
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={r.status === "cancelled"}
            onClick={async () => {
              setErrorMsg(null);
              setSuccessMsg(null);
              const updated = await cancelReservation(r.id);
              if (!updated) {
                setErrorMsg("No se pudo cancelar la reserva.");
                return;
              }
              setRows((prev) =>
                prev.map((x) => (x.id === r.id ? { ...x, status: "cancelled" } : x))
              );
              setSuccessMsg("Reserva cancelada correctamente.");
            }}
          >
            Cancelar
          </button>
        </div>
      ),
    },
  ];

  const activeCount = rows.filter((r) => r.status === "active").length;
  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div>
      <PageHeader
        title="Reservas"
        description="Alta, consulta y cancelación de reservas (demo con datos simulados)"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/reservations/calendar"
              className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Ver calendario semanal
            </Link>
            <button
              type="button"
              onClick={() => {
                setShowForm((v) => !v);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Nueva reserva
            </button>
          </div>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {rows.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">Reservas en sistema</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Activas
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {activeCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">No canceladas</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Pendientes
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {pendingCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">En revisión</div>
        </Card>
      </div>

      {showForm && (
        <div className="mb-6">
          <Card
            title="Nueva reserva"
            subtitle="Validación simple: misma instalación + misma fecha + misma hora de inicio"
            right={
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cerrar
              </button>
            }
          >
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Usuario
                </label>
                <input
                  className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
                  placeholder="Nombre del usuario / entidad"
                  value={form.userName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, userName: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Instalación
                </label>
                <select
                  className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
                  value={form.facilityId}
                  onChange={(e) => {
                    const id = e.target.value;
                    const name =
                      facilityOptions.find((x) => x.id === id)?.name ?? "";
                    setForm((p) => ({ ...p, facilityId: id, facilityName: name }));
                  }}
                >
                  <option value="">Selecciona…</option>
                  {facilityOptions.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <div className="mt-1 text-[11px] text-slate-500">
                  Datos desde <span className="font-mono">mock-data/facilities.ts</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">Fecha</label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
                  value={form.date}
                  onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Hora inicio
                </label>
                <input
                  type="time"
                  className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
                  value={form.startTime}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, startTime: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Hora fin
                </label>
                <input
                  type="time"
                  className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
                  value={form.endTime}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, endTime: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    setErrorMsg(null);
                    setSuccessMsg(null);

                    const facilityName =
                      form.facilityName ||
                      facilityOptions.find((x) => x.id === form.facilityId)?.name ||
                      "";

                    const result = await createReservation({
                      ...form,
                      facilityName,
                    });

                    if (!result.ok) {
                      setErrorMsg(result.message);
                      return;
                    }

                    setSuccessMsg("Reserva creada correctamente.");
                    setRows((prev) => [result.reservation, ...prev]);
                    setForm((p) => ({
                      ...p,
                      userName: "",
                      // mantenemos el resto para agilizar altas
                    }));
                  }}
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Guardar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm((p) => ({
                      ...p,
                      userName: "",
                      facilityId: "",
                      facilityName: "",
                      date: new Date().toISOString().slice(0, 10),
                      startTime: "18:00",
                      endTime: "19:00",
                    }));
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Limpiar
                </button>
              </div>
            </div>

            {(errorMsg || successMsg) && (
              <div className="mt-4">
                {errorMsg && (
                  <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                    {successMsg}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Reservas registradas
        </div>
        <button
          type="button"
          className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          onClick={async () => {
            setErrorMsg(null);
            setSuccessMsg(null);
            await refresh();
          }}
        >
          Refrescar
        </button>
      </div>

      <Table
        columns={columns}
        rows={isLoading ? [] : rows}
        emptyState={
          isLoading ? "Cargando reservas…" : "No hay reservas registradas"
        }
      />

      <div className="mt-4 rounded-md border bg-white p-4 text-xs text-slate-600">
        Nota: las altas/cancelaciones se simulan en memoria (no persisten al recargar).
        Para capturas, esta pantalla representa el flujo administrativo principal.
      </div>
    </div>
  );
}
