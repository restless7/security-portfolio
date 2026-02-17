'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';

export default function AnalisisView() {
    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Análisis y Reportes</h1>
                <p className="text-slate-400">Métricas detalladas y tendencias</p>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1 - Tendencia de Intención */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-primary-400" />
                            Tendencia de Intención
                        </h3>
                        <button className="text-sm text-primary-400 hover:text-primary-300">
                            <Download className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="h-64 flex items-center justify-center text-slate-400">
                        <div className="text-center">
                            <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>Gráfico de tendencias</p>
                            <p className="text-sm">(Últimos 14 días)</p>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">+2.07%</div>
                            <div className="text-xs text-slate-400">Cambio (7d)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">50.56%</div>
                            <div className="text-xs text-slate-400">Intención Actual</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">531</div>
                            <div className="text-xs text-slate-400">Contactos Total</div>
                        </div>
                    </div>
                </motion.div>

                {/* Chart 2 - Distribución por Estado */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center">
                            <PieChart className="h-5 w-5 mr-2 text-emerald-400" />
                            Distribución por Estado
                        </h3>
                        <button className="text-sm text-primary-400 hover:text-primary-300">
                            <Download className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="h-64 flex items-center justify-center text-slate-400">
                        <div className="text-center">
                            <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>Gráfico circular</p>
                            <p className="text-sm">(Distribución de estados)</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green-400 mr-2" />
                                <span className="text-sm text-slate-300">Confirmados</span>
                            </div>
                            <span className="text-sm font-medium text-white">45%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                                <span className="text-sm text-slate-300">Pendientes</span>
                            </div>
                            <span className="text-sm font-medium text-white">35%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                                <span className="text-sm text-slate-300">Oposición</span>
                            </div>
                            <span className="text-sm font-medium text-white">20%</span>
                        </div>
                    </div>
                </motion.div>

                {/* Chart 3 - Conversión por Territorio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
                            Conversión por Territorio
                        </h3>
                        <button className="text-sm text-primary-400 hover:text-primary-300">
                            <Download className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {['Comuna 1', 'Comuna 2', 'Comuna 3', 'Comuna 4', 'Comuna 5'].map((comuna, i) => (
                            <div key={comuna}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-300">{comuna}</span>
                                    <span className="text-sm font-medium text-white">{85 - i * 5}%</span>
                                </div>
                                <div className="w-full bg-slate-700/50 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${85 - i * 5}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Chart 4 - Actividad por Líder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2 text-orange-400" />
                            Top Líderes
                        </h3>
                        <button className="text-sm text-primary-400 hover:text-primary-300">
                            Ver todos
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'María González', voters: 150, conversion: 92 },
                            { name: 'Carlos Rodríguez', voters: 142, conversion: 88 },
                            { name: 'Ana Martínez', voters: 135, conversion: 85 },
                            { name: 'Juan Pérez', voters: 128, conversion: 82 },
                            { name: 'Laura Sánchez', voters: 120, conversion: 80 }
                        ].map((leader, i) => (
                            <div key={leader.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">{leader.name}</div>
                                        <div className="text-xs text-slate-400">{leader.voters} votantes</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-green-400">{leader.conversion}%</div>
                                    <div className="text-xs text-slate-400">Conversión</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
