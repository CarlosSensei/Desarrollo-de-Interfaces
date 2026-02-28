import { AlertTriangle, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const riesgoData = [
  { name: "Bajo", value: 156, color: "#10b981" },
  { name: "Medio", value: 89, color: "#f59e0b" },
  { name: "Alto", value: 23, color: "#ef4444" },
];

export function RiesgoPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Gestión de Riesgo
        </h1>
        <p className="text-slate-600 mt-1">
          Análisis y monitoreo de riesgos operacionales y financieros
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="text-red-600" size={24} />
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                Crítico
              </Badge>
            </div>
            <p className="text-sm text-slate-600">Alertas Activas</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">23</p>
            <p className="text-sm text-red-600 mt-2">+5 desde ayer</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-orange-600" size={24} />
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                Medio
              </Badge>
            </div>
            <p className="text-sm text-slate-600">En Revisión</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">89</p>
            <p className="text-sm text-slate-600 mt-2">-12 desde ayer</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="text-green-600" size={24} />
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Normal
              </Badge>
            </div>
            <p className="text-sm text-slate-600">Bajo Control</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">156</p>
            <p className="text-sm text-green-600 mt-2">+8 desde ayer</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribución de Riesgos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riesgoData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {riesgoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
