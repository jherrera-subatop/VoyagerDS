---
name: voyager-frontend
description: Estándares de código frontend de Voyager/VMC Subastas. Usar al crear, editar o revisar componentes React/Next.js. NO usar en capa de servicios, base de datos o configuración de infraestructura.
---

# VOYAGER — Frontend Standards

```xml
<stack>
  Framework: Next.js (App Router)
  Language: TypeScript — tipado estricto total
  Styles: Tailwind CSS v4
  State async: RTK Query
  State UI: Zustand
  Style logic: clsx o tailwind-merge (si disponibles)
</stack>
```

## PROHIBICIONES ABSOLUTAS

```xml
<forbidden>
- any → usar tipos estrictos, opcionales (?), Enums o Zod
- Ternarios → usar if/else o &&
- Funciones anónimas → todas nominales o asignadas a constante
- export default → usar export default por archivo de componente
- Lógica en return → extraer funciones handle... antes del return
- Componente > 20 líneas de lógica → extraer a useFeatureLogic.ts
</forbidden>
```

## ESTRUCTURA DE COMPONENTE

```xml
<file-structure>
  Entregable: archivo único funcional con export default
  Orden interno:
    1. Imports
    2. Interface de Props (tipado estricto)
    3. Funciones handle... (fuera del return)
    4. Componente nominal con export default
</file-structure>
```

## CONTRATO DE CÓDIGO

```xml
<contract>
  HTML: etiquetas semánticas (section, article, header, button)
  Accesibilidad: aria-label, role, alt en imágenes — obligatorio
  Responsive: todo componente es 100% responsive
  Props: Interface clara + eventos tipados (onClick?: () => void)
  Estado: useState para estado local
  Efectos: useEffect con cleanup obligatorio si hay listeners/API calls
  Estilos condicionales: clsx o tailwind-merge — nunca template literals complejos
</contract>
```

## EJEMPLO ESTRUCTURAL

```typescript
import { useState, useEffect } from 'react'
import clsx from 'clsx'

interface AuctionCardProps {
  status: 'live' | 'negotiable' | 'upcoming' | 'closed' | 'featured'
  vehicleName: string
  price: number
  onClick?: () => void
}

function handleCardClick(onClick?: () => void) {
  if (onClick) {
    onClick()
  }
}

export default function AuctionCard({ status, vehicleName, price, onClick }: AuctionCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  function handleFavoriteToggle() {
    setIsFavorited(!isFavorited)
  }

  return (
    <article
      data-status={status}
      className={clsx('rounded-sm bg-white shadow-card', { 'shadow-floating': status === 'featured' })}
    >
      {/* contenido */}
    </article>
  )
}
```

## VALIDACIÓN PRE-ENTREGA

```xml
<checklist>
- [ ] Cero any en el archivo
- [ ] Cero ternarios — solo if/else o &&
- [ ] Todas las funciones son nominales
- [ ] Props tipadas con Interface
- [ ] HTML semántico + aria attributes
- [ ] useEffect tiene cleanup si aplica
- [ ] Estilos vía tokens (var(--token)) — nunca HEX directo
- [ ] export default presente
- [ ] Responsive verificado
</checklist>
```
