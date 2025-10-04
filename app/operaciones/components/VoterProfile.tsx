/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Target,
  Tag,
  Plus,
  MessageSquare,
  PhoneCall,
  UserCheck,
  Edit,
  ExternalLink,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Activity
} from 'lucide-react';
import clsx from 'clsx';
import { mockInteractions, type Voter, type Interaction } from '@/app/operaciones/lib/mockData';

interface VoterProfileProps {
  voter: Voter;
  onClose: () => void;
}

export function VoterProfile({ voter, onClose }: VoterProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactions' | 'analysis'>('overview');

  // Get interactions for this voter
  const voterInteractions = mockInteractions.filter(i => i.voterId === voter.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getIntentionColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getIntentionLabel = (score: number) => {
    if (score >= 70) return 'Alta Intención';
    if (score >= 40) return 'Intención Media';
    return 'Baja Intención';
  };

  const getInteractionIcon = (type: Interaction['type']) => {
    switch (type) {
      case 'CALL': return PhoneCall;
      case 'VISIT': return UserCheck;
      case 'MESSAGE': return MessageSquare;
      case 'EMAIL': return Mail;
      case 'SURVEY': return FileText;
      case 'SOCIAL': return Activity;
      default: return MessageSquare;
    }
  };

  const getInteractionColor = (result?: string) => {
    switch (result) {
      case 'positivo': return 'text-green-600 bg-green-100';
      case 'negativo': return 'text-red-600 bg-red-100';
      case 'indeciso': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentEmoji = (sentiment?: number) => {
    if (sentiment === undefined) return '😐';
    if (sentiment > 0.3) return '😊';
    if (sentiment < -0.3) return '😞';
    return '😐';
  };

  // Calculate interaction stats
  const interactionStats = {
    total: voterInteractions.length,
    positive: voterInteractions.filter(i => i.result === 'positivo').length,
    negative: voterInteractions.filter(i => i.result === 'negativo').length,
    thisWeek: voterInteractions.filter(i => 
      new Date(i.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        
        {/* Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl"
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                    {voter.namePseudo.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {voter.namePseudo}
                    </h2>
                    <p className="text-sm text-gray-600">
                      ID: {voter.externalId} • {voter.neighborhood}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 hover:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="mt-4 flex space-x-1">
                {[
                  { id: 'overview', label: 'Resumen', icon: Target },
                  { id: 'interactions', label: 'Interacciones', icon: MessageSquare },
                  { id: 'analysis', label: 'Análisis', icon: TrendingUp }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={clsx(
                      'flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:bg-white/50'
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="p-6 space-y-6">
                  {/* Intention Score */}
                  <div className={clsx(
                    'rounded-xl border-2 p-4',
                    getIntentionColor(voter.intentionScore)
                  )}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {getIntentionLabel(voter.intentionScore)}
                        </h3>
                        <p className="text-sm opacity-75">
                          Puntuación: {voter.intentionScore}%
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {voter.intentionScore}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-white/30 rounded-full h-2">
                      <div 
                        className="bg-current h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${voter.intentionScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Información Personal</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Edad:</span>
                        <span className="ml-2 font-medium">{voter.age || 'No especificada'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Género:</span>
                        <span className="ml-2 font-medium">{voter.gender || 'No especificado'}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Dirección:</span>
                        <span className="ml-2 font-medium">{voter.address || 'No especificada'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Contacto</h3>
                    <div className="space-y-2">
                      {voter.phoneNumber && (
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{voter.phoneNumber}</span>
                          <button className="text-blue-600 hover:text-blue-700">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      {voter.email && (
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{voter.email}</span>
                          <button className="text-blue-600 hover:text-blue-700">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{voter.neighborhood}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {voter.tags.map(tag => (
                        <span 
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                      <button className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                        <Plus className="h-3 w-3 mr-1" />
                        Agregar
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="text-xl font-bold text-blue-900">
                            {interactionStats.total}
                          </div>
                          <div className="text-sm text-blue-700">
                            Interacciones
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <div>
                          <div className="text-xl font-bold text-green-900">
                            {interactionStats.positive}
                          </div>
                          <div className="text-sm text-green-700">
                            Positivas
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'interactions' && (
                <div className="p-6">
                  {/* Add Interaction Button */}
                  <div className="mb-6">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="h-4 w-4" />
                      <span>Nueva Interacción</span>
                    </button>
                  </div>

                  {/* Interactions Timeline */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Historial de Interacciones</h3>
                    {voterInteractions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No hay interacciones registradas</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {voterInteractions.map((interaction, index) => {
                          const Icon = getInteractionIcon(interaction.type);
                          return (
                            <motion.div
                              key={interaction.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="p-2 bg-white rounded-lg">
                                  <Icon className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="font-medium text-gray-900">
                                        {interaction.type} - {interaction.channel}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {new Date(interaction.timestamp).toLocaleString('es-CO')}
                                      </p>
                                    </div>
                                    {interaction.result && (
                                      <span className={clsx(
                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                        getInteractionColor(interaction.result)
                                      )}>
                                        {interaction.result}
                                      </span>
                                    )}
                                  </div>
                                  {interaction.notes && (
                                    <p className="text-sm text-gray-700 mt-2">
                                      {interaction.notes}
                                    </p>
                                  )}
                                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                                    {interaction.duration && (
                                      <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {interaction.duration}min
                                      </span>
                                    )}
                                    {interaction.sentiment !== undefined && (
                                      <span className="flex items-center">
                                        <span className="mr-1">Sentimiento:</span>
                                        {getSentimentEmoji(interaction.sentiment)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'analysis' && (
                <div className="p-6 space-y-6">
                  {/* Interaction Analysis */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Análisis de Interacciones</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {interactionStats.positive}
                        </div>
                        <div className="text-sm text-gray-600">Positivas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {interactionStats.negative}
                        </div>
                        <div className="text-sm text-gray-600">Negativas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {interactionStats.thisWeek}
                        </div>
                        <div className="text-sm text-gray-600">Esta semana</div>
                      </div>
                    </div>
                  </div>

                  {/* Contact History */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Historial de Contacto</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Primer contacto:</span>
                        <span className="font-medium">
                          {voterInteractions.length > 0 
                            ? new Date(voterInteractions[voterInteractions.length - 1].timestamp).toLocaleDateString('es-CO')
                            : 'Sin contacto'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Último contacto:</span>
                        <span className="font-medium">
                          {voter.lastContact 
                            ? new Date(voter.lastContact).toLocaleDateString('es-CO')
                            : 'Sin contacto'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frecuencia promedio:</span>
                        <span className="font-medium">
                          {interactionStats.total > 0 ? '1 por semana' : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Recomendaciones
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      {voter.intentionScore >= 70 ? (
                        <>
                          <li>• Mantener contacto regular para confirmar voto</li>
                          <li>• Invitar a eventos de campaña</li>
                          <li>• Solicitar ayuda para convencer a otros</li>
                        </>
                      ) : voter.intentionScore >= 40 ? (
                        <>
                          <li>• Intensificar contacto personal</li>
                          <li>• Proporcionar información específica sobre propuestas</li>
                          <li>• Identificar temas de interés personal</li>
                        </>
                      ) : (
                        <>
                          <li>• Evaluar viabilidad de conversión</li>
                          <li>• Contacto esporádico y respetuoso</li>
                          <li>• Enfocarse en temas comunes</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Nueva Interacción</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Ubicar</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}