"use client";
import { useState } from "react";
import type { JSX } from "react";
import DetalleOfertaBar from "@/features/DetalleOfertaBar/DetalleOfertaBar";

const PJS = "var(--font-plus-jakarta-sans, 'Plus Jakarta Sans', sans-serif)";
const ROBOTO = "var(--font-roboto, 'Roboto', sans-serif)";

const DESCRIPTION_HTML =
  "Vehículo siniestrado por robo de autopartes, con daños en carrocería y estructura.<br>Presenta daños ocultos y ausencia de autopartes mecánicas u otros.<br>ROBO DE COMPUTADORA Y RAMALES, UNIDAD SE VENDE DONDE ESTA Y COMO ESTA.<br><br>Tarjeta de propiedad: Sí<br>Llaves: Sí<br>SOAT: Necesita<br><br>Nota importante para el comprador: Posterior a la venta y formalizada la transferencia, es posible que el vehículo pueda tener afectaciones por papeletas, multas, cargas pendientes, o cualquier otra afectación que no han sido 'No conocidas' por el vendedor al momento de realizar la transferencia vehicular; las que sean conocidas en etapa posterior a la transferencia correrán por cuenta del comprador; sin responsabilidad para el vendedor. A través de esta nota se entiende que el comprador ha sido informado sobre el tema y acepta asumir toda responsabilidad sobre las afectaciones conocidas en etapa posterior a la compra.<br><br>- Revisar la boleta informativa Sunarp.<br>- Links para consultas:<br>https://www.sat.gob.pe/websitev9<br>https://www.pagopapeletascallao.com.pe/<br><br><br>IMPORTANTE:<br>- El comprador tiene un plazo máximo de 4 días hábiles para el recojo del activo, estos días hábiles se empiezan a contabilizar desde la recepción del correo para la toma de firmas en notaría. Si excede dicho plazo, el cobro diario por mora del recojo vehicular, será de $20 (veinte dólares) incluido IGV.<br>- El usuario habilitado deberá cumplir con los plazos establecidos, detallados en las condiciones y acordados durante el proceso de venta.<br>- La atención en Notaria se encuentra disponible, con atención mediante una cita coordinada, en Lima.<br>- La entrega de los activos se encuentra disponible, con atención mediante una cita coordinada.<br>- Los cargos de transferencia en notaría y recojo del activo, son responsabilidad exclusiva del comprador.<br>- El único medio de pago válido es a través de los códigos y bancos detallados en las instrucciones de pago en plataforma, brindados durante el proceso de compra, en el plazo establecido sin excepción.<br>- Posterior al recojo del vehículo, cualquier reclamo es IMPROCEDENTE.";

const CONDITIONS_HTML = `<h3 id="1-responsabilidades-de-los-participantes">1. Responsabilidades de los Participantes</h3>
<p><strong>Se detallan las responsabilidades que asumen los usuarios al consignar para participar en una oferta.</strong></p>
<ul>
<li>Todo usuario confirma que ha leído y aceptado la última versión de nuestras <a href="https://www.vmcsubastas.com/condiciones-y-terminos.html">Condiciones y Términos</a> de uso al consignar para participar en esta oferta.</li>
<li>Al hacer una consignación, todo usuario conoce y acepta que es su responsabilidad disponer de una conexión estable a internet con un ancho de banda de mínimo 5Mbps y contar con los equipos necesarios para asegurar el correcto funcionamiento de los servicios.</li>
<li>Es responsabilidad de cada participante acceder oportunamente a la sala y realizar por lo menos un bid válido.</li>
<li>El incumplimiento de las responsabilidades como participante resulta en:<ul>
<li>La retención del monto consignado hasta las 23:59:59 horas del día del proceso "En Vivo".</li>
<li>La devolución de la consignación en SubasCoins.</li>
<li>La pérdida de 15 puntos VMC y correspondiente afectación al Riesgo Usuario.</li>
</ul>
</li>
<li>El Precio Reserva de la oferta podrá ser retirado durante el proceso "En Vivo".</li>
<li>Si el Precio Reserva es retirado en el proceso "En Vivo", el participante que envíe la mejor propuesta válida será declarado ganador directo.</li>
<li>Si el Precio Reserva nunca se retira y el proceso "En Vivo" cierra con Precio Reserva, el participante que envíe la mejor propuesta válida  será declarado Mejor Postor. En su condición de Mejor Postor, su bid pasará a consulta y el vendedor tendrá hasta 10 días hábiles para aceptar, rechazar o hacer una contrapropuesta cuando sea el caso. Durante este plazo, su consignación permanecerá retenida.</li>
</ul>
<h3 id="2-condiciones-de-compra">2. Condiciones de Compra</h3>
<p><strong>Contemplan las responsabilidades del VENDEDOR y el GANADOR (Ganador Directo o el Mejor Postor) al ser habilitado.</strong></p>
<h4 id="a-responsabilidades-del-vendedor">A. Responsabilidades del Vendedor</h4>
<ul>
<li>El vendedor tendrá 10 días hábiles para habilitar al ganador, pudiendo ocurrir la habilitación incluso el mismo día del proceso.</li>
<li>El vendedor se reserva el derecho de habilitación del ganador a libre discreción.</li>
</ul>
<h4 id="b-habilitación-del-ganador">B. Habilitación del Ganador</h4>
<ul>
<li>El ganador deberá ser habilitado para poder iniciar el proceso de compra.</li>
<li>Es responsabilidad del ganador estar atento a su correo y, de ser necesario, verificar su bandeja de SPAM en busca del correo de confirmación u otra comunicación. De igual manera, es responsable de ingresar al módulo "Tu Actividad" de la plataforma para saber si ha sido habilitado.</li>
</ul>
<h4 id="c-responsabilidades-del-ganador-habilitado">C. Responsabilidades del Ganador Habilitado</h4>
<ul>
<li>El ganador habilitado deberá realizar el pago de la comisión y la carga de documentos solicitados por el vendedor en un plazo de 2 días hábiles.</li>
<li>El ganador habilitado deberá pagar el 7.5% del monto propuesto o US$ 50 (el monto que sea mayor), por concepto de comisión por uso del servicio.</li>
<li>El ganador habilitado deberá adjuntar los siguientes documentos: DNI.  En caso de persona jurídica: Ficha RUC, Vigencia de poderes (Con máximo 3 meses de expedición), DNI Representante Legal.</li>
<li>En cualquier caso, cuando el ganador habilitado haya incumplido con alguna de sus responsabilidades:<ul>
<li>Será sancionado con la pérdida de 75 Puntos y aumentará el Riesgo Usuario.</li>
<li>Su cuenta será inhabilitada durante siete (7) días calendario.</li>
<li>Deberá cumplir con el pago de la comisión por el uso del servicio, pues es un deber intrínseco de todo ganador habilitado, inclusive cuando el perfeccionamiento de la venta se vea truncado por el incumplimiento en alguna de sus responsabilidades durante el proceso de compra-venta, de acuerdo a las instrucciones y en los plazos indicados por el vendedor.</li>
</ul>
</li>
</ul>
<h4 id="d-forma-de-pago">D. Forma de pago</h4>
<ul>
<li>El ganador habilitado tendrá 2 días hábiles desde la habilitación para cumplir sus obligaciones de pago.</li>
<li>Las instrucciones de pago le serán enviadas al ganador habilitado al cumplir con el pago de la comisión y la carga de documentos solicitados por el vendedor.</li>
<li>El pago del valor de compra debe ser bancarizado, utilizando los canales bancarios indicados y siempre se deberá efectuar en una sola operación.</li>
<li>Forma de pago: El ganador habilitado deberá pagar directamente al vendedor según las instrucciones que podrá descargar desde el módulo "Tu Actividad".</li>
<li>El vendedor vende Con Factura.</li>
</ul>
<h4 id="e-trámites-y-recojo">E. Trámites y recojo</h4>
<ul>
<li>El ganador habilitado es responsable de los gastos relacionados a la transferencia y cualquier otro trámite inherente a esta.</li>
<li>Una vez validado el pago total de la oferta, el vendedor gestionará directamente con el comprador el proceso de firmas y entrega.</li>
<li>El plazo de entrega es de 14 días hábiles una vez validado el pago.</li>
<li>El comprador se compromete a recoger de acuerdo con el cronograma que indique el vendedor. En caso de exceder el plazo de recojo, el ganador habilitado deberá pagar un monto de 10 US$ por cada día de retraso, por concepto de mora.</li>
</ul>
<h3 id="3-condiciones-generales">3. Condiciones generales</h3>
<p><strong>Contemplan las condiciones aplicables a todos los ofrecimientos de la plataforma.</strong></p>
<ul>
<li>El vendedor ofrece el o los bienes como están y donde están. VMC Subastas bajo ningún motivo se responsabiliza por la exactitud de la información presentada.</li>
<li>Todas las imágenes y características publicadas han sido remitidas por el vendedor, por lo que son consideradas referenciales.</li>
<li>El o los bienes ofrecidos pueden presentar daños y/o faltantes.</li>
<li>VMC Subastas nunca interviene en el proceso de compraventa ni en el de entrega de las ofertas.</li>
<li>VMC Subastas queda exento de toda responsabilidad sobre cualquier tipo de relación generada entre los usuarios y los vendedores en el Marketplace Digital. Esto incluye, sin carácter restrictivo, el pago y la entrega de bienes y cualquier otro término, condición, garantía o manifestación relacionada con dichas negociaciones. Estas negociaciones sólo son entre los usuarios y dichos vendedores.</li>
<li>En caso de existir un conflicto entre los participantes, entre los usuarios y un tercero, el Usuario entiende y conviene en que VMC Subastas queda sin responsabilidad de involucrarse en la cuestión.</li>
</ul>`;

export type InfoGeneralVariant = "info-general" | "condiciones";

interface InfoGeneralProps {
  variant?: InfoGeneralVariant;
}

interface SpecRowProps {
  label: string;
  value: string;
}

function CornerTL(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" className="absolute top-0 left-0 w-3 h-3 transition-colors duration-200" style={{ color: "var(--color-live, #ED8936)" }}>
      <path d="M2 12 L2 2 L12 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CornerBR(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" className="absolute bottom-0 right-0 w-3 h-3 transition-colors duration-200" style={{ color: "var(--color-live, #ED8936)" }}>
      <path d="M12 22 L22 22 L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24" width="24" height="24" fill="none"
      className="w-6 h-6 transition-transform duration-200"
      style={{
        color: "var(--color-live, #ED8936)",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path d="M5 9 L12 16 L19 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function SpecRow({ label, value }: SpecRowProps): JSX.Element {
  return (
    <li className="flex items-start w-full py-3 gap-x-4">
      <span className="flex-shrink-0 text-sm font-bold" style={{ fontFamily: PJS, color: "var(--color-vault, #22005C)" }}>
        {label}
      </span>
      <span className="flex-1 text-sm font-light text-right" style={{ fontFamily: PJS, color: "var(--color-vault, #22005C)" }}>
        {value}
      </span>
    </li>
  );
}

function CondicionesBody(): JSX.Element {
  return (
    <>
      <style>{`
        .conditions-typography { font-family: var(--font-roboto, 'Roboto', sans-serif); font-size: 14px; line-height: 1.6; color: var(--color-vault, #22005C); }
        .conditions-typography h3 { font-family: var(--font-plus-jakarta-sans, 'Plus Jakarta Sans', sans-serif); font-size: 16px; font-weight: 700; margin: 24px 0 8px; color: var(--color-vault, #22005C); }
        .conditions-typography h4 { font-family: var(--font-plus-jakarta-sans, 'Plus Jakarta Sans', sans-serif); font-size: 14px; font-weight: 600; margin: 16px 0 6px; color: var(--color-vault, #22005C); }
        .conditions-typography p { margin: 8px 0; }
        .conditions-typography ul { padding-left: 20px; margin: 8px 0; list-style-type: disc; }
        .conditions-typography ul ul { margin: 4px 0; list-style-type: circle; }
        .conditions-typography li { margin: 4px 0; }
        .conditions-typography a { color: var(--color-vault-mid, #3B1782); text-decoration: underline; }
        .conditions-typography strong { font-weight: 600; }
      `}</style>
      <div className="px-8 pb-8">
        <div className="space-y-8">
          <div className="flex justify-center w-full">
            <span className="flex items-center text-xs font-light uppercase" style={{ fontFamily: PJS, color: "var(--color-vault-mid, #3B1782)" }}>
              Complejidad del ofrecimiento
              <span className="flex items-center ml-2 space-x-1">
                <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-status-success, #22C55E)" }}>
                  <span className="sr-only">Fácil</span>
                </span>
                <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-skeleton, #C8CACC)" }}>
                  <span className="sr-only">Regular</span>
                </span>
                <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-skeleton, #C8CACC)" }}>
                  <span className="sr-only">Experto</span>
                </span>
              </span>
            </span>
          </div>
          <div className="conditions-typography" dangerouslySetInnerHTML={{ __html: CONDITIONS_HTML }} />
        </div>
      </div>
    </>
  );
}

function InfoGeneralBody(): JSX.Element {
  return (
    <div className="px-8 pb-8">
      <div className="flex flex-col w-full gap-4 mt-4">
        <div className="flex items-center text-xs font-light uppercase" style={{ fontFamily: PJS, color: "var(--color-vault-mid, #3B1782)" }}>
          <span>Calidad de información</span>
          <span className="flex items-center ml-2 space-x-1">
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-status-success, #22C55E)" }}>
              <span className="sr-only">Buena</span>
            </span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-skeleton, #C8CACC)" }}>
              <span className="sr-only">Regular</span>
            </span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-skeleton, #C8CACC)" }}>
              <span className="sr-only">Básica</span>
            </span>
          </span>
        </div>
        <div className="text-xs font-light uppercase" style={{ fontFamily: PJS, color: "var(--color-text-muted, oklch(0.38 0.04 280 / 50%))" }}>
          Código: 61483
        </div>
      </div>

      <ul className="w-full mt-4 divide-y divide-[var(--color-divider-section,oklch(0.22_0.18_285_/_5%))]">
        <SpecRow label="Placa:" value="AZF829" />
        <SpecRow label="Transmisión:" value="Mecánica" />
        <SpecRow label="Tracción:" value="4x2" />
        <SpecRow label="Combustible:" value="Gasolina" />
        <SpecRow label="Tipo de siniestro:" value="Robo de Autopartes" />
        <SpecRow label="Ubicación:" value="LIMA, LURIGANCHO" />
      </ul>

      <div className="mt-8">
        <div
          className="text-sm font-light leading-relaxed break-words"
          style={{ fontFamily: ROBOTO, color: "var(--color-vault, #22005C)" }}
          dangerouslySetInnerHTML={{ __html: DESCRIPTION_HTML }}
        />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-center" style={{ fontFamily: PJS, color: "var(--color-vault, #22005C)" }}>
        <span style={{ color: "var(--color-live, #ED8936)" }}>*</span> Todas las imágenes son referenciales
      </p>

      <div className="mt-8">
        <h3 className="text-sm font-bold" style={{ fontFamily: PJS, color: "var(--color-vault, #22005C)" }}>
          Descarga toda la información:
        </h3>
        <div className="px-3 mt-8 space-y-4 md:px-6">
          <DetalleOfertaBar label="Detalle de la oferta" />
          <DetalleOfertaBar label="Ficha SUNARP" />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold" style={{ fontFamily: PJS, color: "var(--color-vault, #22005C)" }}>
          Documentos requeridos:{" "}
        </h3>
        <div className="px-3 mt-8 space-y-4 md:px-6">
          <DetalleOfertaBar label="Declaración Jurada (PPNN)" />
          <DetalleOfertaBar label="Declaración Jurada (PPJJ)" />
        </div>
      </div>

      <div className="v-portal" style={{ display: "none" }} />
    </div>
  );
}

export default function InfoGeneral({ variant = "info-general" }: InfoGeneralProps): JSX.Element {
  const [open, setOpen] = useState(variant === "info-general");

  function handleToggle(): void {
    setOpen(!open);
  }

  const isInfoGeneral = variant === "info-general";
  const title = isInfoGeneral ? "Información general" : "Condiciones del ofrecimiento";
  const bg = "var(--color-surface-card, #FFFFFF)";

  return (
    <div className="pr-3">
      <div
        className="w-full mt-3 rounded"
        style={{
          backgroundColor: bg,
          boxShadow: "var(--shadow-card, 0 8px 16px oklch(0.22 0.18 285 / 6%))",
          borderRadius: "var(--radius-sm, 4px)",
        }}
      >
        <div className="relative flex items-center justify-center p-8 cursor-pointer" onClick={handleToggle}>
          <div className="relative items-center inline-block px-6 py-2">
            <CornerTL />
            <h2 className="text-sm font-bold leading-tight" style={{ fontFamily: PJS, color: "var(--color-vault, #22005C)" }}>
              {title}
            </h2>
            <CornerBR />
          </div>
          <span className="absolute right-0 w-6 h-6 mr-8">
            <ChevronDown open={open} />
          </span>
        </div>

        {open && isInfoGeneral && <InfoGeneralBody />}
        {open && !isInfoGeneral && <CondicionesBody />}
      </div>
    </div>
  );
}
