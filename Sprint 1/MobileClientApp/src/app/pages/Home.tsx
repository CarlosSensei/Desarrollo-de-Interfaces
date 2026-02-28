import { useState } from "react";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Scan,
  CreditCard,
  Bell,
  ChevronRight,
  Smartphone,
  Zap,
  Gift,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const balance = 12847.50;
  const savingsBalance = 5230.00;

  const quickActions = [
    { icon: ArrowUpRight, label: "Enviar", color: "bg-blue-50 text-blue-600" },
    { icon: ArrowDownLeft, label: "Recibir", color: "bg-green-50 text-green-600" },
    { icon: Scan, label: "Escanear", color: "bg-purple-50 text-purple-600" },
    { icon: CreditCard, label: "Tarjetas", color: "bg-orange-50 text-orange-600" },
  ];

  const recentTransactions = [
    {
      id: 1,
      name: "Supermercado Central",
      date: "Hoy, 10:30",
      amount: -45.50,
      icon: "🛒",
    },
    {
      id: 2,
      name: "Salario - Empresa XYZ",
      date: "Ayer, 09:00",
      amount: 2500.00,
      icon: "💼",
    },
    {
      id: 3,
      name: "Netflix Suscripción",
      date: "26 Feb",
      amount: -15.99,
      icon: "📺",
    },
  ];

  const services = [
    { icon: Smartphone, label: "Recargas", color: "text-blue-600" },
    { icon: Zap, label: "Servicios", color: "text-yellow-600" },
    { icon: Gift, label: "Recompensas", color: "text-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 pt-12 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm text-gray-300 mb-1">Bienvenido de nuevo</p>
              <h1 className="text-xl font-medium">Carlos Rodríguez</h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative p-2 bg-white/10 backdrop-blur-sm rounded-full"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </motion.button>
          </div>

          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-300 mb-2">Saldo disponible</p>
                <div className="flex items-center gap-3">
                  {balanceVisible ? (
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-3xl font-semibold"
                    >
                      ${balance.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                    </motion.h2>
                  ) : (
                    <div className="flex gap-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-white/50 rounded-full" />
                      ))}
                    </div>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="p-1"
                  >
                    {balanceVisible ? (
                      <Eye className="w-5 h-5 text-gray-300" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-300" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-gray-300 mb-1">Ahorros</p>
                <p className="font-medium">
                  ${savingsBalance.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium"
              >
                Ver detalles
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-4 mb-6">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {action.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="px-6 mb-6">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.button
                    key={service.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {service.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 mb-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Movimientos recientes</h3>
            <button className="text-sm text-gray-600 flex items-center gap-1">
              Ver todo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {transaction.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {transaction.name}
                  </h4>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div
                  className={`font-semibold ${
                    transaction.amount > 0 ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  ${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
