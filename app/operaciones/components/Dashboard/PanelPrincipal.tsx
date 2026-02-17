'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Target,
    Activity,
    MapPin,
    Phone,
    MessageSquare,
    CheckCircle2
} from 'lucide-react';

export default function PanelPrincipal() {
    const metrics = [
        {
            title: 'Total Votantes',
            value: '500',
            change: '+12%',
            trend: 'up',
            icon: Users,
            gradient: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Tasa de Contacto',
            value: '100%',
            change: '+5.3%',
            trend: 'up',
            icon: Phone,
            gradient: 'from-emerald-500 to-emerald-600'
        },
        {
            title: 'Intención Promedio',
            value: '50.42%',
            change: '+2.1%',
            trend: 'up',
            icon: Target,
            gradient: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Interacciones (7d)',
            value: '104',
            change: '+18%',
            trend: 'up',
            icon: MessageSquare,
            gradient: 'from-orange-500 to-orange-600'
        },
        {
            title: 'Tasa de Conversión',
            value: '19%',
            change: '+7.2%',
            trend: 'up',
            icon: TrendingUp,
            gradient: 'from-green-500 to-green-600'
        },
        {
            title: 'Alta Intención',
            value: '31%',
            change: '+4.8%',
            trend: 'up',
            icon: CheckCircle2,
            gradient: 'from-cyan-500 to-cyan-600'
        }
    ];

    const recentActivity = [
        {
            type: 'visit',
            message: 'Picardo Vega contactó a Teresa Alonso en',
            location: 'Comuna 3, Sector Norte',
            time: 'Hace un momento',
            icon: MapPin,
            color: 'text-blue-400'
        },
        {
            type: 'call',
            message: 'Llamada completada con Juan Martínez',
            location: 'Comuna 1, Centro',
            time: 'Hace 5 minutos',
            icon: Phone,
            color: 'text-emerald-400'
        },
        {
            type: 'message',
            message: 'Nuevo mensaje de María González',
            location: 'Comuna 2, Sur',
            time: 'Hace 12 minutos',
            icon: MessageSquare,
            color: 'text-purple-400'
        },
        {
            type: 'conversion',
            message: 'Carlos Rodríguez confirmó su intención',
            location: 'Comuna 4, Occidente',
            time: 'Hace 25 minutos',
            icon: CheckCircle2,
            color: 'text-green-400'
        }
    ];

    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Panel Principal</h1>
                <p className="text-slate-400">Vista general del sistema de operaciones</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <motion.div
                            key={metric.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex items-center space-x-1 text-sm">
                                    <TrendingUp className="h-4 w-4 text-green-400" />
                                    <span className="text-green-400 font-medium">{metric.change}</span>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                            <div className="text-sm text-slate-400">{metric.title}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Activity Feed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-primary-400" />
                        Actividad Reciente
                    </h2>
                    <button className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                        Ver todo
                    </button>
                </div>

                <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                className="flex items-start space-x-4 p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300 border border-transparent hover:border-slate-700/50"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0`}>
                                    <Icon className={`h-5 w-5 ${activity.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white font-medium mb-1">{activity.message}</p>
                                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                                        <span className="flex items-center">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {activity.location}
                                        </span>
                                        <span>•</span>
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
