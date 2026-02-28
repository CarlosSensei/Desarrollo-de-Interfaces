import { useState } from "react";
import { Calendar, Clock, Video, MapPin, Users, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface Reunion {
  id: string;
  titulo: string;
  hora: string;
  duracion: string;
  tipo: "presencial" | "virtual" | "llamada";
  participantes: string[];
  ubicacion?: string;
  urgencia: "normal" | "importante";
  fecha: string;
  descripcion?: string;
}

const reuniones: Reunion[] = [
  {
    id: "1",
    titulo: "Revisión de Cartera Q1",
    hora: "09:00",
    duracion: "1h",
    tipo: "virtual",
    participantes: ["Juan Díaz", "María González", "Carlos Ruiz"],
    urgencia: "importante",
    fecha: "2026-02-28",
    descripcion: "Análisis trimestral de rendimiento de la cartera de inversiones",
  },
  {
    id: "2",
    titulo: "Análisis de Riesgo Crediticio",
    hora: "11:30",
    duracion: "45min",
    tipo: "presencial",
    participantes: ["Juan Díaz", "Ana Torres"],
    ubicacion: "Sala 3B",
    urgencia: "importante",
    fecha: "2026-02-28",
    descripcion: "Evaluación de nuevos clientes corporativos",
  },
  {
    id: "3",
    titulo: "Seguimiento Clientes Premium",
    hora: "14:00",
    duracion: "30min",
    tipo: "llamada",
    participantes: ["Juan Díaz", "Roberto Silva"],
    urgencia: "normal",
    fecha: "2026-02-28",
    descripcion: "Check-in mensual con principales cuentas",
  },
  {
    id: "4",
    titulo: "Reunión Mensual Departamental",
    hora: "16:00",
    duracion: "1h 30min",
    tipo: "virtual",
    participantes: ["Equipo Completo"],
    urgencia: "normal",
    fecha: "2026-02-28",
    descripcion: "Revisión de KPIs y objetivos del mes",
  },
  {
    id: "5",
    titulo: "Review Transacciones Sospechosas",
    hora: "17:30",
    duracion: "45min",
    tipo: "virtual",
    participantes: ["Juan Díaz", "Dept. Cumplimiento"],
    urgencia: "importante",
    fecha: "2026-02-28",
    descripcion: "Revisión de alertas de cumplimiento",
  },
  {
    id: "6",
    titulo: "Presentación Q1 a Directorio",
    hora: "10:00",
    duracion: "2h",
    tipo: "presencial",
    participantes: ["María González", "Carlos Ruiz", "Directorio"],
    ubicacion: "Sala Ejecutiva",
    urgencia: "importante",
    fecha: "2026-03-01",
    descripcion: "Presentación de resultados trimestrales",
  },
  {
    id: "7",
    titulo: "Capacitación Nuevos Sistemas",
    hora: "15:00",
    duracion: "1h",
    tipo: "virtual",
    participantes: ["Equipo Analistas"],
    urgencia: "normal",
    fecha: "2026-03-01",
    descripcion: "Training sobre nuevas herramientas de análisis",
  },
  {
    id: "8",
    titulo: "Due Diligence Cliente Nuevo",
    hora: "09:30",
    duracion: "1h 15min",
    tipo: "virtual",
    participantes: ["Juan Díaz", "Ana Torres", "Legal"],
    urgencia: "importante",
    fecha: "2026-03-03",
    descripcion: "Análisis de documentación de prospecto corporativo",
  },
];

export function AgendaPage() {
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [filterUrgencia, setFilterUrgencia] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWeekStart] = useState(new Date("2026-02-28"));

  const getTipoIcon = (tipo: Reunion["tipo"]) => {
    switch (tipo) {
      case "virtual":
        return <Video size={20} className="text-blue-600" />;
      case "presencial":
        return <MapPin size={20} className="text-green-600" />;
      case "llamada":
        return <Clock size={20} className="text-orange-600" />;
    }
  };

  const getTipoLabel = (tipo: Reunion["tipo"]) => {
    switch (tipo) {
      case "virtual":
        return "Virtual";
      case "presencial":
        return "Presencial";
      case "llamada":
        return "Llamada";
    }
  };

  const filteredReuniones = reuniones
    .filter((r) => {
      const matchesTipo = filterTipo === "todos" || r.tipo === filterTipo;
      const matchesUrgencia = filterUrgencia === "todos" || r.urgencia === filterUrgencia;
      const matchesSearch =
        r.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.participantes.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesTipo && matchesUrgencia && matchesSearch;
    })
    .sort((a, b) => {
      const dateCompare = a.fecha.localeCompare(b.fecha);
      if (dateCompare !== 0) return dateCompare;
      return a.hora.localeCompare(b.hora);
    });

  // Agrupar por fecha
  const reunionesPorFecha = filteredReuniones.reduce((acc, reunion) => {
    if (!acc[reunion.fecha]) {
      acc[reunion.fecha] = [];
    }
    acc[reunion.fecha].push(reunion);
    return acc;
  }, {} as Record<string, Reunion[]>);

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    const today = new Date("2026-02-28");
    const tomorrow = new Date("2026-03-01");

    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Mañana";
    } else {
      return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Agenda</h1>
          <p className="text-slate-600 mt-1">
            Gestión de reuniones y compromisos
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Nueva Reunión
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Hoy</p>
                <p className="text-2xl font-bold text-slate-900">
                  {reuniones.filter((r) => r.fecha === "2026-02-28").length}
                </p>
              </div>
              <Calendar className="text-blue-600" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Virtuales</p>
                <p className="text-2xl font-bold text-slate-900">
                  {reuniones.filter((r) => r.tipo === "virtual").length}
                </p>
              </div>
              <Video className="text-blue-600" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Presenciales</p>
                <p className="text-2xl font-bold text-slate-900">
                  {reuniones.filter((r) => r.tipo === "presencial").length}
                </p>
              </div>
              <MapPin className="text-green-600" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Importantes</p>
                <p className="text-2xl font-bold text-slate-900">
                  {reuniones.filter((r) => r.urgencia === "importante").length}
                </p>
              </div>
              <div className="text-orange-600 text-2xl">⚠️</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Buscar reuniones o participantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="llamada">Llamada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterUrgencia} onValueChange={setFilterUrgencia}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Urgencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="importante">Importante</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reuniones agrupadas por fecha */}
      <div className="space-y-6">
        {Object.entries(reunionesPorFecha).map(([fecha, reunionesDia]) => (
          <Card key={fecha}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar size={20} />
                {formatFecha(fecha)}
                <Badge variant="outline" className="ml-2">
                  {reunionesDia.length} {reunionesDia.length === 1 ? "reunión" : "reuniones"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reunionesDia.map((reunion) => (
                  <div
                    key={reunion.id}
                    className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                      reunion.urgencia === "importante"
                        ? "border-orange-200 bg-orange-50/50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getTipoIcon(reunion.tipo)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-base mb-1">
                              {reunion.titulo}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {reunion.hora} ({reunion.duracion})
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {getTipoLabel(reunion.tipo)}
                              </Badge>
                              {reunion.ubicacion && (
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  {reunion.ubicacion}
                                </div>
                              )}
                            </div>
                          </div>
                          {reunion.urgencia === "importante" && (
                            <Badge
                              variant="outline"
                              className="border-orange-600 text-orange-600"
                            >
                              Importante
                            </Badge>
                          )}
                        </div>
                        {reunion.descripcion && (
                          <p className="text-sm text-slate-600 mb-2">
                            {reunion.descripcion}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Users size={14} />
                          <span>{reunion.participantes.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
