import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { AgendaPage } from "./pages/AgendaPage";
import { ChatPage } from "./pages/ChatPage";
import { ProyectosPage } from "./pages/ProyectosPage";
import { ClientesPage } from "./pages/ClientesPage";
import { TransaccionesPage } from "./pages/TransaccionesPage";
import { RiesgoPage } from "./pages/RiesgoPage";
import { ReportesPage } from "./pages/ReportesPage";
import { ConfiguracionPage } from "./pages/ConfiguracionPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "agenda", Component: AgendaPage },
      { path: "chat", Component: ChatPage },
      { path: "proyectos", Component: ProyectosPage },
      { path: "clientes", Component: ClientesPage },
      { path: "transacciones", Component: TransaccionesPage },
      { path: "riesgo", Component: RiesgoPage },
      { path: "reportes", Component: ReportesPage },
      { path: "configuracion", Component: ConfiguracionPage },
      { path: "*", Component: NotFound },
    ],
  },
]);