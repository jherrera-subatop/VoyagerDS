import {
  DETALLE_ZONES,
  SUBASCARS_STORYBOOK_BY_COMPONENT_ID,
  VMC_AUDIT_DETALLE_LABEL,
} from "../_data/wireframe-references";
import { TAXONOMY_COMPONENTS, type TaxonomyComponent } from "../_data/taxonomy-components";

function componentById(id: string): TaxonomyComponent | undefined {
  for (const c of TAXONOMY_COMPONENTS) {
    if (c.id === id) {
      return c;
    }
  }
  return undefined;
}

function subasCarsLinkFor(id: string): string | undefined {
  const direct = SUBASCARS_STORYBOOK_BY_COMPONENT_ID[id];
  if (direct) {
    return direct;
  }
  return undefined;
}

/**
 * Marco Detalle: por sector, lista de piezas con link Storybook (si existe) y audit VMC.
 */
export function TaxonomyDetalleFrameWireframe() {
  return (
    <div
      className="rounded-lg p-1 space-y-3"
      style={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "var(--vmc-color-vault-700)",
        background: "var(--vmc-color-background-tertiary)",
      }}
    >
      <div className="rounded-md p-4 space-y-2" style={{ background: "var(--vmc-color-background-secondary)" }}>
        <p className="text-sm font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
          Marco Detalle — sectores con referencia SubasCars o VMC
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
          {VMC_AUDIT_DETALLE_LABEL} Cada fila lista las piezas del inventario que típicamente caen en ese sector.
        </p>
      </div>

      <div className="flex flex-col gap-3 px-2 pb-2">
        {DETALLE_ZONES.map((zone) => {
          return <DetalleZoneBlock key={zone.id} zone={zone} />;
        })}
      </div>
    </div>
  );
}

function DetalleZoneBlock({
  zone,
}: Readonly<{
  zone: (typeof DETALLE_ZONES)[number];
}>) {
  return (
    <div
      className="rounded-md border p-4 space-y-3"
      style={{
        borderColor: "var(--vmc-color-border-default)",
        background: "var(--vmc-color-background-primary)",
      }}
    >
      <div>
        <p className="text-sm font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
          {zone.title}
        </p>
        <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
          {zone.summary}
        </p>
      </div>
      <ul className="space-y-3 list-none p-0 m-0">
        {zone.componentIds.map((cid) => {
          return <ComponentReferenceRow key={cid} componentId={cid} />;
        })}
      </ul>
    </div>
  );
}

function ComponentReferenceRow({ componentId }: Readonly<{ componentId: string }>) {
  const c = componentById(componentId);
  const storyUrl = subasCarsLinkFor(componentId);
  const title = c ? c.name : componentId;

  return (
    <li
      className="rounded-md p-3 border"
      style={{
        borderColor: "var(--vmc-color-border-subtle)",
        background: "var(--vmc-color-background-secondary)",
      }}
    >
      <div className="flex flex-wrap items-baseline gap-2 mb-2">
        <span className="text-sm font-semibold" style={{ color: "var(--vmc-color-text-primary)" }}>
          {title}
        </span>
        <code className="text-xs font-mono" style={{ color: "var(--vmc-color-text-brand)" }}>
          {componentId}
        </code>
        {c && (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{ background: "var(--vmc-color-background-tertiary)", color: "var(--vmc-color-text-tertiary)" }}>
            {c.decision}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--vmc-color-vault-800)" }}>
            SubasCars (anatomía)
          </p>
          {storyUrl && (
            <a
              href={storyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-2 break-all inline-block"
              style={{ color: "var(--vmc-color-text-brand)" }}
            >
              Abrir story en SubasCars — {componentId}
            </a>
          )}
          {!storyUrl && (
            <p className="text-xs leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
              Sin URL de Storybook en TAXONOMY.md para este id: se define solo contra VMC o hace falta ampliar el
              audit.
            </p>
          )}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--vmc-color-orange-800)" }}>
            VMC (comportamiento y layout)
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--vmc-color-text-secondary)" }}>
            Revisar DOM y flujo en la oferta auditada; las instancias contadas en TAXONOMY aplican a este marco.
          </p>
        </div>
      </div>
    </li>
  );
}
