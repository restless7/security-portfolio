'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu,
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  Shield,
  Clock,
  Wifi
} from 'lucide-react';
import clsx from 'clsx';

interface TopBarProps {
  currentUser: {
    name: string;
    role: 'OPERATOR' | 'COORDINATOR' | 'AUDITOR';
    avatar: string;
  };
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export function TopBar({ currentUser, onToggleSidebar, isSidebarCollapsed }: TopBarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockNotifications = [
    {
      id: 1,
      type: 'info',
      title: 'Nueva interacción registrada',
      message: 'Contacto exitoso con votante en Chapinero',
      time: 'Hace 2 minutos',
      unread: true
    },
    {
      id: 2,
      type: 'success',
      title: 'Meta alcanzada',
      message: 'Se completó el objetivo de contactos diarios',
      time: 'Hace 1 hora',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      title: 'Revisar datos',
      message: 'Inconsistencias detectadas en zona sur',
      time: 'Hace 2 horas',
      unread: false
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'COORDINATOR':
        return 'text-blue-600 bg-blue-100';
      case 'OPERATOR':
        return 'text-green-600 bg-green-100';
      case 'AUDITOR':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'COORDINATOR':
        return 'Coordinador';
      case 'OPERATOR':
        return 'Operador';
      case 'AUDITOR':
        return 'Auditor';
      default:
        return role;
    }
  };

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar votantes, barrios, operadores..."
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full">
            <Wifi className="h-4 w-4 text-green-600" />
            <span className="text-xs font-medium text-green-700">Online</span>
          </div>

          {/* Current Time */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{new Date().toLocaleTimeString('es-CO', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {mockNotifications.some(n => n.unread) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                </div>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notificaciones</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={clsx(
                        'p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors',
                        notification.unread && 'bg-blue-50/50'
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={clsx(
                          'w-2 h-2 rounded-full mt-2',
                          notification.type === 'success' && 'bg-green-500',
                          notification.type === 'warning' && 'bg-yellow-500',
                          notification.type === 'info' && 'bg-blue-500'
                        )} />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Ver todas las notificaciones
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {currentUser.avatar}
                </span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">
                  {currentUser.name}
                </div>
                <div className={clsx(
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  getRoleColor(currentUser.role)
                )}>
                  {getRoleLabel(currentUser.role)}
                </div>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {currentUser.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {currentUser.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {getRoleLabel(currentUser.role)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <User className="h-4 w-4" />
                    <span>Mi Perfil</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Shield className="h-4 w-4" />
                    <span>Seguridad</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </div>
  );
}