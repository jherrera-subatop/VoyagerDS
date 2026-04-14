import { SectionTitle } from "../../components/SectionTitle";
import {
  groupTaxonomyByDomain,
  TAXONOMY_COMPONENTS,
  TAXONOMY_DOMAIN_LABEL,
  TAXONOMY_DOMAIN_ORDER,
} from "../_data/taxonomy-components";
import { TaxonomyComponentCard } from "./TaxonomyComponentCard";

export function TaxonomyByDomain() {
  const byDomain = groupTaxonomyByDomain(TAXONOMY_COMPONENTS);

  return (
    <section className="space-y-12">
      <SectionTitle
        id="inventario-por-dominio"
        title="Inventario por categoría (dominio)"
        subtitle="Cada bloque agrupa componentes del mismo dominio funcional. El wireframe de propuesta vive antes de cerrar tokens en ib-fundamentos."
        badge={`${TAXONOMY_COMPONENTS.length} ítems`}
      />

      {TAXONOMY_DOMAIN_ORDER.map((domainKey) => {
        const items = byDomain.get(domainKey);
        if (!items || items.length === 0) {
          return null;
        }
        const domainTitle = TAXONOMY_DOMAIN_LABEL[domainKey] ?? domainKey;
        return (
          <div key={domainKey} className="space-y-4">
            <h3
              className="text-sm font-semibold tracking-tight"
              style={{
                color: "var(--vmc-color-text-primary)",
                fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              {domainTitle}
              <span className="font-mono text-xs font-normal ml-2" style={{ color: "var(--vmc-color-text-tertiary)" }}>
                {domainKey}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {items.map((c) => (
                <TaxonomyComponentCard key={c.id} component={c} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
