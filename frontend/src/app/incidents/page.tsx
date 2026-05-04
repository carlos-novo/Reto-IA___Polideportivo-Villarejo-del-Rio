"use client";

import { useEffect, useMemo, useState } from "react";
import { getEquipmentInventory, getEquipmentLoans } from "@/modules/equipment/services/equipmentService";
import { getReservations } from "@/modules/reservations/services/reservationsService";
import type { EquipmentItem } from "@/mock-data/equipment";
import type { EquipmentLoan } from "@/mock-data/equipmentLoans";
import type { Reservation } from "@/mock-data/reservations";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { Table, type Column } from "@/shared/components/Table";

function formatDateShort(isoDate: string) {
  // YYYY-MM-DD
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function IncidentsPage() {
  const [loading, setLoading] = useState(true);

  const [cancelledReservations, setCancelledReservations] = useState<Reservation[]>([]);
  const [overdueLoans, setOverdueLoans] = useState<EquipmentLoan[]>([]);
  const [damagedEquipment, setDamagedEquipment] = useState<EquipmentItem[]>([]);

  async function refresh() {
    setLoading(true);
    const [reservations, loans, inventory] = await Promise.all([
      getReservations(),
      getEquipmentLoans(),
      getEquipmentInventory(),
    ]);

    const cancelled = reservations
      .filter((r) => r.status === "cancelled")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5);

    const overdue = loans.filter((l) => l.status === "overdue");

    const damaged = inventory.filter((e) => e.condition === "damaged");

    setCancelledReservations(cancelled);
    setOverdueLoans(overdue);
    setDamagedEquipment(damaged);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const kpis = useMemo(() => {
    return {
      cancelled: cancelledReservations.length,
      overdue: overdueLoans.length,
      damaged: damagedEquipment.length,
    };
  }, [cancelledReservations.length, damagedEquipment.length, overdueLoans.length]);

  const cancelledColumns: Column<Reservation>[] = [
    {
      key: "facility",
      header: "Instalación",
      render: (r) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-slate-900">{r.facilityName}</div>
          <div className="truncate text-xs text-slate-500">{r.facilityId}</div>
        </div>
      ),
    },
    {
      key: "user",
      header: "Usuario",
      render: (r) => <span className="text-slate-800">{r.userName}</span>,
    },
    {
      key: "date",
      header: "Fecha / Hora",
      render: (r) => (
        <div className="text-slate-700">
          <div className="tabular-nums">{formatDateShort(r.date)}</div>
          <div className="text-[11px] text-slate-500 tabular-nums">
            {r.startTime}–{r.endTime}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: () => <StatusBadge value="cancelled" label="Cancelada" />,
    },
  ];

  const overdueColumns: Column<EquipmentLoan>[] = [
    {
      key: "equipment",
      header: "Material",
      render: (l) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-slate-900">{l.equipmentName}</div>
          <div className="truncate text-xs text-slate-500">{l.equipmentId}</div>
        </div>
      ),
    },
    {
      key: "borrower",
      header: "Prestado a",
      render: (l) => <span className="text-slate-800">{l.borrowerName}</span>,
    },
    {
      key: "return",
      header: "Devolución prevista",
      render: (l) => <span className="tabular-nums text-slate-700">{l.expectedReturnDate}</span>,
    },
    {
      key: "status",
      header: "Estado",
      render: () => <StatusBadge value="overdue" label="Vencido" />,
    },
  ];

  const damagedColumns: Column<EquipmentItem>[] = [
    {
      key: "name",
      header: "Material",
      render: (e) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-slate-900">{e.name}</div>
          <div className="truncate text-xs text-slate-500">{e.id}</div>
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (e) => (
        <span className="tabular-nums text-slate-700">
          {e.quantityAvailable} / {e.quantityTotal}
        </span>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: () => <StatusBadge value="maintenance" label="Deteriorado" />,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Panel de incidencias"
        description="Situaciones que requieren atención administrativa (datos simulados)"
        actions={
          <button
            type="button"
            onClick={refresh}
            className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Refrescar
          </button>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Cancelaciones recientes
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{kpis.cancelled}</div>
          <div className="mt-1 text-xs text-slate-500">Últimas 5 en el sistema</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Préstamos vencidos
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{kpis.overdue}</div>
          <div className="mt-1 text-xs text-slate-500">Requieren seguimiento</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Material deteriorado
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{kpis.damaged}</div>
          <div className="mt-1 text-xs text-slate-500">Revisión / reposición</div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="A) Reservas canceladas recientes"
          subtitle="Control de incidencias por cancelación (últimas 5)"
        >
          <Table
            columns={cancelledColumns}
            rows={loading ? [] : cancelledReservations}
            emptyState={loading ? "Cargando…" : "Sin incidencias registradas"}
          />
        </Card>

        <Card
          title="B) Préstamos vencidos"
          subtitle="Material sin devolución en fecha prevista"
        >
          <Table
            columns={overdueColumns}
            rows={loading ? [] : overdueLoans}
            emptyState={loading ? "Cargando…" : "Sin incidencias registradas"}
          />
        </Card>

        <Card
          title="C) Material deteriorado"
          subtitle="Elementos marcados como deteriorados"
        >
          <Table
            columns={damagedColumns}
            rows={loading ? [] : damagedEquipment}
            emptyState={loading ? "Cargando…" : "Sin incidencias registradas"}
          />
          <div className="mt-4 rounded-md border bg-white p-4 text-xs text-slate-600">
            Nota: en esta demo, “deteriorado” se controla con el campo <span className="font-mono">condition</span>.
          </div>
        </Card>
      </div>
    </div>
  );
}
