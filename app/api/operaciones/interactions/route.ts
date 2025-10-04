import { NextRequest, NextResponse } from 'next/server';
import { mockInteractions, mockUsers, type Interaction } from '@/app/operaciones/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const voterId = searchParams.get('voterId');
    const type = searchParams.get('type');
    const channel = searchParams.get('channel');
    const result = searchParams.get('result');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const sortBy = searchParams.get('sortBy') || 'timestamp';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Filter interactions
    const filteredInteractions = mockInteractions.filter(interaction => {
      // Voter filter
      const matchesVoter = !voterId || interaction.voterId === voterId;

      // Type filter
      const matchesType = !type || interaction.type === type;

      // Channel filter
      const matchesChannel = !channel || interaction.channel === channel;

      // Result filter
      const matchesResult = !result || interaction.result === result;

      // Date range filter
      const interactionDate = new Date(interaction.timestamp);
      const matchesFromDate = !fromDate || interactionDate >= new Date(fromDate);
      const matchesToDate = !toDate || interactionDate <= new Date(toDate);

      return matchesVoter && matchesType && matchesChannel && matchesResult && matchesFromDate && matchesToDate;
    });

    // Sort interactions
    filteredInteractions.sort((a, b) => {
      let aVal: unknown = a[sortBy as keyof Interaction];
      let bVal: unknown = b[sortBy as keyof Interaction];

      if (sortBy === 'timestamp') {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal?.toLowerCase() || '';
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Calculate pagination
    const total = filteredInteractions.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedInteractions = filteredInteractions.slice(offset, offset + limit);

    // Return response
    return NextResponse.json({
      success: true,
      data: {
        interactions: paginatedInteractions,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        filters: {
          voterId,
          type,
          channel,
          result,
          fromDate,
          toDate,
          sortBy,
          sortOrder
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in interactions API:', error);
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['voterId', 'type', 'channel'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    // Create new interaction (in real implementation, this would save to database)
    const newInteraction: Interaction = {
      id: `interaction-${Date.now()}`,
      voterId: body.voterId,
      type: body.type,
      channel: body.channel,
      timestamp: body.timestamp || new Date().toISOString(),
      result: body.result || null,
      sentiment: body.sentiment || null,
      notes: body.notes || null,
      metadata: body.metadata || null,
      userId: body.userId || mockUsers[0]?.id || null,
      location: body.location || null,
      duration: body.duration || null
    };

    // In a real implementation, you would save this to the database
    mockInteractions.push(newInteraction);

    return NextResponse.json({
      success: true,
      data: newInteraction,
      message: 'Interaction created successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating interaction:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create interaction',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}