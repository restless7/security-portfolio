import { NextRequest, NextResponse } from 'next/server';
import { mockVoters, type Voter } from '@/app/operaciones/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const neighborhood = searchParams.get('neighborhood') || '';
    const intentionMin = parseInt(searchParams.get('intentionMin') || '0');
    const intentionMax = parseInt(searchParams.get('intentionMax') || '100');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const sortBy = searchParams.get('sortBy') || 'namePseudo';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    // Filter voters
    const filteredVoters = mockVoters.filter(voter => {
      // Search filter
      const matchesSearch = !search || 
        voter.namePseudo.toLowerCase().includes(search.toLowerCase()) ||
        voter.neighborhood?.toLowerCase().includes(search.toLowerCase()) ||
        voter.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      // Neighborhood filter
      const matchesNeighborhood = !neighborhood || voter.neighborhood === neighborhood;

      // Intention score filter
      const matchesIntention = voter.intentionScore >= intentionMin && voter.intentionScore <= intentionMax;

      // Tags filter
      const matchesTags = tags.length === 0 || tags.some(tag => voter.tags.includes(tag));

      return matchesSearch && matchesNeighborhood && matchesIntention && matchesTags;
    });

    // Sort voters
    filteredVoters.sort((a, b) => {
      let aVal: unknown = a[sortBy as keyof Voter];
      let bVal: unknown = b[sortBy as keyof Voter];

      if (sortBy === 'lastContact') {
        aVal = aVal ? new Date(aVal as string).getTime() : 0;
        bVal = bVal ? new Date(bVal as string).getTime() : 0;
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal && typeof bVal === 'string') ? bVal.toLowerCase() : '';
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Calculate pagination
    const total = filteredVoters.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedVoters = filteredVoters.slice(offset, offset + limit);

    // Return response
    return NextResponse.json({
      success: true,
      data: {
        voters: paginatedVoters,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        filters: {
          search,
          neighborhood,
          intentionRange: [intentionMin, intentionMax],
          tags,
          sortBy,
          sortOrder
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in voters API:', error);
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
    const requiredFields = ['namePseudo', 'neighborhood', 'location'];
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

    // Create new voter (in real implementation, this would save to database)
    const newVoter: Voter = {
      id: `voter-${Date.now()}`,
      externalId: `EXT-${String(mockVoters.length + 1).padStart(6, '0')}`,
      namePseudo: body.namePseudo,
      age: body.age || null,
      gender: body.gender || null,
      address: body.address || null,
      neighborhood: body.neighborhood,
      location: body.location,
      tags: body.tags || [],
      intentionScore: body.intentionScore || 0,
      lastContact: body.lastContact || null,
      phoneNumber: body.phoneNumber || null,
      email: body.email || null,
      consentFlag: body.consentFlag || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real implementation, you would save this to the database
    mockVoters.push(newVoter);

    return NextResponse.json({
      success: true,
      data: newVoter,
      message: 'Voter created successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error creating voter:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create voter',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}