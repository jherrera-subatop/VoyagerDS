interface SectionTitleProps {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

export function SectionTitle({ id, title, subtitle, badge }: SectionTitleProps) {
  return (
    <div id={id} className="flex items-start gap-4 mb-8 pt-2">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h2
            className="text-xl font-semibold"
            style={{
              color: "var(--vmc-color-text-primary)",
              fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            {title}
          </h2>
          {badge && (
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: "var(--vmc-color-vault-200)",
                color: "var(--vmc-color-vault-900)",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p
            className="text-sm"
            style={{ color: "var(--vmc-color-text-secondary)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
