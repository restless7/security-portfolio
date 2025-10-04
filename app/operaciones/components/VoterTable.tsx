/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, prefer-const */
'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Target,
  Tag,
  MoreHorizontal
} from 'lucide-react';
import clsx from 'clsx';
import { mockVoters, type Voter } from '@/app/operaciones/lib/mockData';

interface VoterTableProps {
  onVoterSelect: (voter: Voter) => void;
}

type SortField = 'namePseudo' | 'neighborhood' | 'intentionScore' | 'lastContact' | 'age';
type SortDirection = 'asc' | 'desc' | null;

export function VoterTable({ onVoterSelect }: VoterTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [selectedIntentionRange, setSelectedIntentionRange] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('namePseudo');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Get unique neighborhoods for filter
  const neighborhoods = useMemo(() => {
    const unique = Array.from(new Set(mockVoters.map(v => v.neighborhood).filter(Boolean)));
    return unique.sort();
  }, []);

  // Filter and sort voters
  const filteredAndSortedVoters = useMemo(() => {
    let filtered = mockVoters.filter(voter => {
      const matchesSearch = searchQuery === '' || 
        voter.namePseudo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voter.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesNeighborhood = selectedNeighborhood === '' || 
        voter.neighborhood === selectedNeighborhood;

      const matchesIntention = selectedIntentionRange === '' || 
        (selectedIntentionRange === 'high' && voter.intentionScore >= 70) ||
        (selectedIntentionRange === 'medium' && voter.intentionScore >= 40 && voter.intentionScore < 70) ||
        (selectedIntentionRange === 'low' && voter.intentionScore < 40);

      return matchesSearch && matchesNeighborhood && matchesIntention;
    });

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        let aVal: any = a[sortField];
        let bVal: any = b[sortField];

        if (sortField === 'lastContact') {
          aVal = aVal ? new Date(aVal).getTime() : 0;
          bVal = bVal ? new Date(bVal).getTime() : 0;
        }

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal?.toLowerCase() || '';
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchQuery, selectedNeighborhood, selectedIntentionRange, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedVoters.length / itemsPerPage);
  const paginatedVoters = filteredAndSortedVoters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField('namePseudo');
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-4 w-4 text-blue-600" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-4 w-4 text-blue-600" />;
    return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
  };

  const getIntentionColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getIntentionLabel = (score: number) => {
    if (score >= 70) return 'Alta';
    if (score >= 40) return 'Media';
    return 'Baja';
  };

  return (
    <div className="space-y-4">
      {/* Filters and Actions */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, barrio, etiquetas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Neighborhood Filter */}
        <select
          value={selectedNeighborhood}
          onChange={(e) => setSelectedNeighborhood(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todos los barrios</option>
          {neighborhoods.map(neighborhood => (
            <option key={neighborhood} value={neighborhood}>
              {neighborhood}
            </option>
          ))}
        </select>

        {/* Intention Filter */}
        <select
          value={selectedIntentionRange}
          onChange={(e) => setSelectedIntentionRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Toda intención</option>
          <option value="high">Alta (70%+)</option>
          <option value="medium">Media (40-69%)</option>
          <option value="low">Baja (&lt;40%)</option>
        </select>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nuevo Votante</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Importar</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Mostrando {paginatedVoters.length} de {filteredAndSortedVoters.length} votantes
        </span>
        <span>
          Página {currentPage} de {totalPages}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('namePseudo')}
              >
                <div className="flex items-center space-x-1">
                  <span>Nombre</span>
                  {getSortIcon('namePseudo')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('neighborhood')}
              >
                <div className="flex items-center space-x-1">
                  <span>Barrio</span>
                  {getSortIcon('neighborhood')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('age')}
              >
                <div className="flex items-center space-x-1">
                  <span>Edad</span>
                  {getSortIcon('age')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('intentionScore')}
              >
                <div className="flex items-center space-x-1">
                  <span>Intención</span>
                  {getSortIcon('intentionScore')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastContact')}
              >
                <div className="flex items-center space-x-1">
                  <span>Último Contacto</span>
                  {getSortIcon('lastContact')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Etiquetas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedVoters.map((voter, index) => (
              <motion.tr
                key={voter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onVoterSelect(voter)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm">
                        {voter.namePseudo.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {voter.namePseudo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {voter.externalId}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {voter.neighborhood}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {voter.age || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getIntentionColor(voter.intentionScore)
                    )}>
                      {getIntentionLabel(voter.intentionScore)}
                    </span>
                    <span className="text-sm text-gray-900">
                      {voter.intentionScore}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {voter.lastContact ? (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(voter.lastContact).toLocaleDateString('es-CO')}
                    </div>
                  ) : (
                    <span className="text-gray-400">Sin contacto</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {voter.tags.slice(0, 2).map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {voter.tags.length > 2 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        +{voter.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    {voter.phoneNumber && (
                      <button className="text-blue-600 hover:text-blue-900">
                        <Phone className="h-4 w-4" />
                      </button>
                    )}
                    {voter.email && (
                      <button className="text-blue-600 hover:text-blue-900">
                        <Mail className="h-4 w-4" />
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Anterior
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + Math.max(1, currentPage - 2);
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={clsx(
                    'px-3 py-2 rounded-lg text-sm transition-colors',
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  )}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}