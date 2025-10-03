'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard,
  Globe,
  Users,
  BarChart2,
  Settings,
  Shield,
  HelpCircle,
  Zap
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  isCollapsed: boolean;
  activeView: 'dashboard' | 'map' | 'voters' | 'analytics';
  onViewChange: (view: 'dashboard' | 'map' | 'voters' | 'analytics') => void;
}

const navigationItems = [
  {
    id: 'dashboard' as const,
    title: 'Panel Principal',
    icon: LayoutDashboard,
    description: 'Vista general del sistema',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'map' as const,
    title: 'Mapa Electoral',
    icon: Globe,
    description: 'Vista geográfica de operaciones',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'voters' as const,
    title: 'Gestión Votantes',
    icon: Users,
    description: 'Base de datos de votantes',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'analytics' as const,
    title: 'Análisis',
    icon: BarChart2,
    description: 'Reportes y métricas',
    gradient: 'from-orange-500 to-orange-600'
  }
];

export function Sidebar({ isCollapsed, activeView, onViewChange }: SidebarProps) {
  return (
    <div className={clsx(
      'fixed left-0 top-0 h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-700/50 transition-all duration-300 z-30',
      isCollapsed ? 'w-16' : 'w-72'
    )}>
      {/* Header */}
      <div className={clsx(
        'flex items-center justify-center h-16 border-b border-slate-700/50',
        isCollapsed ? 'px-2' : 'px-6'
      )}>
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Centro Electoral</h1>
              <p className="text-xs text-slate-400">Control de Operaciones</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={clsx('flex-1 p-4 space-y-2', isCollapsed && 'px-2')}>
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                'w-full group relative flex items-center rounded-xl transition-all duration-300 hover:scale-[1.02]',
                isCollapsed ? 'p-3 justify-center' : 'px-4 py-3',
                isActive 
                  ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20 shadow-lg' 
                  : 'hover:bg-white/5 border border-transparent hover:border-white/10'
              )}
            >
              <div className={clsx(
                'flex items-center justify-center rounded-lg transition-all duration-300',
                isCollapsed ? 'w-8 h-8' : 'w-10 h-10 mr-3',
                isActive 
                  ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                  : 'bg-white/5 group-hover:bg-white/10'
              )}>
                <Icon className={clsx(
                  'transition-colors duration-300',
                  isCollapsed ? 'h-4 w-4' : 'h-5 w-5',
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                )} />
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className={clsx(
                    'text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  )}>
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                    {item.description}
                  </div>
                </div>
              )}
              
              {isActive && !isCollapsed && (
                <div className="w-1 h-8 bg-gradient-to-b from-primary-400 to-secondary-400 rounded-full" />
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.title}
                </div>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className={clsx(
        'border-t border-slate-700/50 p-4 space-y-2',
        isCollapsed && 'px-2'
      )}>
        {/* System Status */}
        <div className={clsx(
          'rounded-xl p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20',
          isCollapsed && 'p-2'
        )}>
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {!isCollapsed && (
                <span className="text-xs text-green-300 font-medium">Sistema Activo</span>
              )}
            </div>
          </div>
          {!isCollapsed && (
            <div className="text-xs text-slate-400 text-center mt-1">
              Todos los sistemas operativos
            </div>
          )}
        </div>

        {/* Settings Button */}
        <button className={clsx(
          'w-full group flex items-center rounded-xl px-3 py-3 transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10',
          isCollapsed && 'justify-center'
        )}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">
            <Settings className="h-4 w-4 text-slate-300 group-hover:text-white" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
              Configuración
            </span>
          )}
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Configuración
            </div>
          )}
        </button>

        {/* Help Button */}
        <button className={clsx(
          'w-full group flex items-center rounded-xl px-3 py-3 transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10',
          isCollapsed && 'justify-center'
        )}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">
            <HelpCircle className="h-4 w-4 text-slate-300 group-hover:text-white" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
              Ayuda
            </span>
          )}
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Ayuda
            </div>
          )}
        </button>
      </div>
    </div>
  );
}