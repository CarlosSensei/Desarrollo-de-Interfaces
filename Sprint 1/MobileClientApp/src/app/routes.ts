import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Operations from "./pages/Operations";
import Investment from "./pages/Investment";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/operations",
    Component: Operations,
  },
  {
    path: "/investment",
    Component: Investment,
  },
  {
    path: "/settings",
    Component: Settings,
  },
]);
