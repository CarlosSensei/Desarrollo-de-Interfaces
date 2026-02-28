import { Briefcase, Users, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";

interface Proyecto {
  id: string;
  nombre: string;
  estado: "en-progreso" | "pausado" | "completado" | "planificacion";
  progreso: number;
  responsable: string;
  equipo: number;
  fechaLimite: string;
  prioridad: "alta" | "media" | "baja";
}

const proyectos: Proyecto[] = [
  {
    id: "1",
    nombre: "Migración Sistema Core Bancario",
    estado: "en-progreso",
    progreso: 67,
    responsable: "María González",
    equipo: 8,
    fechaLimite: "15 Mar 2026",
    prioridad: "alta",
  },
  {
    id: "2",
    nombre: "Implementación KYC Digital",
    estado: "en-progreso",
    progreso: 45,
    responsable: "Carlos Ruiz",
    equipo: 5,
    fechaLimite: "30 Mar 2026",
    prioridad: "alta",
  },
  {
    id: "3",
    nombre: "Auditoría Trimestral",
    estado: "en-progreso",
    progreso: 82,
    responsable: "Ana Torres",
    equipo: 3,
    fechaLimite: "05 Mar 2026",
    prioridad: "media",
  },
  {
    id: "4",
    nombre: "Portal Cliente B2B",
    estado: "planificacion",
    progreso: 15,
    responsable: "Roberto Silva",
    equipo: 6,
    fechaLimite: "30 Abr 2026",
    prioridad: "media",
  },
  {
    id: "5",
    nombre: "Certificación ISO 27001",
    estado: "pausado",
    progreso: 38,
    responsable: "Luis Morales",
    equipo: 4,
    fechaLimite: "30 May 2026",
    prioridad: "baja",
  },
];

export function ProyectosWidget() {
  const getEstadoBadge = (estado: Proyecto["estado"]) => {
    switch (estado) {
      case "en-progreso":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
            En Progreso
          </Badge>
        );
      case "pausado":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">
            Pausado
          </Badge>
        );
      case "completado":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
            Completado
          </Badge>
        );
      case "planificacion":
        return (
          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100 text-xs">
            Planificación
          </Badge>
        );
    }
  };

  const getPrioridadColor = (prioridad: Proyecto["prioridad"]) => {
    switch (prioridad) {
      case "alta":
        return "text-red-600";
      case "media":
        return "text-orange-600";
      case "baja":
        return "text-slate-600";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase size={20} />
            Proyectos Activos
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {proyectos.filter((p) => p.estado === "en-progreso").length} activos
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[480px] pr-4">
          <div className="space-y-4">
            {proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className="p-4 rounded-lg border border-slate-200 bg-white hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">
                      {proyecto.nombre}
                    </h4>
                    <div className="flex items-center gap-2">
                      {getEstadoBadge(proyecto.estado)}
                      <span
                        className={`text-xs font-medium ${getPrioridadColor(
                          proyecto.prioridad
                        )}`}
                      >
                        {proyecto.prioridad === "alta" && "🔴"}
                        {proyecto.prioridad === "media" && "🟡"}
                        {proyecto.prioridad === "baja" && "🟢"}{" "}
                        {proyecto.prioridad.charAt(0).toUpperCase() +
                          proyecto.prioridad.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-600">Progreso</span>
                    <span className="text-xs font-semibold text-slate-900">
                      {proyecto.progreso}%
                    </span>
                  </div>
                  <Progress value={proyecto.progreso} className="h-2" />
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{proyecto.equipo} personas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{proyecto.fechaLimite}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  <span className="font-medium">Responsable:</span>{" "}
                  {proyecto.responsable}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
