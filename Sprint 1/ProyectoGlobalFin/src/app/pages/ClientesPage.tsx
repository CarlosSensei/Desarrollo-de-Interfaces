import { useState } from "react";
import { Users, Search, Plus, Mail, Phone, MapPin, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  ubicacion: string;
  volumen: number;
  segmento: "premium" | "corporativo" | "estándar";
  estado: "activo" | "inactivo";
}

const clientes: Cliente[] = [
  {
    id: "CLI-001",
    nombre: "Empresa Alpha S.A.",
    email: "contacto@alpha.com",
    telefono: "+56 2 2345 6789",
    ubicacion: "Santiago, Chile",
    volumen: 2500000,
    segmento: "premium",
    estado: "activo",
  },
  {
    id: "CLI-002",
    nombre: "Beta Corporation",
    email: "info@betacorp.com",
    telefono: "+56 2 3456 7890",
    ubicacion: "Concepción, Chile",
    volumen: 1200000,
    segmento: "corporativo",
    estado: "activo",
  },
  {
    id: "CLI-003",
    nombre: "Gamma Industries",
    email: "admin@gamma.cl",
    telefono: "+56 2 4567 8901",
    ubicacion: "Valparaíso, Chile",
    volumen: 3800000,
    segmento: "premium",
    estado: "activo",
  },
  {
    id: "CLI-004",
    nombre: "Delta Group",
    email: "contacto@delta.com",
    telefono: "+56 2 5678 9012",
    ubicacion: "Santiago, Chile",
    volumen: 450000,
    segmento: "estándar",
    estado: "activo",
  },
  {
    id: "CLI-005",
    nombre: "Epsilon LLC",
    email: "info@epsilon.cl",
    telefono: "+56 2 6789 0123",
    ubicacion: "Antofagasta, Chile",
    volumen: 890000,
    segmento: "corporativo",
    estado: "inactivo",
  },
];

export function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClientes = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSegmentoBadge = (segmento: Cliente["segmento"]) => {
    switch (segmento) {
      case "premium":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Premium
          </Badge>
        );
      case "corporativo":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Corporativo
          </Badge>
        );
      case "estándar":
        return (
          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">
            Estándar
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-600 mt-1">
            Gestión de cartera de clientes corporativos
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Nuevo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Clientes</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">2,847</p>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Clientes Premium</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">247</p>
              </div>
              <Badge className="bg-purple-600">Premium</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Volumen Total</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">$8.8M</p>
              </div>
              <div className="text-green-600 text-sm font-medium">+12.5%</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Nuevos (mes)</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">43</p>
              </div>
              <div className="text-green-600 text-sm font-medium">+8.2%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Clientes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Clientes</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  type="text"
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead className="text-right">Volumen</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <Users size={32} className="text-slate-300" />
                        <p>No se encontraron clientes</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClientes.map((cliente) => (
                    <TableRow key={cliente.id} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-sm">{cliente.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{cliente.nombre}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail size={14} />
                            {cliente.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone size={14} />
                            {cliente.telefono}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin size={14} />
                          {cliente.ubicacion}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${cliente.volumen.toLocaleString()}
                      </TableCell>
                      <TableCell>{getSegmentoBadge(cliente.segmento)}</TableCell>
                      <TableCell>
                        {cliente.estado === "activo" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Activo
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">
                            Inactivo
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Historial</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Desactivar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
