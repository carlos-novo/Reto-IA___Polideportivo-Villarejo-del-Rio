import { PageHeader } from "@/shared/components/PageHeader";
import { Table, type Column } from "@/shared/components/Table";
import { KpiCard } from "@/modules/dashboard/components/KpiCard";
import {
  getDashboardKpis,
  getFacilityUsage,
} from "@/modules/dashboard/services/dashboardService";

type FacilityUsageRow = {
  facilityName: string;
  reservationsThisWeek: number;
};

export default async function DashboardPage() {
  const [kpis, usage] = await Promise.all([
    getDashboardKpis(),
    getFacilityUsage(),
  ]);

  const columns: Column<FacilityUsageRow>[] = [
    {
      key: "facilityName",
      header: "Instalación",
      render: (r) => <span className="font-medium text-slate-900">{r.facilityName}</span>,
    },
    {
      key: "reservationsThisWeek",
      header: "Reservas (semana)",
      className: "text-right",
      render: (r) => (
        <span className="tabular-nums text-slate-700">
          {r.reservationsThisWeek}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Visión general del estado del polideportivo (datos simulados)"
        actions={
          <div className="rounded-md border bg-white px-3 py-2 text-xs text-slate-600">
            Última actualización: hoy
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Reservas activas"
          value={String(kpis.activeReservations)}
          helper="En el sistema (no canceladas)"
        />
        <KpiCard
          label="Ocupación"
          value={`${Math.round(kpis.occupancyRate * 100)}%`}
          helper="Estimación semanal"
        />
        <KpiCard
          label="Instalación más usada"
          value={kpis.mostUsedFacility}
          helper="Últimos 7 días"
        />
        <KpiCard
          label="Material prestado"
          value={String(kpis.equipmentOnLoan)}
          helper="Préstamos activos"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 text-sm font-semibold text-slate-900">
            Uso por instalación (semana)
          </div>
          <Table columns={columns} rows={usage} />
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">
            Incidencias destacadas
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="flex items-start justify-between gap-4">
              <span>Revisión programada: Piscina Cubierta</span>
              <span className="text-xs text-slate-500">Jue 16:00</span>
            </li>
            <li className="flex items-start justify-between gap-4">
              <span>Material deteriorado: 2 balones</span>
              <span className="text-xs text-slate-500">Pendiente</span>
            </li>
            <li className="flex items-start justify-between gap-4">
              <span>Alta demanda: Pistas polideportivas</span>
              <span className="text-xs text-slate-500">18:00–21:00</span>
            </li>
          </ul>

          <div className="mt-4 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
            Nota: esta pantalla es una demo sin backend; los datos provienen de
            <span className="font-mono"> src/mock-data</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
