import { FileText, Download, Calendar, Filter } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const reportes = [
  {
    nombre: "Reporte Mensual Febrero 2026",
    tipo: "Financiero",
    fecha: "28 Feb 2026",
    estado: "Disponible",
  },
  {
    nombre: "Análisis de Riesgo Q1 2026",
    tipo: "Riesgo",
    fecha: "25 Feb 2026",
    estado: "Disponible",
  },
  {
    nombre: "Cartera de Clientes",
    tipo: "Comercial",
    fecha: "20 Feb 2026",
    estado: "Disponible",
  },
  {
    nombre: "Cumplimiento Normativo",
    tipo: "Legal",
    fecha: "15 Feb 2026",
    estado: "Disponible",
  },
];

export function ReportesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reportes</h1>
          <p className="text-slate-600 mt-1">
            Informes y análisis consolidados
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar size={16} />
            Período
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filtrar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportes.map((reporte, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <Button variant="ghost" size="icon">
                  <Download size={16} />
                </Button>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                {reporte.nombre}
              </h3>
              <div className="space-y-1 text-sm text-slate-600">
                <p>Tipo: {reporte.tipo}</p>
                <p>Fecha: {reporte.fecha}</p>
              </div>
              <Button className="w-full mt-4" size="sm">
                Descargar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
