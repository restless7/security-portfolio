'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
  trendUp?: boolean;
  description?: string;
}

export function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  trendUp = true, 
  description 
}: KPICardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {trend && (
              <div className="ml-3 flex items-center">
                {trendUp ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={clsx(
                  'text-sm font-medium',
                  trendUp ? 'text-green-600' : 'text-red-600'
                )}>
                  {trend}
                </span>
              </div>
            )}
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          )}
        </div>
        
        <div className={clsx(
          'p-3 rounded-xl shadow-sm',
          color
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Progress indicator (optional) */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className={clsx(
              'h-1 rounded-full transition-all duration-1000',
              color.replace('bg-gradient-to-r', 'bg-gradient-to-r')
            )}
            style={{ width: '75%' }}
          />
        </div>
      </div>
    </motion.div>
  );
}