import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, PieChart, DollarSign, Plus, Info } from "lucide-react";
import BottomNav from "../components/BottomNav";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts";

const portfolioData = [
  { month: "Oct", value: 8500 },
  { month: "Nov", value: 9200 },
  { month: "Dic", value: 8800 },
  { month: "Ene", value: 10100 },
  { month: "Feb", value: 11500 },
];

const investments = [
  {
    id: 1,
    name: "Fondo de Inversión Global",
    type: "Fondo mutuo",
    amount: 5000,
    returns: 12.5,
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Acciones Tech",
    type: "Acciones",
    amount: 3500,
    returns: 18.2,
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Bonos del Tesoro",
    type: "Bonos",
    amount: 2000,
    returns: 5.8,
    color: "#10b981",
  },
  {
    id: 4,
    name: "Criptomonedas",
    type: "Crypto",
    amount: 1000,
    returns: -3.2,
    color: "#f59e0b",
  },
];

const pieData = investments.map((inv) => ({
  name: inv.name,
  value: inv.amount,
}));

export default function Investment() {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const periods = ["1S", "1M", "3M", "1A", "Todo"];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = investments.reduce(
    (sum, inv) => sum + (inv.amount * inv.returns) / 100,
    0
  );
  const totalValue = totalInvested + totalReturns;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-light mb-6">Inversión</h1>

          {/* Portfolio Value */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white mb-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm opacity-90">Valor total del portafolio</span>
            </div>
            <h2 className="text-4xl font-semibold mb-4">
              ${totalValue.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <p className="opacity-75">Ganancia total</p>
                <p className="text-lg font-medium text-green-300">
                  +${totalReturns.toFixed(2)} ({((totalReturns / totalInvested) * 100).toFixed(2)}%)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Period Selector */}
          <div className="flex gap-2 mb-4">
            {periods.map((period) => (
              <motion.button
                key={period}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPeriod(period)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {period}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 py-6 bg-white">
        <div className="max-w-md mx-auto">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Evolución del portafolio
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Chart */}
      <div className="px-6 py-6 bg-white mt-2">
        <div className="max-w-md mx-auto">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Distribución de activos
          </h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPie>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {investments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Investments List */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Mis inversiones</h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-black text-white rounded-full"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-3">
            {investments.map((investment, index) => (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${investment.color}20` }}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: investment.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {investment.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">{investment.type}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        ${investment.amount.toLocaleString("es-ES")}
                      </span>
                      <span
                        className={`text-sm font-medium flex items-center gap-1 ${
                          investment.returns >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {investment.returns >= 0 ? "+" : ""}
                        {investment.returns.toFixed(1)}%
                        <TrendingUp
                          className={`w-4 h-4 ${
                            investment.returns < 0 ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-blue-50 rounded-2xl p-4 flex items-start gap-3"
          >
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Diversifica tu portafolio
              </h4>
              <p className="text-sm text-blue-700">
                Considera distribuir tus inversiones en diferentes tipos de activos
                para reducir riesgos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
