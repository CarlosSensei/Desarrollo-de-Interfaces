import { motion } from "motion/react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Globe,
  Moon,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Smartphone,
  Mail,
  Phone,
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const settingsSections = [
  {
    title: "Cuenta",
    items: [
      { icon: User, label: "Datos personales", description: "Nombre, email, teléfono" },
      { icon: Lock, label: "Seguridad", description: "Contraseña y autenticación" },
      { icon: CreditCard, label: "Tarjetas vinculadas", description: "Gestiona tus tarjetas" },
    ],
  },
  {
    title: "Preferencias",
    items: [
      { icon: Bell, label: "Notificaciones", description: "Alertas y avisos" },
      { icon: Globe, label: "Idioma", description: "Español", hasValue: true },
      { icon: Moon, label: "Tema", description: "Claro", hasValue: true },
    ],
  },
  {
    title: "Seguridad y privacidad",
    items: [
      { icon: Shield, label: "Autenticación de dos factores", description: "Activado", hasValue: true },
      { icon: Smartphone, label: "Dispositivos vinculados", description: "2 dispositivos" },
    ],
  },
  {
    title: "Ayuda",
    items: [
      { icon: HelpCircle, label: "Centro de ayuda", description: "FAQs y soporte" },
      { icon: Mail, label: "Contactar soporte", description: "soporte@banco.com" },
      { icon: Phone, label: "Línea telefónica", description: "800-123-4567" },
      { icon: FileText, label: "Términos y condiciones", description: "Políticas y legal" },
    ],
  },
];

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with Profile */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-light mb-6">Opciones</h1>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl cursor-pointer"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjE4Mjg0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Usuario"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Carlos Rodríguez</h3>
              <p className="text-sm text-gray-600">carlos.rodriguez@email.com</p>
              <p className="text-xs text-gray-500 mt-1">Cliente Premium • ID: #123456</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.03) }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <h4 className="font-medium text-gray-900">{item.label}</h4>
                        <p className="text-sm text-gray-500 truncate">
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* App Version */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">Versión 2.5.0</p>
            <p className="text-xs text-gray-400 mt-1">
              © 2026 Banco Digital. Todos los derechos reservados.
            </p>
          </div>

          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-red-50 transition-colors shadow-sm border-2 border-red-100"
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-600">Cerrar sesión</span>
          </motion.button>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3"
          >
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Tu seguridad es nuestra prioridad
              </h4>
              <p className="text-sm text-blue-700">
                Nunca compartiremos tu información personal. Todas las transacciones
                están protegidas con encriptación de extremo a extremo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
