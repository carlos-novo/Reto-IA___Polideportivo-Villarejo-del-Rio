import { getFacilities } from "@/modules/facilities/services/facilitiesService";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { Table, type Column } from "@/shared/components/Table";
import type { Facility } from "@/shared/types/facilities";

function typeLabel(type: Facility["type"]) {
  switch (type) {
    case "court":
      return "Pista";
    case "fitness":
      return "Fitness";
    case "pool":
      return "Piscina";
    default:
      return type;
  }
}

function statusLabel(status: Facility["status"]) {
  switch (status) {
    case "available":
      return "Disponible";
    case "occupied":
      return "Ocupada";
    case "maintenance":
      return "Mantenimiento";
    default:
      return status;
  }
}

export default async function FacilitiesPage() {
  const facilities = await getFacilities();

  const columns: Column<Facility>[] = [
    {
      key: "name",
      header: "Instalación",
      render: (r) => <span className="font-medium text-slate-900">{r.name}</span>,
    },
    {
      key: "type",
      header: "Tipo",
      render: (r) => <span className="text-slate-700">{typeLabel(r.type)}</span>,
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
      render: () => (
        <button
          className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          type="button"
        >
          Ver disponibilidad
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Instalaciones"
        description="Listado y estado operativo de las instalaciones (datos simulados)"
        actions={
          <div className="rounded-md border bg-white px-3 py-2 text-xs text-slate-600">
            Total: <span className="font-medium text-slate-900">{facilities.length}</span>
          </div>
        }
      />

      <Table
        columns={columns}
        rows={facilities}
        emptyState="No hay instalaciones registradas"
      />

      <div className="mt-4 rounded-md border bg-white p-4 text-xs text-slate-600">
        Nota: “Ver disponibilidad” es una acción de interfaz en esta versión demo (sin
        backend). En el siguiente módulo se conectará con reservas simuladas.
      </div>
    </div>
  );
}
