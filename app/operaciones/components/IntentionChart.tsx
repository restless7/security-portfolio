'use client';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { mockKPIs } from '@/app/operaciones/lib/mockData';

export function IntentionChart() {
  // Generate mock time series data for intention trends
  const chartData = useMemo(() => {
    const days = 14; // Last 14 days
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate realistic intention trend data
      const baseIntention = mockKPIs.averageIntention;
      const variance = Math.random() * 10 - 5; // ±5 points variance
      const intention = Math.max(0, Math.min(100, baseIntention + variance));
      
      // Generate contact and interaction data
      const contacts = Math.floor(Math.random() * 50) + 20;
      const positiveRate = Math.random() * 30 + 40; // 40-70%
      
      data.push({
        date: date.toLocaleDateString('es-CO', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        intencion: Math.round(intention * 100) / 100,
        contactos: contacts,
        tasaPositiva: Math.round(positiveRate * 100) / 100
      });
    }
    
    return data;
  }, []);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700">
                {entry.name}: <span className="font-medium">{entry.value}
                {entry.dataKey === 'intencion' || entry.dataKey === 'tasaPositiva' ? '%' : ''}
                </span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Tendencia de Intención (Últimos 14 días)
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-600">Intención Promedio</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600">Tasa Positiva</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip content={customTooltip} />
            <Line
              type="monotone"
              dataKey="intencion"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
              name="Intención"
            />
            <Line
              type="monotone"
              dataKey="tasaPositiva"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
              name="Tasa Positiva"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {chartData[chartData.length - 1]?.intencion}%
            </div>
            <div className="text-xs text-gray-600">Intención Actual</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              +{Math.round((chartData[chartData.length - 1]?.intencion - chartData[0]?.intencion) * 100) / 100}%
            </div>
            <div className="text-xs text-gray-600">Cambio (14d)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {Math.round(chartData.reduce((sum, d) => sum + d.contactos, 0))}
            </div>
            <div className="text-xs text-gray-600">Contactos Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}