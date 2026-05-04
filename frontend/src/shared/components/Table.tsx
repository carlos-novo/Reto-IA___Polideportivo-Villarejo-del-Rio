import type { ReactNode } from "react";

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
};

export function Table<T>({
  columns,
  rows,
  emptyState,
}: {
  columns: Column<T>[];
  rows: T[];
  emptyState?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={["px-4 py-2.5 align-middle", c.className].join(" ")}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-sm text-slate-500"
                  colSpan={columns.length}
                >
                  {emptyState ?? "Sin datos"}
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={["px-4 py-2.5 align-middle", c.className].join(" ")}
                    >
                      {c.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
