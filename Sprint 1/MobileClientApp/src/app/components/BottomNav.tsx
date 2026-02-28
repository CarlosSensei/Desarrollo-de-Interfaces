import { Link, useLocation } from "react-router";
import { Home, ArrowLeftRight, TrendingUp, Settings } from "lucide-react";
import { motion } from "motion/react";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Inicio" },
    { path: "/operations", icon: ArrowLeftRight, label: "Operaciones" },
    { path: "/investment", icon: TrendingUp, label: "Inversión" },
    { path: "/settings", icon: Settings, label: "Opciones" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50 safe-area-bottom">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 relative"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative"
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? "text-black" : "text-gray-400"
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
              <span
                className={`text-xs transition-colors ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
