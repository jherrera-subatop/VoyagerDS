import { SectionTitle } from "../components/SectionTitle";

const SPACING = [
  { token: "025", px: 2, desc: "Icon gap, hairline padding" },
  { token: "050", px: 4, desc: "Tight intra-component gap" },
  { token: "100", px: 8, desc: "BASE UNIT · gap entre elementos" },
  { token: "150", px: 12, desc: "Compact padding, list items" },
  { token: "200", px: 16, desc: "Standard component padding" },
  { token: "300", px: 24, desc: "Card internal spacing" },
  { token: "400", px: 32, desc: "Section gap, generous padding" },
  { token: "600", px: 48, desc: "Major section separation" },
  { token: "800", px: 64, desc: "Page vertical rhythm" },
  { token: "1000", px: 80, desc: "Large layout gap" },
  { token: "1200", px: 96, desc: "Max layout spacing" },
];

const RADIUS = [
  { token: "none", px: 0, desc: "Tablas, data grids" },
  { token: "sm", px: 4, desc: "Inputs, buttons, chips" },
  { token: "md", px: 8, desc: "Reservado" },
  { token: "lg", px: 16, desc: "Modals, drawers" },
  { token: "full", px: 9999, desc: "Pills, avatars, toggles" },
];

const SHADOWS = [
  { token: "sm", desc: "Cards en reposo — tinte The Vault (0 8px 16px @ 6%)" },
  { token: "md", desc: "Flotantes — modal, popover (0 8px 16px @ 10% negro)" },
];

const MOTION = [
  { token: "instant", value: "0ms", desc: "WebSocket updates — sin fade" },
  { token: "fast", value: "100ms", desc: "Hover, press, checkbox" },
  { token: "moderate", value: "220ms", desc: "Modals, dropdowns, drawers" },
  { token: "slow", value: "350ms", desc: "Page transitions, skeleton" },
];

export function SpacingSection() {
  return (
    <section>
      <SectionTitle
        id="spacing"
        title="Spacing, Radius, Sombras y Motion"
        subtitle="Atlassian multiplier · space.100 = 8px base unit · 5 radios · 2 sombras (design.md) · 4 niveles de motion"
      />

      <div className="grid grid-cols-2 gap-6">
        {/* Spacing */}
        <div
          className="rounded-lg border p-6"
          style={{
            background: "var(--vmc-color-background-secondary)",
            borderColor: "var(--vmc-color-border-default)",
          }}
        >
          <p
            className="text-xs font-mono mb-4 uppercase tracking-wider"
            style={{ color: "var(--vmc-color-text-tertiary)" }}
          >
            SPACING — space.*
          </p>
          <div className="space-y-2">
            {SPACING.map(({ token, px, desc }) => (
              <div key={token} className="flex items-center gap-3">
                <div
                  className="rounded-sm shrink-0"
                  style={{
                    width: `${Math.min(px * 1.5, 144)}px`,
                    height: "20px",
                    background: "var(--vmc-color-vault-500)",
                    minWidth: "4px",
                  }}
                />
                <div className="flex items-baseline gap-2 min-w-0">
                  <code
                    className="text-xs font-mono shrink-0"
                    style={{ color: "var(--vmc-color-text-brand)" }}
                  >
                    space.{token}
                  </code>
                  <span
                    className="text-xs shrink-0"
                    style={{ color: "var(--vmc-color-text-secondary)" }}
                  >
                    {px}px
                  </span>
                  {token === "100" && (
                    <span
                      className="text-xs font-mono px-1 rounded shrink-0"
                      style={{
                        background: "var(--vmc-color-vault-900)",
                        color: "var(--vmc-color-neutral-100)",
                      }}
                    >
                      BASE
                    </span>
                  )}
                  <span
                    className="text-xs truncate"
                    style={{ color: "var(--vmc-color-text-tertiary)" }}
                  >
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Radius */}
          <div
            className="rounded-lg border p-6"
            style={{
              background: "var(--vmc-color-background-secondary)",
              borderColor: "var(--vmc-color-border-default)",
            }}
          >
            <p
              className="text-xs font-mono mb-4 uppercase tracking-wider"
              style={{ color: "var(--vmc-color-text-tertiary)" }}
            >
              BORDER RADIUS — radius.*
            </p>
            <div className="flex gap-4 items-end">
              {RADIUS.map(({ token, px }) => (
                <div key={token} className="flex flex-col items-center gap-2">
                  <div
                    className="border"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: token === "full" ? "9999px" : `${px}px`,
                      background: "var(--vmc-color-vault-300)",
                      borderColor: "var(--vmc-color-border-brand)",
                    }}
                  />
                  <code
                    className="text-xs font-mono"
                    style={{ color: "var(--vmc-color-text-brand)" }}
                  >
                    {token}
                  </code>
                  <span
                    className="text-xs"
                    style={{ color: "var(--vmc-color-text-tertiary)" }}
                  >
                    {token === "full" ? "∞" : `${px}px`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shadows */}
          <div
            className="rounded-lg border p-6"
            style={{
              background: "var(--vmc-color-background-secondary)",
              borderColor: "var(--vmc-color-border-default)",
            }}
          >
            <p
              className="text-xs font-mono mb-4 uppercase tracking-wider"
              style={{ color: "var(--vmc-color-text-tertiary)" }}
            >
              ELEVACIÓN — shadow.*
            </p>
            <div className="flex gap-6 items-end">
              {SHADOWS.map(({ token, desc }) => (
                <div key={token} className="flex flex-col gap-3">
                  <div
                    className="rounded-md"
                    style={{
                      width: "64px",
                      height: "40px",
                      background: "var(--vmc-color-background-primary)",
                      boxShadow: `var(--vmc-shadow-${token})`,
                    }}
                  />
                  <div>
                    <code
                      className="text-xs font-mono block"
                      style={{ color: "var(--vmc-color-text-brand)" }}
                    >
                      shadow.{token}
                    </code>
                    <span
                      className="text-xs"
                      style={{ color: "var(--vmc-color-text-tertiary)" }}
                    >
                      {desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motion */}
          <div
            className="rounded-lg border p-6"
            style={{
              background: "var(--vmc-color-background-secondary)",
              borderColor: "var(--vmc-color-border-default)",
            }}
          >
            <p
              className="text-xs font-mono mb-4 uppercase tracking-wider"
              style={{ color: "var(--vmc-color-text-tertiary)" }}
            >
              MOTION — motion.duration.*
            </p>
            <div className="space-y-3">
              {MOTION.map(({ token, value, desc }) => (
                <div key={token} className="flex items-center gap-3">
                  <code
                    className="text-xs font-mono w-20 shrink-0"
                    style={{ color: "var(--vmc-color-text-brand)" }}
                  >
                    {token}
                  </code>
                  <span
                    className="text-xs font-mono w-14 shrink-0"
                    style={{ color: "var(--vmc-color-text-primary)" }}
                  >
                    {value}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--vmc-color-text-tertiary)" }}
                  >
                    {desc}
                  </span>
                  {token === "instant" && (
                    <span
                      className="text-xs font-mono px-1 rounded"
                      style={{
                        background: "var(--vmc-color-vault-100)",
                        color: "var(--vmc-color-vault-900)",
                      }}
                    >
                      WebSocket
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
