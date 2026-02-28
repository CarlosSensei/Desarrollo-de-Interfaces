import { Calendar, Clock, Video, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface Reunion {
  id: string;
  titulo: string;
  hora: string;
  duracion: string;
  tipo: "presencial" | "virtual" | "llamada";
  participantes: string[];
  ubicacion?: string;
  urgencia: "normal" | "importante";
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
  },
  {
    id: "3",
    titulo: "Seguimiento Clientes Premium",
    hora: "14:00",
    duracion: "30min",
    tipo: "llamada",
    participantes: ["Juan Díaz", "Roberto Silva"],
    urgencia: "normal",
  },
  {
    id: "4",
    titulo: "Reunión Mensual Departamental",
    hora: "16:00",
    duracion: "1h 30min",
    tipo: "virtual",
    participantes: ["Equipo Completo"],
    urgencia: "normal",
  },
  {
    id: "5",
    titulo: "Review Transacciones Sospechosas",
    hora: "17:30",
    duracion: "45min",
    tipo: "virtual",
    participantes: ["Juan Díaz", "Dept. Cumplimiento"],
    urgencia: "importante",
  },
];

export function AgendaWidget() {
  const getTipoIcon = (tipo: Reunion["tipo"]) => {
    switch (tipo) {
      case "virtual":
        return <Video size={16} className="text-blue-600" />;
      case "presencial":
        return <MapPin size={16} className="text-green-600" />;
      case "llamada":
        return <Clock size={16} className="text-orange-600" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar size={20} />
            Agenda del Día
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Hoy, 28 Feb
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[480px] pr-4">
          <div className="space-y-3">
            {reuniones.map((reunion, index) => (
              <div
                key={reunion.id}
                className={`p-3 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                  reunion.urgencia === "importante"
                    ? "border-orange-200 bg-orange-50/50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTipoIcon(reunion.tipo)}
                    <span className="font-semibold text-sm">
                      {reunion.titulo}
                    </span>
                  </div>
                  {reunion.urgencia === "importante" && (
                    <Badge
                      variant="outline"
                      className="text-xs border-orange-600 text-orange-600"
                    >
                      Importante
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {reunion.hora} ({reunion.duracion})
                  </div>
                  {reunion.ubicacion && (
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      {reunion.ubicacion}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                  <Users size={12} />
                  <span className="truncate">
                    {reunion.participantes.join(", ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
