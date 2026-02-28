import { useState } from "react";
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface Departamento {
  id: string;
  nombre: string;
  abreviacion: string;
  ultimoMensaje: string;
  hora: string;
  noLeidos: number;
  online: boolean;
}

interface Mensaje {
  id: string;
  departamentoId: string;
  texto: string;
  enviado: boolean;
  hora: string;
  leido: boolean;
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
  {
    id: "6",
    nombre: "Marketing",
    abreviacion: "MK",
    ultimoMensaje: "Nueva campaña en revisión",
    hora: "Mar 25",
    noLeidos: 0,
    online: true,
  },
  {
    id: "7",
    nombre: "Recursos Humanos",
    abreviacion: "RH",
    ultimoMensaje: "Proceso de onboarding iniciado",
    hora: "Mar 24",
    noLeidos: 0,
    online: false,
  },
];

const mensajesMock: Record<string, Mensaje[]> = {
  "1": [
    {
      id: "1",
      departamentoId: "1",
      texto: "Hola, necesitamos revisar urgente la transacción TXN-003",
      enviado: false,
      hora: "09:10",
      leido: true,
    },
    {
      id: "2",
      departamentoId: "1",
      texto: "Claro, déjame revisarla ahora mismo",
      enviado: true,
      hora: "09:12",
      leido: true,
    },
    {
      id: "3",
      departamentoId: "1",
      texto: "Tiene algunos indicadores que requieren validación adicional",
      enviado: false,
      hora: "09:15",
      leido: false,
    },
    {
      id: "4",
      departamentoId: "1",
      texto: "¿Podrías enviarnos el análisis completo?",
      enviado: false,
      hora: "09:15",
      leido: false,
    },
  ],
  "2": [
    {
      id: "5",
      departamentoId: "2",
      texto: "Buenos días, el reporte mensual de riesgos está listo",
      enviado: false,
      hora: "08:30",
      leido: true,
    },
    {
      id: "6",
      departamentoId: "2",
      texto: "Perfecto, ¿dónde lo puedo descargar?",
      enviado: true,
      hora: "08:40",
      leido: true,
    },
    {
      id: "7",
      departamentoId: "2",
      texto: "Está disponible en el portal bajo Reportes > Riesgos > Febrero 2026",
      enviado: false,
      hora: "08:45",
      leido: true,
    },
  ],
  "3": [
    {
      id: "8",
      departamentoId: "3",
      texto: "Necesitamos coordinar para la auditoría del próximo mes",
      enviado: false,
      hora: "Ayer 16:20",
      leido: true,
    },
    {
      id: "9",
      departamentoId: "3",
      texto: "¿Cuándo podemos agendar la reunión?",
      enviado: false,
      hora: "Ayer 16:22",
      leido: false,
    },
  ],
};

export function ChatPage() {
  const [selectedDept, setSelectedDept] = useState<Departamento | null>(
    departamentos[0]
  );
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepartamentos = departamentos.filter((dept) =>
    dept.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim() && selectedDept) {
      // Aquí iría la lógica para enviar el mensaje
      console.log("Enviando mensaje:", message, "a", selectedDept.nombre);
      setMessage("");
    }
  };

  const mensajesActuales = selectedDept ? mensajesMock[selectedDept.id] || [] : [];

  return (
    <div className="p-6 h-[calc(100vh-4rem)]">
      <div className="h-full flex flex-col gap-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Chat Interdepartamental</h1>
          <p className="text-slate-600 mt-1">
            Comunicación interna entre departamentos
          </p>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col min-h-0">
          <CardContent className="p-0 flex-1 flex min-h-0">
            <div className="flex w-full min-h-0">
              {/* Sidebar - Lista de Departamentos */}
              <div className="w-80 border-r border-slate-200 flex flex-col">
                {/* Search */}
                <div className="p-4 border-b border-slate-200">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <Input
                      type="text"
                      placeholder="Buscar departamento..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Departamentos List */}
                <ScrollArea className="flex-1">
                  <div className="p-2">
                    {filteredDepartamentos.map((dept) => (
                      <div
                        key={dept.id}
                        onClick={() => setSelectedDept(dept)}
                        className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-slate-50 mb-1 ${
                          selectedDept?.id === dept.id
                            ? "bg-blue-50 border border-blue-200"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                              {dept.abreviacion}
                            </div>
                            {dept.online && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-sm">
                                {dept.nombre}
                              </span>
                              <span className="text-xs text-slate-500">
                                {dept.hora}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 truncate">
                              {dept.ultimoMensaje}
                            </p>
                          </div>
                          {dept.noLeidos > 0 && (
                            <Badge
                              variant="destructive"
                              className="h-5 min-w-5 flex items-center justify-center px-1.5 text-xs"
                            >
                              {dept.noLeidos}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col min-h-0">
                {selectedDept ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                            {selectedDept.abreviacion}
                          </div>
                          {selectedDept.online && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedDept.nombre}</h3>
                          <p className="text-xs text-slate-500">
                            {selectedDept.online ? "En línea" : "Desconectado"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Phone size={18} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video size={18} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem>Archivar chat</DropdownMenuItem>
                            <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Borrar conversación
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {mensajesActuales.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${
                              msg.enviado ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                msg.enviado
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-900"
                              }`}
                            >
                              <p className="text-sm">{msg.texto}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  msg.enviado ? "text-blue-100" : "text-slate-500"
                                }`}
                              >
                                {msg.hora}
                                {msg.enviado && (
                                  <span className="ml-2">
                                    {msg.leido ? "✓✓" : "✓"}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-4 border-t border-slate-200">
                      <div className="flex items-end gap-2">
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <Paperclip size={20} />
                        </Button>
                        <div className="flex-1 relative">
                          <Input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            className="pr-10"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                          >
                            <Smile size={18} />
                          </Button>
                        </div>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className="flex-shrink-0"
                        >
                          <Send size={18} />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <MessageSquare size={64} className="mx-auto mb-4" />
                      <p>Selecciona un departamento para comenzar a chatear</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
