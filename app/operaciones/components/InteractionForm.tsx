'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Save,
  User,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Star,
  AlertCircle
} from 'lucide-react';
import clsx from 'clsx';
import { type Voter, type Interaction } from '@/app/operaciones/lib/mockData';

interface InteractionFormProps {
  isOpen: boolean;
  onClose: () => void;
  voter?: Voter;
  onSubmit: (interaction: Partial<Interaction>) => void;
}

export function InteractionForm({ isOpen, onClose, voter, onSubmit }: InteractionFormProps) {
  const [formData, setFormData] = useState({
    type: 'CALL' as Interaction['type'],
    channel: 'call',
    result: '',
    sentiment: 0,
    notes: '',
    duration: '',
    location: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interactionTypes = [
    { value: 'CALL', label: 'Llamada Telefónica', icon: Phone, channels: ['call', 'whatsapp-call'] },
    { value: 'MESSAGE', label: 'Mensaje', icon: MessageSquare, channels: ['whatsapp', 'sms', 'telegram'] },
    { value: 'VISIT', label: 'Visita Domiciliaria', icon: MapPin, channels: ['visit', 'door-to-door'] },
    { value: 'EMAIL', label: 'Correo Electrónico', icon: MessageSquare, channels: ['email', 'newsletter'] },
    { value: 'SURVEY', label: 'Encuesta', icon: AlertCircle, channels: ['survey', 'poll', 'questionnaire'] },
    { value: 'SOCIAL', label: 'Redes Sociales', icon: Star, channels: ['facebook', 'instagram', 'twitter'] }
  ];

  const results = [
    { value: 'positivo', label: 'Positivo', color: 'text-green-600' },
    { value: 'negativo', label: 'Negativo', color: 'text-red-600' },
    { value: 'indeciso', label: 'Indeciso', color: 'text-yellow-600' },
    { value: 'no-responde', label: 'No Responde', color: 'text-gray-600' },
    { value: 'reagendar', label: 'Reagendar', color: 'text-blue-600' }
  ];

  const selectedType = interactionTypes.find(t => t.value === formData.type);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.type) newErrors.type = 'Tipo de interacción es requerido';
    if (!formData.channel) newErrors.channel = 'Canal es requerido';
    if (!formData.result) newErrors.result = 'Resultado es requerido';
    if (!formData.notes.trim()) newErrors.notes = 'Notas son requeridas';

    if (formData.duration && isNaN(Number(formData.duration))) {
      newErrors.duration = 'Duración debe ser un número';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const interactionData: Partial<Interaction> = {
        voterId: voter?.id,
        type: formData.type,
        channel: formData.channel,
        result: formData.result,
        sentiment: formData.sentiment / 100, // Convert to -1 to 1 scale
        notes: formData.notes,
        duration: formData.duration ? Number(formData.duration) : undefined,
        timestamp: new Date().toISOString(),
        metadata: {
          formVersion: '1.0',
          userAgent: navigator.userAgent,
          source: 'operations-center'
        }
      };

      await onSubmit(interactionData);
      onClose();
      
      // Reset form
      setFormData({
        type: 'CALL',
        channel: 'call',
        result: '',
        sentiment: 0,
        notes: '',
        duration: '',
        location: ''
      });
      setErrors({});

    } catch (error) {
      console.error('Error submitting interaction:', error);
      setErrors({ submit: 'Error al guardar la interacción. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

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
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="absolute inset-4 md:inset-8 lg:inset-16 bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Nueva Interacción
                  </h2>
                  {voter && (
                    <p className="text-sm text-gray-600 mt-1">
                      <User className="h-4 w-4 inline mr-2" />
                      {voter.namePseudo} • {voter.neighborhood}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 hover:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Interaction Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tipo de Interacción *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interactionTypes.map(type => {
                      const Icon = type.icon;
                      const isSelected = formData.type === type.value;
                      
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => {
                            handleInputChange('type', type.value);
                            handleInputChange('channel', type.channels[0]);
                          }}
                          className={clsx(
                            'p-4 rounded-lg border-2 transition-all hover:scale-105',
                            isSelected
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          )}
                        >
                          <Icon className="h-6 w-6 mx-auto mb-2" />
                          <div className="text-sm font-medium">{type.label}</div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
                </div>

                {/* Channel */}
                {selectedType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Canal *
                    </label>
                    <select
                      value={formData.channel}
                      onChange={(e) => handleInputChange('channel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {selectedType.channels.map(channel => (
                        <option key={channel} value={channel}>
                          {channel.charAt(0).toUpperCase() + channel.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                    {errors.channel && <p className="text-red-600 text-sm mt-1">{errors.channel}</p>}
                  </div>
                )}

                {/* Result */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Resultado *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {results.map(result => (
                      <button
                        key={result.value}
                        type="button"
                        onClick={() => handleInputChange('result', result.value)}
                        className={clsx(
                          'p-3 rounded-lg border-2 transition-all text-center',
                          formData.result === result.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <div className={clsx('text-sm font-medium', result.color)}>
                          {result.label}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.result && <p className="text-red-600 text-sm mt-1">{errors.result}</p>}
                </div>

                {/* Sentiment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sentimiento ({formData.sentiment > 0 ? 'Positivo' : formData.sentiment < 0 ? 'Negativo' : 'Neutral'})
                  </label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    step="10"
                    value={formData.sentiment}
                    onChange={(e) => handleInputChange('sentiment', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Muy Negativo</span>
                    <span>Neutral</span>
                    <span>Muy Positivo</span>
                  </div>
                </div>

                {/* Duration (for calls and visits) */}
                {(formData.type === 'CALL' || formData.type === 'VISIT') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Duración (minutos)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="300"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="Ej: 15"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.duration && <p className="text-red-600 text-sm mt-1">{errors.duration}</p>}
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas de la Interacción *
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={4}
                    placeholder="Describe los detalles de la interacción, temas tratados, siguiente paso, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  {errors.notes && <p className="text-red-600 text-sm mt-1">{errors.notes}</p>}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4">
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{errors.submit}</p>
                </div>
              )}
              
              <div className="flex space-x-3 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSubmitting ? 'Guardando...' : 'Guardar Interacción'}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}