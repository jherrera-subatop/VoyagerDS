/**
 * GET /api/source/[component]
 *
 * Sirve el código fuente de componentes DONE como texto plano.
 * Usado por HandoffPanels para mostrar el source sin embeber el código en el bundle.
 *
 * Whitelist explícita — nunca expone archivos arbitrarios del servidor.
 */

import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

// Mapa component-id → ruta relativa desde process.cwd()
const COMPONENT_MAP: Record<string, string> = {
  "footer":   "src/features/Footer/FooterDone.tsx",
  "sidebar":  "src/features/Sidebar/SidebarDone.tsx",
  // Agregar aquí cada componente DONE nuevo:
  // "header":       "src/features/Header/HeaderDone.tsx",
  // "auction-card": "src/features/AuctionCard/AuctionCardDone.tsx",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ component: string }> }
): Promise<NextResponse> {
  const { component } = await params;
  const relPath = COMPONENT_MAP[component];

  if (!relPath) {
    return NextResponse.json(
      { error: `Component "${component}" not in whitelist` },
      { status: 404 }
    );
  }

  const absPath = join(process.cwd(), relPath);

  try {
    const content = await readFile(absPath, "utf-8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: `Could not read source for "${component}"` },
      { status: 500 }
    );
  }
}
