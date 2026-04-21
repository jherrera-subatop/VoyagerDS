# voyager-session-start — Arranque de sesión Voyager

## Cuándo activar
SIEMPRE al inicio de cualquier sesión de trabajo en Voyager DS.
También cuando el usuario dice "sigamos", "continuemos", "qué sigue", o retoma el trabajo sin contexto explícito.

## Protocolo obligatorio

### Paso 1 — Leer el board
Ejecutar:
```bash
python3 scripts/voyager-jira-sync.py --status
```
Identificar:
- Ticket en **En curso** → ese es el trabajo activo
- Tickets en **Bloqueado** → qué los desbloquea
- Tickets en **Agent Queue** → listos para ejecutar

### Paso 2 — Identificar qué se necesita para avanzar
Antes de decir una sola palabra de trabajo, determinar:
- ¿El ticket activo requiere input del usuario? (screenshot, URL, decisión, aprobación)
- ¿El ticket activo puede ejecutarse solo? (código, Jira ops, research)

### Paso 3 — Pedir exactamente lo que falta
Si el ticket necesita input humano, pedirlo de forma específica y concreta.
NO proceder sin ese input.
NO empezar a escribir código o análisis hasta tener lo que se necesita.

**Formato de pedido:**
```
Ticket activo: [VD-XX] — [resumen]
Para avanzar necesito:
1. [item específico — ej: "URL de una página de detalle en vmcsubastas.com que esté viva"]
2. [item específico — ej: "Screenshot del header tal como se ve hoy en VMC"]
3. [item específico — ej: "Screenshot del footer completo"]
```

### Paso 4 — Nunca esperar que el usuario recuerde
El agente es quien conduce.
El usuario no debería tener que decir "necesitas pedirme X" — el agente ya lo sabe y lo pide.

## Regla de oro
**El agente lee el ticket, entiende qué necesita, y lo pide. No el usuario.**

Si el ticket tiene descripción rica (lo cual debe ser siempre), la descripción dice exactamente qué se necesita para avanzar. Leerla antes de hablar.

## Ejemplo correcto
```
Ticket activo: VD-43 — Actualizar wireframes PageFrame

Para avanzar necesito:
1. URL de una página de detalle de VMC Subastas que esté viva ahora
   (ej: vmcsubastas.com/oferta/XXXXX)
2. Screenshot del Header completo (barra superior)
3. Screenshot del Sidebar completo (panel lateral)
4. Screenshot del Footer completo (pie de página)

Con esos 4 elementos arranco. ¿Los tienes a mano?
```

## Ejemplo incorrecto (nunca hacer esto)
```
El frame tiene estructura completa. Necesito ver qué renderizan...
[lee código durante 10 mensajes]
[el usuario tiene que recordarle que pida los screenshots]
```
