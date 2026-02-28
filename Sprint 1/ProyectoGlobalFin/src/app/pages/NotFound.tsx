import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-slate-900">404</h1>
          <h2 className="text-2xl font-semibold text-slate-900">
            Página no encontrada
          </h2>
          <p className="text-slate-600 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft size={16} />
              Volver
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link to="/">
              <Home size={16} />
              Ir al Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
