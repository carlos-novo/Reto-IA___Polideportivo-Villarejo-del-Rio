"use client";

import { useEffect, useMemo, useState } from "react";
import type { EquipmentItem } from "@/shared/types/equipment";
import type { EquipmentLoan } from "@/shared/types/equipmentLoans";
import {
  closeLoan,
  getEquipmentInventory,
  getEquipmentLoans,
  markEquipmentDamaged,
} from "@/modules/equipment/services/equipmentService";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { StatusBadge } from "@/shared/components/StatusBadge";
import { Table, type Column } from "@/shared/components/Table";

function conditionLabel(c: EquipmentItem["condition"]) {
  switch (c) {
    case "good":
      return "Óptimo";
    case "worn":
      return "Desgaste";
    case "damaged":
      return "Deteriorado";
    default:
      return c;
  }
}

function conditionBadgeValue(c: EquipmentItem["condition"]) {
  // Reutilizamos variantes existentes del StatusBadge (sin librerías ni variantes nuevas complejas)
  if (c === "good") return "available";
  if (c === "worn") return "pending";
  return "maintenance";
}

function loanStatusLabel(s: EquipmentLoan["status"]) {
  switch (s) {
    case "active":
      return "Activo";
    case "returned":
      return "Devuelto";
    case "overdue":
      return "Vencido";
    default:
      return s;
  }
}

function loanBadgeValue(s: EquipmentLoan["status"]) {
  if (s === "active") return "borrowed";
  if (s === "returned") return "returned";
  return "overdue";
}

export default function EquipmentPage() {
  const [inventory, setInventory] = useState<EquipmentItem[]>([]);
  const [loans, setLoans] = useState<EquipmentLoan[]>([]);
  const [loading, setLoading] = useState(true);

  const [msg, setMsg] = useState<{ type: "ok" | "error"; text: string } | null>(
    null
  );

  async function refresh() {
    setLoading(true);
    const [inv, l] = await Promise.all([getEquipmentInventory(), getEquipmentLoans()]);
    setInventory(inv);
    setLoans(l);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  const totals = useMemo(() => {
    const total = inventory.reduce((acc, e) => acc + e.quantityTotal, 0);
    const available = inventory.reduce((acc, e) => acc + e.quantityAvailable, 0);
    const onLoan = Math.max(0, total - available);
    const damaged = inventory.filter((e) => e.condition === "damaged").length;
    return { total, available, onLoan, damaged };
  }, [inventory]);

  const inventoryColumns: Column<EquipmentItem>[] = [
    {
      key: "name",
      header: "Material",
      render: (r) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-slate-900">{r.name}</div>
          <div className="truncate text-xs text-slate-500">{r.id}</div>
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (r) => (
        <div className="text-slate-700">
          <div className="tabular-nums">
            {r.quantityAvailable} <span className="text-slate-400">/</span>{" "}
            {r.quantityTotal}
          </div>
          <div className="text-[11px] text-slate-500">Disponible / Total</div>
        </div>
      ),
    },
    {
      key: "condition",
      header: "Condición",
      render: (r) => (
        <StatusBadge
          value={conditionBadgeValue(r.condition)}
          label={conditionLabel(r.condition)}
        />
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      className: "text-right",
      render: (r) => (
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md border bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            onClick={async () => {
              setMsg(null);
              const updated = await markEquipmentDamaged(r.id);
              if (!updated) {
                setMsg({ type: "error", text: "No se pudo actualizar el material." });
                return;
              }
              setInventory((prev) => prev.map((x) => (x.id === r.id ? updated : x)));
              setMsg({ type: "ok", text: "Material marcado como deteriorado." });
            }}
          >
            Marcar deteriorado
          </button>
        </div>
      ),
    },
  ];

  const loanColumns: Column<EquipmentLoan>[] = [
    {
      key: "equipmentName",
      header: "Material",
      render: (r) => (
        <div className="min-w-0">
          <div className="truncate font-medium text-slate-900">{r.equipmentName}</div>
          <div className="truncate text-xs text-slate-500">{r.equipmentId}</div>
        </div>
      ),
    },
    {
      key: "borrowerName",
      header: "Prestado a",
      render: (r) => <span className="text-slate-800">{r.borrowerName}</span>,
    },
    {
      key: "dates",
      header: "Fechas",
      render: (r) => (
        <div className="text-slate-700">
          <div className="tabular-nums">{r.loanDate}</div>
          <div className="text-[11px] text-slate-500">
            Devolución: <span className="tabular-nums">{r.expectedReturnDate}</span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Estado",
      render: (r) => (
        <StatusBadge value={loanBadgeValue(r.status)} label={loanStatusLabel(r.status)} />
      ),
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
            disabled={r.status === "returned"}
            onClick={async () => {
              setMsg(null);
              const updated = await closeLoan(r.id);
              if (!updated) {
                setMsg({ type: "error", text: "No se pudo cerrar el préstamo." });
                return;
              }
              setLoans((prev) => prev.map((x) => (x.id === r.id ? updated : x)));
              setMsg({ type: "ok", text: "Préstamo marcado como devuelto." });
            }}
          >
            Marcar devuelto
          </button>
        </div>
      ),
    },
  ];

  const activeLoans = loans.filter((l) => l.status === "active").length;
  const overdueLoans = loans.filter((l) => l.status === "overdue").length;

  return (
    <div>
      <PageHeader
        title="Material deportivo"
        description="Inventario y préstamos de material (demo con datos simulados)"
        actions={
          <button
            type="button"
            onClick={async () => {
              setMsg(null);
              await refresh();
            }}
            className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Refrescar
          </button>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total unidades
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {totals.total}
          </div>
          <div className="mt-1 text-xs text-slate-500">Inventario global</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Disponibles
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {totals.available}
          </div>
          <div className="mt-1 text-xs text-slate-500">Listo para préstamo</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Prestadas
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {totals.onLoan}
          </div>
          <div className="mt-1 text-xs text-slate-500">En circulación</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Deteriorados
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {totals.damaged}
          </div>
          <div className="mt-1 text-xs text-slate-500">Revisión necesaria</div>
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Inventario</div>
            <div className="text-xs text-slate-600">
              {inventory.length} ítems
            </div>
          </div>
          <Table
            columns={inventoryColumns}
            rows={loading ? [] : inventory}
            emptyState={loading ? "Cargando inventario…" : "Sin datos"}
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">
              Préstamos
              <span className="ml-2 text-xs font-normal text-slate-500">
                (Activos: {activeLoans} · Vencidos: {overdueLoans})
              </span>
            </div>
            <div className="text-xs text-slate-600">{loans.length} registros</div>
          </div>

          <Table
            columns={loanColumns}
            rows={loading ? [] : loans}
            emptyState={loading ? "Cargando préstamos…" : "Sin préstamos"}
          />

          <div className="mt-4 rounded-md border bg-white p-4 text-xs text-slate-600">
            Nota: los cambios se simulan en memoria (no persisten al recargar). El
            objetivo es representar el flujo de control de almacén para capturas.
          </div>
        </div>
      </div>
    </div>
  );
}
