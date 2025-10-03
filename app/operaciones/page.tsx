'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin,
  Users, 
  BarChart2,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Menu,
  X,
  Bell,
  Settings,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Zap,
  Shield,
  Globe,
  Target,
  Phone,
  MessageSquare,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { mockKPIs, generateRealtimeEvent, type Voter } from '@/app/operaciones/lib/mockData';
import { Sidebar } from '@/app/operaciones/components/Sidebar';
import { TopBar } from '@/app/operaciones/components/TopBar';
import { KPICard } from '@/app/operaciones/components/KPICard';
import { OperationsMap } from '@/app/operaciones/components/OperationsMap';
import { VoterTable } from '@/app/operaciones/components/VoterTable';
import { VoterProfile } from '@/app/operaciones/components/VoterProfile';
import { RecentActivity } from '@/app/operaciones/components/RecentActivity';
import { IntentionChart } from '@/app/operaciones/components/IntentionChart';

export default function OperacionesPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'map' | 'voters' | 'analytics'>('dashboard');
  const [currentUser] = useState({
    name: 'Ana López',
    role: 'COORDINATOR' as const,
    avatar: 'AL'
  });

  // Real-time simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const event = generateRealtimeEvent();
      if (Math.random() > 0.7) { // 30% chance to show notification
        toast[event.severity as 'info' | 'success' | 'warning'](event.message, {
          duration: 4000,
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleVoterSelect = (voter: Voter) => {
    setSelectedVoter(voter);
  };

  const handleCloseVoterProfile = () => {
    setSelectedVoter(null);
  };

  const kpis = [
    {
      title: 'Total Votantes',
      value: mockKPIs.totalVoters.toLocaleString(),
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Tasa de Contacto',
      value: `${mockKPIs.contactRate}%`,
      icon: Phone,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      trend: '+5.3%',
      trendUp: true
    },
    {
      title: 'Intención Promedio',
      value: `${mockKPIs.averageIntention}%`,
      icon: Target,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Interacciones (7d)',
      value: mockKPIs.recentInteractions.toLocaleString(),
      icon: MessageSquare,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      trend: '+18%',
      trendUp: true
    },
    {
      title: 'Tasa de Conversión',
      value: `${mockKPIs.conversionRate}%`,
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      trend: '+7.2%',
      trendUp: true
    },
    {
      title: 'Alta Intención',
      value: `${mockKPIs.highIntentionRate}%`,
      icon: CheckCircle,
      color: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
      trend: '+4.8%',
      trendUp: true
    }
  ];

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {kpis.map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <KPICard {...kpi} />
                </motion.div>
              ))}
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[500px]">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      Mapa de Operaciones
                    </h3>
                  </div>
                  <div className="h-[440px]">
                    <OperationsMap onVoterSelect={handleVoterSelect} />
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="space-y-6">
                <IntentionChart />
                <RecentActivity />
              </div>
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-12rem)]">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-600" />
                Vista de Mapa Completa
              </h3>
            </div>
            <div className="h-[calc(100%-4rem)]">
              <OperationsMap onVoterSelect={handleVoterSelect} fullscreen />
            </div>
          </div>
        );

      case 'voters':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Gestión de Votantes
              </h3>
            </div>
            <div className="p-4">
              <VoterTable onVoterSelect={handleVoterSelect} />
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                Análisis y Reportes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mockKPIs.totalInteractions}</div>
                  <div className="text-sm text-gray-600">Total Interacciones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{mockKPIs.positiveInteractions}</div>
                  <div className="text-sm text-gray-600">Positivas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{mockKPIs.negativeInteractions}</div>
                  <div className="text-sm text-gray-600">Negativas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{mockKPIs.indecisiveInteractions}</div>
                  <div className="text-sm text-gray-600">Indecisos</div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IntentionChart />
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Barrios por Intención</h4>
                <div className="space-y-3">
                  {mockKPIs.intentionByNeighborhood.slice(0, 5).map((neighborhood) => (
                    <div key={neighborhood.neighborhood} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{neighborhood.neighborhood}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full" 
                            style={{ width: `${neighborhood.averageIntention}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {neighborhood.averageIntention}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-72'}`}>
        {/* Top Bar */}
        <TopBar 
          currentUser={currentUser}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderMainContent()}
          </motion.div>
        </main>
      </div>

      {/* Voter Profile Drawer */}
      {selectedVoter && (
        <VoterProfile 
          voter={selectedVoter}
          onClose={handleCloseVoterProfile}
        />
      )}
    </div>
  );
}