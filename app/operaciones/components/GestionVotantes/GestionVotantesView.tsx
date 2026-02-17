'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, UserPlus, Download } from 'lucide-react';

export default function GestionVotantesView() {
    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Gestión de Votantes</h1>
                <p className="text-slate-400">Base de datos completa de votantes</p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar votantes, barrio, líder..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                    />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white hover:bg-slate-700/50 transition-all">
                    <Filter className="h-5 w-5" />
                    <span>Filtros</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white hover:from-primary-600 hover:to-secondary-600 transition-all">
                    <UserPlus className="h-5 w-5" />
                    <span>Nuevo Votante</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white hover:bg-slate-700/50 transition-all">
                    <Download className="h-5 w-5" />
                </button>
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-800/50 border-b border-slate-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Teléfono
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Dirección
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Intención
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Líder
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {/* Placeholder rows */}
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white text-sm font-medium mr-3">
                                                {String.fromCharCode(65 + (i % 26))}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">Votante {i}</div>
                                                <div className="text-xs text-slate-400">ID: V{String(i).padStart(4, '0')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                        +57 300 123 {String(i).padStart(4, '0')}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-300">
                                        Calle {i} #{i * 2}-{i * 3}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${i % 3 === 0
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : i % 3 === 1
                                                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                            {i % 3 === 0 ? 'Confirmado' : i % 3 === 1 ? 'Pendiente' : 'Oposición'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-full bg-slate-700/50 rounded-full h-2 mr-2" style={{ width: '80px' }}>
                                                <div
                                                    className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2 rounded-full"
                                                    style={{ width: `${(i * 10) % 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-slate-300">{(i * 10) % 100}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                        Líder {Math.ceil(i / 2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-primary-400 hover:text-primary-300 mr-3">Ver</button>
                                        <button className="text-secondary-400 hover:text-secondary-300">Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700/50 flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                        Mostrando <span className="font-medium text-white">1-10</span> de <span className="font-medium text-white">500</span> votantes
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-slate-700/50 text-white rounded hover:bg-slate-600/50 transition-colors">
                            Anterior
                        </button>
                        <button className="px-3 py-1 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
                            1
                        </button>
                        <button className="px-3 py-1 bg-slate-700/50 text-white rounded hover:bg-slate-600/50 transition-colors">
                            2
                        </button>
                        <button className="px-3 py-1 bg-slate-700/50 text-white rounded hover:bg-slate-600/50 transition-colors">
                            3
                        </button>
                        <button className="px-3 py-1 bg-slate-700/50 text-white rounded hover:bg-slate-600/50 transition-colors">
                            Siguiente
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
