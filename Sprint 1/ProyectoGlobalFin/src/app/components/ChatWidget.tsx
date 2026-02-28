import { useState } from "react";
import { MessageSquare, Send, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface Departamento {
  id: string;
  nombre: string;
  abreviacion: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
  online: boolean;
}

const departamentos: Departamento[] = [
  {
    id: "1",
    nombre: "Cumplimiento",
    abreviacion: "CM",
    ultimoMensaje: "Necesitamos revisar la transacción TXN-003",
    hora: "09:15",
    noLeidos: 2,
    online: true,
  },
  {
    id: "2",
    nombre: "Riesgos",
    abreviacion: "RG",
    ultimoMensaje: "El reporte está listo para descarga",
    hora: "08:45",
    noLeidos: 0,
    online: true,
  },
  {
    id: "3",
    nombre: "Operaciones",
    abreviacion: "OP",
    ultimoMensaje: "¿Cuándo podemos agendar la reunión?",
    hora: "Ayer",
    noLeidos: 1,
    online: false,
  },
  {
    id: "4",
    nombre: "Legal",
    abreviacion: "LG",
    ultimoMensaje: "Documentos aprobados",
    hora: "Ayer",
    noLeidos: 0,
    online: true,
  },
  {
    id: "5",
    nombre: "Tecnología",
    abreviacion: "TI",
    ultimoMensaje: "Sistema actualizado correctamente",
    hora: "Mar 26",
    noLeidos: 0,
    online: false,
  },
];

export function ChatWidget() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí iría la lógica para enviar el mensaje
      setMessage("");
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare size={20} />
          Chat Interdepartamental
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 p-0">
        {/* Search */}
        <div className="px-6 pb-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <Input
              type="text"
              placeholder="Buscar departamento..."
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        {/* Departamentos List */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-1">
            {departamentos.map((dept) => (
              <div
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${
                  selectedDept === dept.id ? "bg-blue-50 border border-blue-200" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                      {dept.abreviacion}
                    </div>
                    {dept.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{dept.nombre}</span>
                      <span className="text-xs text-slate-500">{dept.hora}</span>
                    </div>
                    <p className="text-xs text-slate-600 truncate">
                      {dept.ultimoMensaje}
                    </p>
                  </div>
                  {dept.noLeidos > 0 && (
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {dept.noLeidos}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Message */}
        {selectedDept && (
          <div className="p-4 border-t bg-slate-50">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Escribe un mensaje rápido..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 h-9 text-sm"
              />
              <Button size="sm" onClick={handleSendMessage} className="h-9 px-3">
                <Send size={16} />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
