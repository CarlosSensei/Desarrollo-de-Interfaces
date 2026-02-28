import { useState } from "react";
import { KPICard } from "../components/KPICard";
import { AgendaWidget } from "../components/AgendaWidget";
import { ChatWidget } from "../components/ChatWidget";
import { ProyectosWidget } from "../components/ProyectosWidget";
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUpDown,
  Filter,
  Download,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock data
const revenueData = [
  { mes: "Ene", valor: 45000, anterior: 38000 },
  { mes: "Feb", valor: 52000, anterior: 42000 },
  { mes: "Mar", valor: 48000, anterior: 45000 },
  { mes: "Abr", valor: 61000, anterior: 48000 },
  { mes: "May", valor: 55000, anterior: 52000 },
  { mes: "Jun", valor: 67000, anterior: 55000 },
];

const transactionTypeData = [
  { tipo: "Transferencias", cantidad: 1234 },
  { tipo: "Pagos", cantidad: 892 },
  { tipo: "Depósitos", cantidad: 567 },
  { tipo: "Retiros", cantidad: 423 },
];

interface Transaction {
  id: string;
  cliente: string;
  tipo: string;
  monto: number;
  estado: "completada" | "pendiente" | "fallida";
  fecha: string;
  riesgo: "bajo" | "medio" | "alto";
}

const recentTransactions: Transaction[] = [
  {
    id: "TXN-001",
    cliente: "Empresa Alpha S.A.",
    tipo: "Transferencia",
    monto: 125000,
    estado: "completada",
    fecha: "2026-02-28 09:15",
    riesgo: "bajo",
  },
  {
    id: "TXN-002",
    cliente: "Beta Corporation",
    tipo: "Pago",
    monto: 45000,
    estado: "completada",
    fecha: "2026-02-28 09:08",
    riesgo: "bajo",
  },
  {
    id: "TXN-003",
    cliente: "Gamma Industries",
    tipo: "Transferencia",
    monto: 890000,
    estado: "pendiente",
    fecha: "2026-02-28 08:45",
    riesgo: "alto",
  },
  {
    id: "TXN-004",
    cliente: "Delta Group",
    tipo: "Depósito",
    monto: 32000,
    estado: "completada",
    fecha: "2026-02-28 08:30",
    riesgo: "bajo",
  },
  {
    id: "TXN-005",
    cliente: "Epsilon LLC",
    tipo: "Retiro",
    monto: 67000,
    estado: "fallida",
    fecha: "2026-02-28 08:12",
    riesgo: "medio",
  },
  {
    id: "TXN-006",
    cliente: "Zeta Ventures",
    tipo: "Transferencia",
    monto: 210000,
    estado: "completada",
    fecha: "2026-02-27 17:45",
    riesgo: "medio",
  },
  {
    id: "TXN-007",
    cliente: "Eta Holdings",
    tipo: "Pago",
    monto: 15000,
    estado: "completada",
    fecha: "2026-02-27 16:20",
    riesgo: "bajo",
  },
  {
    id: "TXN-008",
    cliente: "Theta Corp",
    tipo: "Transferencia",
    monto: 450000,
    estado: "pendiente",
    fecha: "2026-02-27 15:55",
    riesgo: "alto",
  },
];

export function DashboardPage() {
  const [sortColumn, setSortColumn] = useState<keyof Transaction | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (column: keyof Transaction) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredTransactions = recentTransactions
    .filter((t) => {
      const matchesEstado =
        filterEstado === "todos" || t.estado === filterEstado;
      const matchesSearch =
        t.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesEstado && matchesSearch;
    })
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      const modifier = sortDirection === "asc" ? 1 : -1;
      if (aVal < bVal) return -1 * modifier;
      if (aVal > bVal) return 1 * modifier;
      return 0;
    });

  const getEstadoBadge = (estado: Transaction["estado"]) => {
    switch (estado) {
      case "completada":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completada
          </Badge>
        );
      case "pendiente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pendiente
          </Badge>
        );
      case "fallida":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Fallida
          </Badge>
        );
    }
  };

  const getRiesgoBadge = (riesgo: Transaction["riesgo"]) => {
    switch (riesgo) {
      case "bajo":
        return (
          <Badge variant="outline" className="text-slate-600">
            Bajo
          </Badge>
        );
      case "medio":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            Medio
          </Badge>
        );
      case "alto":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Alto
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Visión general de operaciones financieras
          </p>
        </div>
        <Button className="gap-2">
          <Download size={16} />
          Exportar Reporte
        </Button>
      </div>

      {/* KPIs - Máximo 4 por fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Ingresos Totales"
          value="$67.2M"
          change="+12.5% vs mes anterior"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-blue-600"
        />
        <KPICard
          title="Clientes Activos"
          value="2,847"
          change="+8.2% vs mes anterior"
          changeType="positive"
          icon={Users}
          iconColor="bg-green-600"
        />
        <KPICard
          title="Transacciones"
          value="15,234"
          change="-2.4% vs mes anterior"
          changeType="negative"
          icon={Activity}
          iconColor="bg-purple-600"
        />
        <KPICard
          title="Valor Promedio"
          value="$4,410"
          change="+5.1% vs mes anterior"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolución de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="mes"
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="anterior"
                  stroke="#94a3b8"
                  fill="none"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#colorValor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Types Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Transacción</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="tipo"
                  stroke="#64748b"
                  style={{ fontSize: "11px" }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="cantidad" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Nuevos Widgets: Agenda, Chat, Proyectos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AgendaWidget />
        <ChatWidget />
        <ProyectosWidget />
      </div>

      {/* Tabla Avanzada de Transacciones */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transacciones Recientes</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="fallida">Fallida</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-2">
                      ID
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("cliente")}
                  >
                    <div className="flex items-center gap-2">
                      Cliente
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("tipo")}
                  >
                    <div className="flex items-center gap-2">
                      Tipo
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors text-right"
                    onClick={() => handleSort("monto")}
                  >
                    <div className="flex items-center justify-end gap-2">
                      Monto
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("estado")}
                  >
                    <div className="flex items-center gap-2">
                      Estado
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("riesgo")}
                  >
                    <div className="flex items-center gap-2">
                      Riesgo
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort("fecha")}
                  >
                    <div className="flex items-center gap-2">
                      Fecha
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-32 text-center text-slate-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Activity size={32} className="text-slate-300" />
                        <p>No se encontraron transacciones</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-slate-50 cursor-pointer"
                    >
                      <TableCell className="font-mono text-sm">
                        {transaction.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.cliente}
                      </TableCell>
                      <TableCell>{transaction.tipo}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${transaction.monto.toLocaleString()}
                      </TableCell>
                      <TableCell>{getEstadoBadge(transaction.estado)}</TableCell>
                      <TableCell>{getRiesgoBadge(transaction.riesgo)}</TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {transaction.fecha}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Exportar</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Cancelar
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

          {/* Paginación */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-600">
              Mostrando {filteredTransactions.length} de{" "}
              {recentTransactions.length} transacciones
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}