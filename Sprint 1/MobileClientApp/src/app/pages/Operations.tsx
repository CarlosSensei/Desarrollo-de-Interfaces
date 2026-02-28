import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import BottomNav from "../components/BottomNav";

interface Transaction {
  id: number;
  name: string;
  category: string;
  date: string;
  time: string;
  amount: number;
  type: "income" | "expense";
  icon: string;
}

const allTransactions: Transaction[] = [
  {
    id: 1,
    name: "Supermercado Central",
    category: "Compras",
    date: "28 Feb 2026",
    time: "10:30",
    amount: -45.50,
    type: "expense",
    icon: "🛒",
  },
  {
    id: 2,
    name: "Transferencia recibida",
    category: "María González",
    date: "28 Feb 2026",
    time: "08:15",
    amount: 200.00,
    type: "income",
    icon: "💸",
  },
  {
    id: 3,
    name: "Salario - Empresa XYZ",
    category: "Ingresos",
    date: "27 Feb 2026",
    time: "09:00",
    amount: 2500.00,
    type: "income",
    icon: "💼",
  },
  {
    id: 4,
    name: "Restaurante La Plaza",
    category: "Alimentación",
    date: "27 Feb 2026",
    time: "14:30",
    amount: -32.80,
    type: "expense",
    icon: "🍽️",
  },
  {
    id: 5,
    name: "Netflix Suscripción",
    category: "Entretenimiento",
    date: "26 Feb 2026",
    time: "00:01",
    amount: -15.99,
    type: "expense",
    icon: "📺",
  },
  {
    id: 6,
    name: "Gasolina Shell",
    category: "Transporte",
    date: "25 Feb 2026",
    time: "17:45",
    amount: -60.00,
    type: "expense",
    icon: "⛽",
  },
  {
    id: 7,
    name: "Farmacia Salud",
    category: "Salud",
    date: "24 Feb 2026",
    time: "11:20",
    amount: -28.50,
    type: "expense",
    icon: "💊",
  },
  {
    id: 8,
    name: "Freelance - Cliente ABC",
    category: "Ingresos",
    date: "23 Feb 2026",
    time: "16:00",
    amount: 850.00,
    type: "income",
    icon: "💻",
  },
];

const categories = ["Todas", "Ingresos", "Gastos", "Compras", "Alimentación", "Transporte"];

export default function Operations() {
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesCategory =
      selectedFilter === "Todas" ||
      (selectedFilter === "Ingresos" && transaction.type === "income") ||
      (selectedFilter === "Gastos" && transaction.type === "expense") ||
      transaction.category === selectedFilter;

    const matchesSearch =
      searchQuery === "" ||
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalIncome = allTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = allTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-light mb-6">Operaciones</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Ingresos</span>
              </div>
              <p className="text-xl font-semibold text-green-900">
                ${totalIncome.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-red-50 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">Gastos</span>
              </div>
              <p className="text-xl font-semibold text-red-900">
                ${totalExpense.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
              </p>
            </motion.div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar operaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
          >
            <Filter className="w-4 h-4" />
            Filtros
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </motion.button>
        </div>
      </div>

      {/* Category Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4">
              <div className="max-w-md mx-auto flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                      selectedFilter === category
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transactions List */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-600 mb-4">
            {filteredTransactions.length} {filteredTransactions.length === 1 ? "operación" : "operaciones"}
          </p>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {transaction.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {transaction.name}
                    </h4>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {transaction.date} • {transaction.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-semibold text-lg ${
                        transaction.type === "income" ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTransactions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No hay resultados</h3>
              <p className="text-gray-500 text-sm">
                Intenta con otros filtros o busca algo diferente
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
