/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { mockKPIs, mockVoters, mockInteractions } from '@/app/operaciones/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '30d'; // 7d, 30d, 90d
    const neighborhood = searchParams.get('neighborhood');

    // Calculate dynamic KPIs based on filters
    let filteredVoters = mockVoters;
    let filteredInteractions = mockInteractions;

    // Filter by neighborhood if specified
    if (neighborhood) {
      filteredVoters = mockVoters.filter(v => v.neighborhood === neighborhood);
      const voterIds = filteredVoters.map(v => v.id);
      filteredInteractions = mockInteractions.filter(i => voterIds.includes(i.voterId));
    }

    // Filter by timeframe
    const now = new Date();
    let fromDate: Date;
    switch (timeframe) {
      case '7d':
        fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default: // 30d
        fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const recentInteractions = filteredInteractions.filter(
      i => new Date(i.timestamp) >= fromDate
    );

    // Calculate KPIs
    const totalVoters = filteredVoters.length;
    const contactedVoters = filteredVoters.filter(v => v.lastContact).length;
    const highIntentionVoters = filteredVoters.filter(v => v.intentionScore >= 70).length;
    const mediumIntentionVoters = filteredVoters.filter(v => v.intentionScore >= 40 && v.intentionScore < 70).length;
    const lowIntentionVoters = filteredVoters.filter(v => v.intentionScore < 40).length;
    
    const totalInteractions = recentInteractions.length;
    const positiveInteractions = recentInteractions.filter(i => i.result === 'positivo').length;
    const negativeInteractions = recentInteractions.filter(i => i.result === 'negativo').length;
    const indecisiveInteractions = recentInteractions.filter(i => i.result === 'indeciso').length;
    
    const averageIntention = filteredVoters.length > 0 
      ? filteredVoters.reduce((sum, v) => sum + v.intentionScore, 0) / filteredVoters.length 
      : 0;

    // Generate time series data for trends
    const generateTimeSeries = (days: number) => {
      const series = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Get interactions for this day
        const dayInteractions = recentInteractions.filter(interaction => {
          const interactionDate = new Date(interaction.timestamp).toISOString().split('T')[0];
          return interactionDate === dateStr;
        });

        const dayPositive = dayInteractions.filter(i => i.result === 'positivo').length;
        const dayTotal = dayInteractions.length;
        const conversionRate = dayTotal > 0 ? Math.round((dayPositive / dayTotal) * 100) : 0;

        series.push({
          date: dateStr,
          interactions: dayTotal,
          positiveRate: conversionRate,
          contacts: Math.floor(dayTotal * 1.2) // Simulate more contacts than interactions
        });
      }
      return series;
    };

    // Neighborhood breakdown
    const neighborhoods = Array.from(new Set(mockVoters.map(v => v.neighborhood).filter(Boolean)));
    const neighborhoodStats = neighborhoods.map(hood => {
      const hoodVoters = filteredVoters.filter(v => v.neighborhood === hood);
      const hoodInteractions = recentInteractions.filter(i => {
        const voter = mockVoters.find(v => v.id === i.voterId);
        return voter?.neighborhood === hood;
      });

      const avgIntention = hoodVoters.length > 0 
        ? hoodVoters.reduce((sum, v) => sum + v.intentionScore, 0) / hoodVoters.length 
        : 0;

      return {
        neighborhood: hood,
        totalVoters: hoodVoters.length,
        averageIntention: Math.round(avgIntention * 100) / 100,
        totalInteractions: hoodInteractions.length,
        positiveInteractions: hoodInteractions.filter(i => i.result === 'positivo').length,
        conversionRate: hoodInteractions.length > 0 
          ? Math.round((hoodInteractions.filter(i => i.result === 'positivo').length / hoodInteractions.length) * 100)
          : 0
      };
    }).sort((a, b) => b.averageIntention - a.averageIntention);

    // Interaction type breakdown
    const interactionTypes = ['CALL', 'VISIT', 'MESSAGE', 'SURVEY', 'SOCIAL', 'EMAIL'];
    const typeStats = interactionTypes.map(type => {
      const typeInteractions = recentInteractions.filter(i => i.type === type);
      const typePositive = typeInteractions.filter(i => i.result === 'positivo').length;
      
      return {
        type,
        total: typeInteractions.length,
        positive: typePositive,
        conversionRate: typeInteractions.length > 0 
          ? Math.round((typePositive / typeInteractions.length) * 100)
          : 0
      };
    }).filter(stat => stat.total > 0);

    const kpiData = {
      overview: {
        totalVoters,
        contactedVoters,
        contactRate: totalVoters > 0 ? Math.round((contactedVoters / totalVoters) * 100) : 0,
        averageIntention: Math.round(averageIntention * 100) / 100,
        totalInteractions,
        conversionRate: totalInteractions > 0 ? Math.round((positiveInteractions / totalInteractions) * 100) : 0
      },
      intention: {
        high: {
          count: highIntentionVoters,
          percentage: totalVoters > 0 ? Math.round((highIntentionVoters / totalVoters) * 100) : 0
        },
        medium: {
          count: mediumIntentionVoters,
          percentage: totalVoters > 0 ? Math.round((mediumIntentionVoters / totalVoters) * 100) : 0
        },
        low: {
          count: lowIntentionVoters,
          percentage: totalVoters > 0 ? Math.round((lowIntentionVoters / totalVoters) * 100) : 0
        }
      },
      interactions: {
        total: totalInteractions,
        positive: positiveInteractions,
        negative: negativeInteractions,
        indecisive: indecisiveInteractions,
        conversionRate: totalInteractions > 0 ? Math.round((positiveInteractions / totalInteractions) * 100) : 0
      },
      timeSeries: generateTimeSeries(parseInt(timeframe.replace('d', ''))),
      neighborhoods: neighborhoodStats,
      interactionTypes: typeStats,
      filters: {
        timeframe,
        neighborhood: neighborhood || 'all',
        generatedAt: new Date().toISOString()
      }
    };

    return NextResponse.json({
      success: true,
      data: kpiData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in KPIs API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}