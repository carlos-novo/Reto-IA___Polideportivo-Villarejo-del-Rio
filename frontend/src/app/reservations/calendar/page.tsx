"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getFacilities } from "@/modules/facilities/services/facilitiesService";
import { getReservations } from "@/modules/reservations/services/reservationsService";
import type { Facility } from "@/mock-data/facilities";
import type { Reservation } from "@/mock-data/reservations";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatusBadge } from "@/shared/components/StatusBadge";

type DayCol = {
  key: string;
  label: string;
  date: string; // YYYY-MM-DD
};

function toIsoDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function startOfWeekMonday(base: Date) {
  const d = new Date(base);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 Sun ... 6 Sat
  const diff = day === 0 ? -6 : 1 - day; // move to Monday
  d.setDate(d.getDate() + diff);
  return d;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function formatShortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" });
}

function statusForReservation(r: Reservation) {
  // Normalizamos a variantes existentes del StatusBadge
  if (r.status === "cancelled") return { value: "cancelled", label: "Cancelada" };
  if (r.status === "pending") return { value: "pending", label: "Pendiente" };
  return { value: "active", label: "Activa" };
}

export default function ReservationsCalendarPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const [weekStartIso, setWeekStartIso] = useState(() =>
    toIsoDate(startOfWeekMonday(new Date()))
  );

  async function refresh() {
    setLoading(true);
    const [f, r] = await Promise.all([getFacilities(), getReservations()]);
    setFacilities(f);
    setReservations(r);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const weekStartDate = useMemo(() => {
    const [y, m, d] = weekStartIso.split("-").map(Number);
    const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
    dt.setHours(0, 0, 0, 0);
    return dt;
  }, [weekStartIso]);

  const days: DayCol[] = useMemo(() => {
    const labels = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];

    return labels.map((label, idx) => {
      const date = toIsoDate(addDays(weekStartDate, idx));
      return { key: `d${idx}`, label, date };
    });
  }, [weekStartDate]);

  const rangeLabel = useMemo(() => {
    const start = days[0]?.date;
    const end = days[6]?.date;
    if (!start || !end) return "";
    return `${formatShortDate(start)} → ${formatShortDate(end)}`;
  }, [days]);

  const reservationsByFacilityAndDate = useMemo(() => {
    const map = new Map<string, Reservation[]>();
    for (const r of reservations) {
      const key = `${r.facilityId}__${r.date}`;
      const list = map.get(key) ?? [];
      list.push(r);
      map.set(key, list);
    }
    // ordenar por hora inicio
    for (const [key, list] of map.entries()) {
      list.sort((a, b) => a.startTime.localeCompare(b.startTime));
      map.set(key, list);
    }
    return map;
  }, [reservations]);

  const activeCount = reservations.filter((r) => r.status === "active").length;
  const cancelledCount = reservations.filter((r) => r.status === "cancelled").length;

  return (
    <div>
      <PageHeader
        title="Calendario semanal de reservas"
        description="Visión operativa por instalación y día de la semana (datos simulados)"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/reservations"
              className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Volver a listado
            </Link>
            <button
              type="button"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              onClick={() => setWeekStartIso(toIsoDate(startOfWeekMonday(new Date())))}
            >
              Semana actual
            </button>
          </div>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Rango semana
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{rangeLabel}</div>
          <div className="mt-1 text-xs text-slate-500">Lunes a domingo</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Instalaciones
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {facilities.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">En catálogo</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Reservas activas
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{activeCount}</div>
          <div className="mt-1 text-xs text-slate-500">En sistema</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Canceladas
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {cancelledCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">Histórico visible</div>
        </Card>
      </div>

      <Card
        title="Planificación semanal"
        subtitle="Cada celda muestra reservas (usuario + horario). Si no hay reservas: “Disponible”."
        right={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setWeekStartIso(toIsoDate(addDays(weekStartDate, -7)))}
            >
              ← Semana anterior
            </button>
            <button
              type="button"
              className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setWeekStartIso(toIsoDate(addDays(weekStartDate, 7)))}
            >
              Semana siguiente →
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-56 border-b bg-white px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Instalación
                </th>
                {days.map((d) => (
                  <th
                    key={d.key}
                    className="min-w-[180px] border-b bg-white px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span>{d.label}</span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {formatShortDate(d.date)}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={days.length + 1}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    Cargando calendario…
                  </td>
                </tr>
              ) : facilities.length === 0 ? (
                <tr>
                  <td
                    colSpan={days.length + 1}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No hay instalaciones disponibles
                  </td>
                </tr>
              ) : (
                facilities.map((f) => (
                  <tr key={f.id} className="align-top">
                    <td className="sticky left-0 z-10 border-b bg-white px-4 py-4">
                      <div className="font-medium text-slate-900">{f.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{f.id}</div>
                      <div className="mt-2">
                        <StatusBadge
                          value={f.status}
                          label={
                            f.status === "available"
                              ? "Disponible"
                              : f.status === "occupied"
                                ? "Ocupada"
                                : "Mantenimiento"
                          }
                        />
                      </div>
                    </td>

                    {days.map((d) => {
                      const key = `${f.id}__${d.date}`;
                      const list = reservationsByFacilityAndDate.get(key) ?? [];
                      const hasAny = list.length > 0;

                      return (
                        <td key={d.key} className="border-b px-4 py-4">
                          {!hasAny ? (
                            <div className="rounded-md border border-dashed bg-slate-50 px-3 py-3 text-xs text-slate-500">
                              Disponible
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {list.map((r) => {
                                const badge = statusForReservation(r);
                                return (
                                  <div
                                    key={r.id}
                                    className="rounded-md border bg-white px-3 py-2 shadow-sm"
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="min-w-0">
                                        <div className="truncate text-xs font-medium text-slate-900">
                                          {r.userName}
                                        </div>
                                        <div className="mt-0.5 text-[11px] text-slate-500 tabular-nums">
                                          {r.startTime}–{r.endTime}
                                        </div>
                                      </div>
                                      <StatusBadge value={badge.value} label={badge.label} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-md border bg-white p-4 text-xs text-slate-600">
          Nota: esta vista se alimenta de <span className="font-mono">reservationsService</span>{" "}
          y representa una planificación operativa semanal (sin backend real).
        </div>
      </Card>
    </div>
  );
}
