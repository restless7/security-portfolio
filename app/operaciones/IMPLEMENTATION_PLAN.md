# Operaciones Module - Implementation Plan

## Overview
Restore the full Operaciones module with tabbed navigation and implement backend API endpoints.

## Phase 1: Frontend Architecture Restoration

### 1.1 Page Structure
```
/app/operaciones/
├── page.tsx                          # Main container with tab navigation
├── layout.tsx                        # Optional: Operaciones-specific layout
├── components/
│   ├── Navigation/
│   │   ├── OperacionesSidebar.tsx   # Left sidebar with 4 main tabs
│   │   └── TabContent.tsx           # Tab content wrapper
│   ├── Dashboard/
│   │   ├── PanelPrincipal.tsx       # Overview dashboard
│   │   ├── MetricsGrid.tsx          # KPI cards
│   │   └── ActivityFeed.tsx         # Recent activity
│   ├── MapaElectoral/
│   │   ├── MapaElectoralView.tsx    # Map container (existing)
│   │   ├── Map/                     # Existing map components
│   │   └── Sidebar/                 # Existing sidebar
│   ├── GestionVotantes/
│   │   ├── VotantesView.tsx         # Voter management view
│   │   ├── VoterTable.tsx           # Data table
│   │   ├── VoterFilters.tsx         # Filter panel
│   │   └── VoterForm.tsx            # Add/Edit voter
│   └── Analisis/
│       ├── AnalisisView.tsx         # Analytics dashboard
│       ├── Charts/                  # Chart components
│       └── Reports/                 # Report generation
├── hooks/
│   ├── useOperacionesStore.ts       # Global operations state
│   ├── useVoters.ts                 # Voter data hooks
│   └── useAnalytics.ts              # Analytics data hooks
└── lib/
    └── api/
        ├── voters.ts                # Voter API calls
        ├── analytics.ts             # Analytics API calls
        └── operations.ts            # Operations API calls
```

### 1.2 Navigation Tabs
- **Panel Principal**: Dashboard overview with KPIs
- **Mapa Electoral**: Geographic operations view (existing map)
- **Gestión Votantes**: Voter database management
- **Análisis**: Reports and metrics

## Phase 2: Backend Architecture (FastAPI)

### 2.1 Project Structure
```
backend/
├── app/
│   ├── main.py                      # FastAPI app entry point
│   ├── config.py                    # Configuration & environment
│   ├── database.py                  # Database connection
│   ├── models/
│   │   ├── __init__.py
│   │   ├── voter.py                 # Voter SQLAlchemy model
│   │   ├── leader.py                # Leader model
│   │   ├── interaction.py           # Interaction model
│   │   └── operation.py             # Operation model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── voter.py                 # Pydantic schemas
│   │   ├── leader.py
│   │   ├── geo.py                   # GeoJSON schemas
│   │   └── analytics.py             # Analytics schemas
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py                  # Dependencies (auth, db)
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── operations.py        # Operations endpoints
│   │       ├── voters.py            # Voter CRUD
│   │       ├── geo.py               # Geographic data
│   │       └── analytics.py         # Analytics endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── voter_service.py         # Business logic
│   │   ├── geo_service.py           # GeoJSON transformation
│   │   └── analytics_service.py     # Analytics calculations
│   └── utils/
│       ├── __init__.py
│       ├── mock_data.py             # Mock data generators
│       └── geo_utils.py             # Geographic utilities
├── tests/
│   ├── __init__.py
│   ├── test_voters.py
│   └── test_geo.py
├── requirements.txt
├── .env.example
└── README.md
```

### 2.2 API Endpoints

#### Geographic Data (for Map)
```
GET  /api/v1/operations/geo/voters
     Query params: intention_min, intention_max, status, bbox
     Returns: GeoJSON FeatureCollection

GET  /api/v1/operations/geo/leaders
     Returns: GeoJSON FeatureCollection

GET  /api/v1/operations/geo/heatmap
     Query params: metric (intention, density, conversion)
     Returns: GeoJSON FeatureCollection with heatmap data
```

#### Voter Management
```
GET    /api/v1/voters
       Query params: page, limit, search, status, intention_min, intention_max
       Returns: Paginated voter list

GET    /api/v1/voters/{voter_id}
       Returns: Single voter details

POST   /api/v1/voters
       Body: Voter data
       Returns: Created voter

PUT    /api/v1/voters/{voter_id}
       Body: Updated voter data
       Returns: Updated voter

DELETE /api/v1/voters/{voter_id}
       Returns: Success message
```

#### Analytics
```
GET  /api/v1/analytics/overview
     Returns: Dashboard KPIs

GET  /api/v1/analytics/trends
     Query params: metric, period
     Returns: Time series data

GET  /api/v1/analytics/conversion
     Returns: Conversion funnel data

GET  /api/v1/analytics/territory
     Returns: Territory-based metrics
```

#### Operations
```
GET  /api/v1/operations/recent
     Returns: Recent activity feed

GET  /api/v1/operations/stats
     Returns: Operational statistics
```

### 2.3 Database Schema (PostgreSQL + PostGIS)

```sql
-- Voters table
CREATE TABLE voters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    location GEOGRAPHY(POINT, 4326),
    status VARCHAR(50) DEFAULT 'pending',
    intention INTEGER CHECK (intention >= 0 AND intention <= 100),
    territory_id UUID,
    leader_id UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Leaders table
CREATE TABLE leaders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    role VARCHAR(100),
    location GEOGRAPHY(POINT, 4326),
    territory_id UUID,
    voters_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Interactions table
CREATE TABLE interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voter_id UUID REFERENCES voters(id),
    leader_id UUID REFERENCES leaders(id),
    type VARCHAR(50),
    notes TEXT,
    outcome VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Territories table
CREATE TABLE territories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    boundary GEOGRAPHY(POLYGON, 4326),
    parent_id UUID REFERENCES territories(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_voters_location ON voters USING GIST(location);
CREATE INDEX idx_voters_status ON voters(status);
CREATE INDEX idx_voters_intention ON voters(intention);
CREATE INDEX idx_leaders_location ON leaders USING GIST(location);
```

## Phase 3: Implementation Steps

### Step 1: Fix Navigation Controls (Immediate)
- Investigate why controls aren't responding
- Check z-index and pointer-events
- Verify react-map-gl v7 control implementation

### Step 2: Restore Frontend Navigation (High Priority)
1. Create `OperacionesSidebar.tsx` with 4 tabs
2. Update `page.tsx` to use tab-based routing
3. Create placeholder views for each tab
4. Move existing map into "Mapa Electoral" tab

### Step 3: Backend Setup (High Priority)
1. Initialize FastAPI project structure
2. Set up PostgreSQL + PostGIS database
3. Create SQLAlchemy models
4. Implement mock data generators
5. Create geographic endpoints with mock data

### Step 4: Frontend-Backend Integration
1. Update API client to call real endpoints
2. Test data flow
3. Implement error handling
4. Add loading states

### Step 5: Complete Remaining Views
1. Implement Panel Principal dashboard
2. Implement Gestión Votantes table
3. Implement Análisis charts
4. Polish UI/UX

## Phase 4: Mock Data Strategy

### Initial Mock Data
- 500 mock voters with realistic coordinates around Bucaramanga
- 20 mock leaders
- 100 mock interactions
- GeoJSON format for map compatibility

### Mock Data Generator
```python
# utils/mock_data.py
import random
from faker import Faker
from shapely.geometry import Point

def generate_mock_voters(count=500):
    # Generate voters within Bucaramanga bounds
    # lat: 7.08 - 7.15, lng: -73.15 - -73.10
    ...

def generate_mock_leaders(count=20):
    ...

def generate_geojson_voters(voters):
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [voter.lng, voter.lat]
                },
                "properties": {
                    "id": voter.id,
                    "name": voter.name,
                    "status": voter.status,
                    "intention": voter.intention
                }
            }
            for voter in voters
        ]
    }
```

## Timeline

### Immediate (Today)
- [ ] Fix navigation controls
- [ ] Restore sidebar navigation
- [ ] Create tab structure

### Short-term (1-2 days)
- [ ] Set up FastAPI backend
- [ ] Implement mock data
- [ ] Create geographic endpoints
- [ ] Connect frontend to backend

### Medium-term (3-5 days)
- [ ] Implement all CRUD endpoints
- [ ] Complete all 4 tab views
- [ ] Add authentication
- [ ] Polish UI/UX

## Success Criteria

1. ✅ Navigation controls work on map
2. ✅ 4 tabs visible and functional
3. ✅ Map shows in "Mapa Electoral" tab
4. ✅ Backend returns mock GeoJSON data
5. ✅ Frontend displays mock data on map
6. ✅ All endpoints return proper responses
7. ✅ Error handling in place
8. ✅ Loading states implemented

---

**Next Action**: Start with Step 1 (fix navigation controls) and Step 2 (restore sidebar navigation)
