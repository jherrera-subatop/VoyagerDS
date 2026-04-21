# Agent 1 — UX Writer Output — Footer
**Auditoría:** constants.tsx vs vmcsubastas.com (fuente declarada: oferta/61272, 15-abr-2026)
**Regla maestra:** UX writing del legacy se mantiene INTACTO — NUNCA inventar contenido nuevo.

---

## Contenido APROBADO (mantener exacto)

### FOOTER_BRAND_DESCRIPTION
```
powered by SUBASTOP.Co
```
Valor aprobado tal cual. Capitalización y punto incluidos son canónicos.

### FOOTER_COPYRIGHT
```
© VMC Subastas es una marca registrada de Subastop S.A.C. Todos los derechos reservados 2025
```
Valor aprobado. Incluye razón social legal ("Subastop S.A.C.") y año 2025. No actualizar el año automáticamente — el año debe gestionarse desde esta constante de forma explícita y deliberada.

### FOOTER_NAV_COLUMNS
Dos columnas sin headings visibles (heading: ''). Contenido aprobado:

**Columna 1 — Plataforma / Marca**
| Label | href |
|---|---|
| SubasCars | https://subascars.com |
| SubasBlog | /blog |
| ¿Quiénes somos? | /quienes-somos |
| ¿Cómo vender? | /como-vender |
| Subaspass | /subaspass |
| Blacksheep Nation | /blacksheep-nation |

**Columna 2 — Legal / Comunidad**
| Label | href |
|---|---|
| Condiciones y Términos · Contáctanos | /condiciones |
| Política de Protección de Datos Personales | /politica-proteccion-datos |
| Política de Privacidad General | /politica-privacidad |
| Testimonios | /testimonios |

Observación: el label "Condiciones y Términos · Contáctanos" combina dos conceptos en un solo enlace usando un separador con punto medio (·). Esto refleja fielmente el legacy — no separar en dos links a menos que el sitio real lo cambie.

### FOOTER_SOCIAL_LINKS
| Label | href | ariaLabel |
|---|---|---|
| Facebook | https://facebook.com/vmcsubastas | Síguenos en Facebook |
| YouTube | https://youtube.com/vmcsubastas | Síguenos en YouTube |
| Instagram | https://instagram.com/vmcsubastas | Síguenos en Instagram |
| LinkedIn | https://linkedin.com/company/vmcsubastas | Síguenos en LinkedIn |

Los ariaLabels están en español, consistentes con la plataforma en Perú. Aprobados.

### FOOTER_BOTTOM_LINKS
```
[] — arreglo vacío, intencional
```
Aprobado como vacío. El footer legacy de VMC no presenta una barra de links inferiores separada (cookie policy, sitemap, accesibilidad). El copyright se renderiza desde FOOTER_COPYRIGHT directamente. No agregar links inventados.

---

## Observaciones UX

1. **Ausencia de headings visibles en columnas de nav:** El footer legacy no muestra títulos de sección encima de los links. La propiedad `heading: ''` es correcta y no debe rellenarse con etiquetas inventadas como "Empresa" o "Legal" sin confirmación visual del sitio real.

2. **Imagen "Libro de Reclamaciones":** El DESIGN.md menciona este elemento como requerimiento legal en Perú. No está modelado en constants.tsx porque es un asset visual (imagen/enlace), no contenido UX textual. El Agente 2 (implementación) debe confirmar si va hardcodeado en el JSX del componente o si requiere una constante adicional. Queda fuera del scope de este manifiesto de contenido.

3. **Año en copyright hardcodeado (2025):** El año es fijo en la constante. Esto es aceptable en un DS donde el control de versión es explícito. No usar `new Date().getFullYear()` automáticamente — sería inventar comportamiento no validado contra el legacy.

4. **LinkedIn URL pattern:** El resto de redes usa el handle `vmcsubastas` directo; LinkedIn usa `company/vmcsubastas`. Esto es correcto para la estructura de URLs de LinkedIn. Aprobado.

5. **Dominio de SubasCars:** Es el único link con dominio externo absoluto (`https://subascars.com`), no una ruta relativa. Correcto — es una plataforma hermana, no una sección interna.

6. **FOOTER_BRAND_DESCRIPTION no incluye texto adicional de descripción de la empresa:** El footer legacy muestra solo el tagline "powered by SUBASTOP.Co" en el área de marca, no un párrafo descriptivo de la empresa. Cualquier descripción más larga sería contenido inventado.

---

## Veredicto

**APROBADO**

El contenido en `constants.tsx` es consistente con la fuente declarada (audit vmcsubastas.com 15-abr-2026). Ningún valor debe modificarse antes de proceder a la implementación del componente. El único punto pendiente de aclaración (Libro de Reclamaciones) es un asset visual fuera del scope de UX writing.
