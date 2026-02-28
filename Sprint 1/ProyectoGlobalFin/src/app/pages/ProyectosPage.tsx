import { useState } from "react";
import { Briefcase, Users, Calendar, TrendingUp, Plus, Filter, Search, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface Proyecto {
  id: string;
  nombre: string;
  estado: "en-progreso" | "pausado" | "completado" | "planificacion";
  progreso: number;
  responsable: string;
  equipo: number;
  fechaInicio: string;
  fechaLimite: string;
  prioridad: "alta" | "media" | "baja";
  descripcion: string;
  tareas: number;
  tareasCompletadas: number;
}

const proyectos: Proyecto[] = [
  {
    id: "1",
    nombre: "Migración Sistema Core Bancario",
    estado: "en-progreso",
    progreso: 67,
    responsable: "María González",
    equipo: 8,
    fechaInicio: "01 Ene 2026",
    fechaLimite: "15 Mar 2026",
    prioridad: "alta",
    descripcion: "Migración completa del sistema core bancario a nueva infraestructura cloud",
    tareas: 24,
    tareasCompletadas: 16,
  },
  {
    id: "2",
    nombre: "Implementación KYC Digital",
    estado: "en-progreso",
    progreso: 45,
    responsable: "Carlos Ruiz",
    equipo: 5,
    fechaInicio: "15 Ene 2026",
    fechaLimite: "30 Mar 2026",
    prioridad: "alta",
    descripcion: "Sistema de verificación digital de identidad para nuevos clientes",
    tareas: 18,
    tareasCompletadas: 8,
  },
  {
    id: "3",
    nombre: "Auditoría Trimestral",
    estado: "en-progreso",
    progreso: 82,
    responsable: "Ana Torres",
    equipo: 3,
    fechaInicio: "20 Feb 2026",
    fechaLimite: "05 Mar 2026",
    prioridad: "media",
    descripcion: "Auditoría interna trimestral de procesos y controles",
    tareas: 12,
    tareasCompletadas: 10,
  },
  {
    id: "4",
    nombre: "Portal Cliente B2B",
    estado: "planificacion",
    progreso: 15,
    responsable: "Roberto Silva",
    equipo: 6,
    fechaInicio: "01 Mar 2026",
    fechaLimite: "30 Abr 2026",
    prioridad: "media",
    descripcion: "Desarrollo de portal self-service para clientes corporativos",
    tareas: 32,
    tareasCompletadas: 5,
  },
  {
    id: "5",
    nombre: "Certificación ISO 27001",
    estado: "pausado",
    progreso: 38,
    responsable: "Luis Morales",
    equipo: 4,
    fechaInicio: "10 Ene 2026",
    fechaLimite: "30 May 2026",
    prioridad: "baja",
    descripcion: "Proceso de certificación de seguridad de la información",
    tareas: 28,
    tareasCompletadas: 11,
  },
  {
    id: "6",
    nombre: "Optimización API Gateway",
    estado: "en-progreso",
    progreso: 58,
    responsable: "Patricia Vega",
    equipo: 4,
    fechaInicio: "05 Feb 2026",
    fechaLimite: "20 Mar 2026",
    prioridad: "media",
    descripcion: "Mejora de rendimiento y seguridad del API Gateway corporativo",
    tareas: 15,
    tareasCompletadas: 9,
  },
  {
    id: "7",
    nombre: "Dashboard Ejecutivo BI",
    estado: "completado",
    progreso: 100,
    responsable: "Fernando López",
    equipo: 3,
    fechaInicio: "01 Ene 2026",
    fechaLimite: "25 Feb 2026",
    prioridad: "alta",
    descripcion: "Dashboard de Business Intelligence para nivel ejecutivo",
    tareas: 20,
    tareasCompletadas: 20,
  },
  {
    id: "8",
    nombre: "Actualización Framework Seguridad",
    estado: "en-progreso",
    progreso: 72,
    responsable: "Sandra Ramírez",
    equipo: 5,
    fechaInicio: "15 Feb 2026",
    fechaLimite: "10 Mar 2026",
    prioridad: "alta",
    descripcion: "Actualización de framework de seguridad y políticas",
    tareas: 22,
    tareasCompletadas: 16,
  },
];

export function ProyectosPage() {
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [filterPrioridad, setFilterPrioridad] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getEstadoBadge = (estado: Proyecto["estado"]) => {
    switch (estado) {
      case "en-progreso":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            En Progreso
          </Badge>
        );
      case "pausado":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pausado
          </Badge>
        );
      case "completado":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completado
          </Badge>
        );
      case "planificacion":
        return (
          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">
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

  const filteredProyectos = proyectos.filter((proyecto) => {
    const matchesEstado = filterEstado === "todos" || proyecto.estado === filterEstado;
    const matchesPrioridad = filterPrioridad === "todos" || proyecto.prioridad === filterPrioridad;
    const matchesSearch =
      proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.responsable.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEstado && matchesPrioridad && matchesSearch;
  });

  const estadisticas = {
    total: proyectos.length,
    enProgreso: proyectos.filter((p) => p.estado === "en-progreso").length,
    completados: proyectos.filter((p) => p.estado === "completado").length,
    pausados: proyectos.filter((p) => p.estado === "pausado").length,
    progresoPromedio: Math.round(
      proyectos.reduce((acc, p) => acc + p.progreso, 0) / proyectos.length
    ),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Proyectos</h1>
          <p className="text-slate-600 mt-1">
            Gestión y seguimiento de proyectos activos
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-2xl font-bold text-slate-900">
                  {estadisticas.total}
                </p>
              </div>
              <Briefcase className="text-blue-600" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">En Progreso</p>
                <p className="text-2xl font-bold text-slate-900">
                  {estadisticas.enProgreso}
                </p>
              </div>
              <TrendingUp className="text-blue-600" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Completados</p>
                <p className="text-2xl font-bold text-slate-900">
                  {estadisticas.completados}
                </p>
              </div>
              <div className="text-green-600 text-2xl">✓</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pausados</p>
                <p className="text-2xl font-bold text-slate-900">
                  {estadisticas.pausados}
                </p>
              </div>
              <div className="text-yellow-600 text-2xl">⏸</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Progreso Avg</p>
                <p className="text-2xl font-bold text-slate-900">
                  {estadisticas.progresoPromedio}%
                </p>
              </div>
              <div className="text-purple-600 text-2xl">📊</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input
                type="text"
                placeholder="Buscar proyectos o responsables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="en-progreso">En Progreso</SelectItem>
                <SelectItem value="planificacion">Planificación</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPrioridad} onValueChange={setFilterPrioridad}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las prioridades</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Proyectos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProyectos.map((proyecto) => (
          <Card key={proyecto.id} className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{proyecto.nombre}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getEstadoBadge(proyecto.estado)}
                    <Badge
                      variant="outline"
                      className={getPrioridadColor(proyecto.prioridad)}
                    >
                      {proyecto.prioridad === "alta" && "🔴"}
                      {proyecto.prioridad === "media" && "🟡"}
                      {proyecto.prioridad === "baja" && "🟢"}{" "}
                      {proyecto.prioridad.charAt(0).toUpperCase() +
                        proyecto.prioridad.slice(1)}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    <DropdownMenuItem>Editar proyecto</DropdownMenuItem>
                    <DropdownMenuItem>Exportar reporte</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Archivar proyecto
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{proyecto.descripcion}</p>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Progreso General</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {proyecto.progreso}%
                  </span>
                </div>
                <Progress value={proyecto.progreso} className="h-2" />
              </div>

              {/* Tareas */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Tareas</span>
                <span className="font-semibold">
                  {proyecto.tareasCompletadas} / {proyecto.tareas}
                </span>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Users size={14} />
                    <span>Equipo</span>
                  </div>
                  <p className="text-sm font-semibold">{proyecto.equipo} personas</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <Calendar size={14} />
                    <span>Fecha Límite</span>
                  </div>
                  <p className="text-sm font-semibold">{proyecto.fechaLimite}</p>
                </div>
              </div>

              {/* Responsable */}
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  <span className="font-medium">Responsable:</span>{" "}
                  {proyecto.responsable}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProyectos.length === 0 && (
        <Card>
          <CardContent className="py-16">
            <div className="text-center text-slate-400">
              <Briefcase size={64} className="mx-auto mb-4" />
              <p className="text-lg">No se encontraron proyectos</p>
              <p className="text-sm mt-2">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
