import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  AlertTriangle,
  FileText,
  Settings,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import logoSvg from "../../imports/logo_transparente.svg";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/agenda", label: "Agenda", icon: Calendar },
  { path: "/chat", label: "Chat", icon: MessageSquare },
  { path: "/proyectos", label: "Proyectos", icon: Briefcase },
  { path: "/clientes", label: "Clientes", icon: Users },
  { path: "/transacciones", label: "Transacciones", icon: ArrowLeftRight },
  { path: "/riesgo", label: "Riesgo", icon: AlertTriangle },
  { path: "/reportes", label: "Reportes", icon: FileText },
  { path: "/configuracion", label: "Configuración", icon: Settings },
];

export function RootLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const location = useLocation();

  // Keyboard shortcut Ctrl+K para búsqueda
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <img src={logoSvg} alt="GlobalFin" className="w-10 h-10" />
              <span className="font-semibold text-lg">GlobalFin</span>
            </div>
          ) : (
            <img src={logoSvg} alt="GlobalFin" className="w-8 h-8 mx-auto" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 w-1 h-8 bg-blue-400 rounded-r-full" />
                    )}
                    <Icon
                      className={`flex-shrink-0 ${collapsed ? "mx-auto" : ""}`}
                      size={20}
                    />
                    {!collapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {collapsed ? (
              <ChevronRight size={20} className="mx-auto" />
            ) : (
              <>
                <ChevronLeft size={20} />
                <span className="ml-2">Minimizar</span>
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            {/* Buscador Global */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Buscar... (Ctrl + K)"
                className="pl-10 pr-20 bg-slate-50 border-slate-200 focus:bg-white"
                onFocus={() => setSearchOpen(true)}
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Selector de Fecha */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calendar size={16} />
                  <span className="text-sm">
                    {format(date, "d MMM yyyy", { locale: es })}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Notificaciones */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell size={18} />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex-col items-start py-3">
                  <div className="font-medium">
                    Transacción de alto riesgo detectada
                  </div>
                  <div className="text-xs text-slate-500">Hace 5 minutos</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start py-3">
                  <div className="font-medium">Nuevo cliente registrado</div>
                  <div className="text-xs text-slate-500">Hace 1 hora</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start py-3">
                  <div className="font-medium">Reporte mensual disponible</div>
                  <div className="text-xs text-slate-500">Hace 2 horas</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Perfil Usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-sm font-medium">Juan Díaz</div>
                    <div className="text-xs text-slate-500">Analista</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User size={16} className="mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings size={16} className="mr-2" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50">
          <Outlet />
        </main>
      </div>

      {/* Modal de Búsqueda Global (Opcional - puede expandirse) */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <Input
                type="text"
                placeholder="Buscar clientes, transacciones, reportes..."
                className="text-lg"
                autoFocus
              />
            </div>
            <div className="border-t p-4 text-sm text-slate-500">
              Escribe para buscar o presiona ESC para cerrar
            </div>
          </div>
        </div>
      )}
    </div>
  );
}