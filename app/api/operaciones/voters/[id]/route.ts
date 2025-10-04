import { NextRequest, NextResponse } from 'next/server';
import { mockVoters } from '@/app/operaciones/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const voterId = resolvedParams.id;
    
    const voter = mockVoters.find(v => v.id === voterId);
    
    if (!voter) {
      return NextResponse.json(
        {
          success: false,
          error: 'Voter not found',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: voter,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching voter:', error);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const voterId = resolvedParams.id;
    const body = await request.json();
    
    const voterIndex = mockVoters.findIndex(v => v.id === voterId);
    
    if (voterIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Voter not found',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      );
    }

    // Update voter (in real implementation, this would update in database)
    const updatedVoter = {
      ...mockVoters[voterIndex],
      ...body,
      id: voterId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    mockVoters[voterIndex] = updatedVoter;

    return NextResponse.json({
      success: true,
      data: updatedVoter,
      message: 'Voter updated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error updating voter:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update voter',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const voterId = resolvedParams.id;
    
    const voterIndex = mockVoters.findIndex(v => v.id === voterId);
    
    if (voterIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Voter not found',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      );
    }

    // Remove voter (in real implementation, this would soft delete in database)
    const deletedVoter = mockVoters.splice(voterIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedVoter,
      message: 'Voter deleted successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error deleting voter:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete voter',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}