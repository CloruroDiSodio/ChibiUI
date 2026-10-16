import type { PropDoc } from '@/lib/registry';

export function PropTable({ component, rows }: { component: string; rows: PropDoc[] }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 font-mono text-base">{component}</h3>
      {/* Scroll container is focusable so keyboard users can scroll wide tables. */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`${component} props`}
        className="overflow-x-auto rounded-chibi-lg border-2 border-chibi-border"
      >
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead className="bg-chibi-surface-muted">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Prop
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Type
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Default
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-chibi-border align-top">
                <th
                  scope="row"
                  className="px-4 py-2.5 font-mono font-semibold whitespace-nowrap text-chibi-fg"
                >
                  {row.name}
                </th>
                <td className="px-4 py-2.5 font-mono text-xs text-chibi-fg-muted">{row.type}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-chibi-fg-muted">
                  {row.default ?? '—'}
                </td>
                <td className="px-4 py-2.5">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
