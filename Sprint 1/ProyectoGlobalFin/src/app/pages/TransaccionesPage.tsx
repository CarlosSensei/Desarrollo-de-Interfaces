import { Activity, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

export function TransaccionesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Transacciones</h1>
          <p className="text-slate-600 mt-1">
            Monitoreo y análisis de todas las operaciones
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filtros Avanzados
          </Button>
          <Button className="gap-2">
            <Download size={16} />
            Exportar
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Activity size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Módulo de Transacciones
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Vista detallada de todas las transacciones con filtros avanzados,
            análisis de patrones y exportación de datos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
