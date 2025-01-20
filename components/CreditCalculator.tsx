"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANES = {
  liberty: {
    nombre: "Basic",
    creditos: 1312,
    precio: "$50",
    color: "from-[#40C9FF] to-[#40C9FF]",
    descripcion: "Ideal para comenzar",
    features: [
      "Flexibilidad total en el uso de créditos",
      "Mensajes o llamadas, inbound o outbound",
      "Créditos no utilizados acumulados",
      "Compra de créditos adicionales",
      "Control y monitoreo en tiempo real",
    ],
  },
  emprendedor: {
    nombre: "Pro",
    creditos: 3415,
    precio: "$130",
    color: "from-[#6666FF] to-[#6666FF]",
    descripcion: "Para negocios en crecimiento",
    features: [
      "Flexibilidad total en el uso de créditos",
      "Mensajes o llamadas, inbound o outbound",
      "Créditos no utilizados acumulados",
      "Compra de créditos adicionales",
      "Control y monitoreo en tiempo real",
    ],
  },
  advance: {
    nombre: "Elite",
    creditos: 6563,
    precio: "$250",
    color: "from-[#8000FF] to-[#8000FF]",
    descripcion: "Operaciones medianas",
    features: [
      "Flexibilidad total en el uso de créditos",
      "Mensajes o llamadas, inbound o outbound",
      "Créditos no utilizados acumulados",
      "Compra de créditos adicionales",
      "Control y monitoreo en tiempo real",
    ],
  },
  "grandes-ligas": {
    nombre: "Max",
    creditos: 13126,
    precio: "$500",
    color: "from-[#9933FF] to-[#9933FF]",
    descripcion: "Máximo rendimiento",
    features: [
      "Flexibilidad total en el uso de créditos",
      "Mensajes o llamadas, inbound o outbound",
      "Créditos no utilizados acumulados",
      "Compra de créditos adicionales",
      "Control y monitoreo en tiempo real",
    ],
  },
} as const;

const COSTO_MENSAJE = 1;
const COSTO_LLAMADA = 10;

interface Resultados {
  creditosIniciales: number;
  creditosMensajes: number;
  creditosLlamadas: number;
  totalConsumido: number;
  creditosRestantes: number;
}

export default function CreditCalculator() {
  const [planSeleccionado, setPlanSeleccionado] =
    useState<keyof typeof PLANES>("emprendedor");
  const [mensajes, setMensajes] = useState(150);
  const [minutos, setMinutos] = useState(30);
  const [resultados, setResultados] = useState<Resultados | null>(null);

  const maxMensajesPosibles = Math.floor(
    PLANES[planSeleccionado].creditos / COSTO_MENSAJE
  );
  const maxMinutosPosibles = Math.floor(
    PLANES[planSeleccionado].creditos / COSTO_LLAMADA
  );

  const handleMensajesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMensajes(Math.max(0, Math.min(value, maxMensajesPosibles)));
  };

  const handleMinutosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMinutos(Math.max(0, Math.min(value, maxMinutosPosibles)));
  };

  const calcularCreditos = () => {
    const creditosMensajes = mensajes * COSTO_MENSAJE;
    const creditosLlamadas = minutos * COSTO_LLAMADA;
    const totalConsumido = creditosMensajes + creditosLlamadas;
    const creditosIniciales = PLANES[planSeleccionado].creditos;
    const creditosRestantes = creditosIniciales - totalConsumido;

    setResultados({
      creditosIniciales,
      creditosMensajes,
      creditosLlamadas,
      totalConsumido,
      creditosRestantes,
    });
  };

  useEffect(() => {
    calcularCreditos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planSeleccionado, mensajes, minutos]);

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          SUBSCRIPCIÓN
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Dividimos en dos columnas (una para planes y otra para la calculadora) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna Izquierda: Sección de Planes */}
          <div className="space-y-8">
            {/* Selector de Planes */}
            <div className="relative mx-auto max-w-sm">
              <div className="flex rounded-full bg-gradient-to-r from-[#40C9FF] via-[#6666FF] to-[#9933FF] p-[1px]">
                {Object.entries(PLANES).map(([key, plan], index) => (
                  <button
                    key={key}
                    onClick={() =>
                      setPlanSeleccionado(key as keyof typeof PLANES)
                    }
                    className={cn(
                      "flex-1 relative py-2 text-sm font-medium transition-all duration-200",
                      planSeleccionado === key
                        ? "text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50",
                      index === 0 && "rounded-l-full",
                      index === Object.entries(PLANES).length - 1 &&
                        "rounded-r-full",
                      planSeleccionado === key &&
                        `bg-gradient-to-r ${plan.color}`
                    )}
                  >
                    {plan.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Detalles del Plan Seleccionado */}
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <div className="text-4xl font-bold flex items-center justify-center gap-1">
                  <span>{PLANES[planSeleccionado].precio}</span>
                  <span className="text-base text-gray-500 font-normal">
                    USD/month
                  </span>
                </div>
                <p className="text-gray-600">
                  {PLANES[planSeleccionado].descripcion}
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="font-semibold text-lg">¿Qué Incluye?</h4>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{PLANES[planSeleccionado].creditos} Créditos</span>
                  </li>
                  {PLANES[planSeleccionado].features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botones de acción (Suscribirse / Agendar llamada) */}
              <div className="pt-4 flex gap-4 justify-center">
                <Button className="bg-[#6666FF] hover:bg-[#5151FF]">
                  Suscríbete
                </Button>
                <Button variant="outline">Agenda una llamada</Button>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Calculadora de Créditos */}
          <div className="space-y-6">
            {resultados && resultados.creditosRestantes < 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>
                  Has excedido la cantidad de créditos de tu plan por{" "}
                  <strong>{Math.abs(resultados.creditosRestantes)}</strong>{" "}
                  créditos. Considera adquirir más créditos o cambiar a un plan
                  superior.
                </AlertDescription>
              </Alert>
            )}

            {/* Ajuste de Mensajes */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">
                  Número de mensajes enviados
                </label>
                <span className="text-sm font-medium">
                  {mensajes} mensajes = {mensajes * COSTO_MENSAJE} créditos
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-grow">
                  <Slider
                    value={[mensajes]}
                    onValueChange={(value) => setMensajes(value[0])}
                    max={maxMensajesPosibles}
                    step={1}
                    className="py-4"
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max={maxMensajesPosibles}
                    value={mensajes}
                    onChange={handleMensajesChange}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>Máximo: {maxMensajesPosibles}</span>
              </div>
            </div>

            {/* Ajuste de Minutos */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">
                  Minutos de llamadas realizadas
                </label>
                <span className="text-sm font-medium">
                  {minutos} minutos = {minutos * COSTO_LLAMADA} créditos
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-grow">
                  <Slider
                    value={[minutos]}
                    onValueChange={(value) => setMinutos(value[0])}
                    max={maxMinutosPosibles}
                    step={1}
                    className="py-4"
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max={maxMinutosPosibles}
                    value={minutos}
                    onChange={handleMinutosChange}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>Máximo: {maxMinutosPosibles}</span>
              </div>
            </div>

            {/* Resumen de Consumo */}
            {resultados && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Resumen de consumo:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Créditos del plan:</span>
                    <span className="font-medium">
                      {resultados.creditosIniciales}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total consumido:</span>
                    <span className="font-medium">
                      {resultados.totalConsumido}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Créditos restantes:</span>
                    <span
                      className={`font-medium ${
                        resultados.creditosRestantes < 0 ? "text-red-600" : ""
                      }`}
                    >
                      {Math.max(0, resultados.creditosRestantes)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
