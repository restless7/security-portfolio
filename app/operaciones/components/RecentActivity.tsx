'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity,
  MessageSquare,
  PhoneCall,
  UserCheck,
  Mail,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  MapPin,
  RefreshCw
} from 'lucide-react';
import clsx from 'clsx';
import { mockInteractions, mockVoters, mockUsers, generateRealtimeEvent } from '@/app/operaciones/lib/mockData';

interface ActivityItem {
  id: string;
  type: 'interaction' | 'system' | 'alert';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
  voter?: string;
  neighborhood?: string;
  severity?: 'info' | 'success' | 'warning' | 'error';
  icon: React.ComponentType<any>;
  color: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate initial activities from recent interactions
  const generateActivities = (): ActivityItem[] => {
    const recentInteractions = mockInteractions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15);

    const activityItems: ActivityItem[] = [];

    // Add interaction activities
    recentInteractions.forEach(interaction => {
      const voter = mockVoters.find(v => v.id === interaction.voterId);
      const user = mockUsers.find(u => u.id === interaction.userId);
      
      const getInteractionIcon = (type: string) => {
        switch (type) {
          case 'CALL': return PhoneCall;
          case 'VISIT': return UserCheck;
          case 'MESSAGE': return MessageSquare;
          case 'EMAIL': return Mail;
          case 'SURVEY': return FileText;
          default: return MessageSquare;
        }
      };

      const getInteractionColor = (result?: string) => {
        switch (result) {
          case 'positivo': return 'text-green-600';
          case 'negativo': return 'text-red-600';
          case 'indeciso': return 'text-yellow-600';
          default: return 'text-blue-600';
        }
      };

      activityItems.push({
        id: interaction.id,
        type: 'interaction',
        title: `${interaction.type} - ${interaction.channel}`,
        description: `${user?.name || 'Sistema'} contactó a ${voter?.namePseudo || 'votante'} en ${voter?.neighborhood || 'ubicación desconocida'}. Resultado: ${interaction.result || 'pendiente'}`,
        timestamp: new Date(interaction.timestamp),
        user: user?.name,
        voter: voter?.namePseudo,
        neighborhood: voter?.neighborhood,
        severity: interaction.result === 'positivo' ? 'success' : 
                 interaction.result === 'negativo' ? 'warning' : 'info',
        icon: getInteractionIcon(interaction.type),
        color: getInteractionColor(interaction.result)
      });
    });

    // Add some system activities
    const systemActivities: ActivityItem[] = [
      {
        id: 'sys-1',
        type: 'system',
        title: 'Sincronización completada',
        description: 'Base de datos sincronizada con éxito. 847 registros actualizados.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        severity: 'success',
        icon: CheckCircle,
        color: 'text-green-600'
      },
      {
        id: 'sys-2',
        type: 'alert',
        title: 'Meta diaria alcanzada',
        description: 'Se completó el objetivo de 100 contactos diarios en Chapinero.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        neighborhood: 'Chapinero',
        severity: 'success',
        icon: TrendingUp,
        color: 'text-green-600'
      },
      {
        id: 'sys-3',
        type: 'alert',
        title: 'Pico de actividad detectado',
        description: 'Incremento inusual de interacciones positivas en zona norte.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        severity: 'info',
        icon: AlertTriangle,
        color: 'text-blue-600'
      }
    ];

    return [...activityItems, ...systemActivities]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 20);
  };

  // Initialize activities
  useEffect(() => {
    setActivities(generateActivities());
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const event = generateRealtimeEvent();
        const newActivity: ActivityItem = {
          id: `rt-${Date.now()}`,
          type: event.type === 'system_alert' ? 'alert' : 'system',
          title: event.message.split(':')[0],
          description: event.message,
          timestamp: new Date(),
          severity: event.severity as any,
          icon: event.type === 'high_intention_detected' ? TrendingUp : 
                event.type === 'system_alert' ? AlertTriangle : Activity,
          color: event.severity === 'success' ? 'text-green-600' :
                 event.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
        };

        setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setActivities(generateActivities());
    setIsRefreshing(false);
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Hace un momento';
    if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays} días`;
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'success': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'error': return 'bg-red-100';
      default: return 'bg-blue-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-600" />
            Actividad Reciente
          </h3>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={clsx(
              'h-4 w-4 text-gray-600',
              isRefreshing && 'animate-spin'
            )} />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className={clsx(
                    'p-2 rounded-lg flex-shrink-0',
                    getSeverityColor(activity.severity)
                  )}>
                    <Icon className={clsx('h-4 w-4', activity.color)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </h4>
                      <span className="text-xs text-gray-500 ml-2">
                        {getTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    {/* Additional metadata */}
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      {activity.user && (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{activity.user}</span>
                        </div>
                      )}
                      {activity.neighborhood && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{activity.neighborhood}</span>
                        </div>
                      )}
                      {activity.type === 'interaction' && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{activity.timestamp.toLocaleTimeString('es-CO', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {activities.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No hay actividad reciente</p>
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center">
          Ver toda la actividad
        </button>
      </div>
    </div>
  );
}