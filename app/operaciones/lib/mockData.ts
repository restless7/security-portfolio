// Mock data for Electoral Operations Control Center

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Voter {
  id: string;
  externalId?: string;
  namePseudo: string;
  age?: number;
  gender?: string;
  address?: string;
  neighborhood?: string;
  location: { lat: number; lng: number };
  tags: string[];
  intentionScore: number;
  lastContact?: string;
  phoneNumber?: string;
  email?: string;
  consentFlag: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Interaction {
  id: string;
  voterId: string;
  type: 'CALL' | 'VISIT' | 'MESSAGE' | 'SURVEY' | 'SOCIAL' | 'EMAIL';
  channel: string;
  timestamp: string;
  result?: string;
  sentiment?: number;
  notes?: string;
  metadata?: Record<string, any>;
  userId?: string;
  location?: { lat: number; lng: number };
  duration?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'OPERATOR' | 'COORDINATOR' | 'AUDITOR';
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'DRAFT';
  targetArea?: any;
  createdAt: string;
  updatedAt: string;
}

// Coordenadas del centro de Bogotá y alrededores para ubicaciones realistas
const bogotaCoordinates = {
  center: { lat: 4.7110, lng: -74.0721 },
  bounds: {
    north: 4.8180,
    south: 4.4870,
    east: -73.9830,
    west: -74.2240
  }
};

const neighborhoods = [
  'Chapinero', 'Zona Rosa', 'La Candelaria', 'Centro Internacional',
  'Salitre', 'Kennedy', 'Engativá', 'Suba', 'Usaquén', 'Fontibón',
  'Bosa', 'Ciudad Bolívar', 'San Cristóbal', 'Rafael Uribe',
  'Puente Aranda', 'Tunjuelito', 'Barrios Unidos', 'Teusaquillo',
  'Los Mártires', 'Antonio Nariño'
];

const voterTags = [
  'persuadible', 'indeciso', 'seguro', 'opositor', 'nuevo',
  'joven', 'adulto-mayor', 'trabajador', 'estudiante', 'empresario',
  'ama-de-casa', 'profesional', 'líder-comunitario', 'influencer',
  'primera-vez', 'histórico', 'migrante', 'rural', 'urbano'
];

const firstNames = [
  'Ana', 'Carlos', 'María', 'Luis', 'Carmen', 'José', 'Sofía', 'Miguel',
  'Laura', 'David', 'Elena', 'Andrés', 'Patricia', 'Fernando', 'Isabel',
  'Diego', 'Claudia', 'Ricardo', 'Alejandra', 'Antonio', 'Mónica', 'Rafael',
  'Beatriz', 'Gonzalo', 'Lucía', 'Javier', 'Gloria', 'Sebastián', 'Pilar',
  'Eduardo', 'Rosa', 'Manuel', 'Esperanza', 'Pablo', 'Teresa'
];

const lastNames = [
  'García', 'Rodríguez', 'González', 'Hernández', 'López', 'Martínez',
  'Sánchez', 'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Álvarez',
  'Moreno', 'Muñoz', 'Alonso', 'Romero', 'Navarro', 'Gutiérrez', 'Torres',
  'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco',
  'Suárez', 'Molina', 'Morales', 'Ortega', 'Delgado', 'Castro', 'Ortiz'
];

function getRandomCoordinate() {
  const lat = bogotaCoordinates.bounds.south + Math.random() * (bogotaCoordinates.bounds.north - bogotaCoordinates.bounds.south);
  const lng = bogotaCoordinates.bounds.west + Math.random() * (bogotaCoordinates.bounds.east - bogotaCoordinates.bounds.west);
  return { lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) };
}

function getRandomName(): string {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function getRandomTags(): string[] {
  const numTags = Math.floor(Math.random() * 4) + 1;
  const selectedTags = [];
  const availableTags = [...voterTags];
  
  for (let i = 0; i < numTags; i++) {
    const index = Math.floor(Math.random() * availableTags.length);
    selectedTags.push(availableTags.splice(index, 1)[0]);
  }
  
  return selectedTags;
}

function getRandomPhoneNumber(): string {
  const areaCode = Math.floor(Math.random() * 9) + 1;
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `3${areaCode}${number}`;
}

// Generate mock users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Ana López',
    email: 'ana.lopez@operaciones.gov.co',
    role: 'COORDINATOR',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'user-2',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@operaciones.gov.co',
    role: 'OPERATOR',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'user-3',
    name: 'María Fernández',
    email: 'maria.fernandez@operaciones.gov.co',
    role: 'OPERATOR',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'user-4',
    name: 'Ricardo Vega',
    email: 'ricardo.vega@operaciones.gov.co',
    role: 'AUDITOR',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  }
];

// Generate mock voters
export const mockVoters: Voter[] = Array.from({ length: 500 }, (_, index) => {
  const id = `voter-${index + 1}`;
  const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
  const intentionScore = Math.floor(Math.random() * 100);
  const age = Math.floor(Math.random() * 60) + 18;
  const gender = Math.random() > 0.5 ? 'F' : 'M';
  
  return {
    id,
    externalId: `EXT-${String(index + 1).padStart(6, '0')}`,
    namePseudo: getRandomName(),
    age,
    gender,
    address: `Calle ${Math.floor(Math.random() * 200) + 1} # ${Math.floor(Math.random() * 50) + 1}-${Math.floor(Math.random() * 99) + 1}`,
    neighborhood,
    location: getRandomCoordinate(),
    tags: getRandomTags(),
    intentionScore,
    lastContact: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    phoneNumber: getRandomPhoneNumber(),
    email: Math.random() > 0.3 ? `${getRandomName().toLowerCase().replace(' ', '.')}@email.com` : undefined,
    consentFlag: Math.random() > 0.1,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
  };
});

// Generate mock interactions
export const mockInteractions: Interaction[] = [];
const interactionTypes: Array<Interaction['type']> = ['CALL', 'VISIT', 'MESSAGE', 'SURVEY', 'SOCIAL', 'EMAIL'];
const channels = ['whatsapp', 'call', 'visit', 'survey', 'instagram', 'facebook', 'email'];
const results = ['positivo', 'negativo', 'indeciso', 'no-responde', 'reagendar'];

// Generate interactions for each voter
mockVoters.forEach(voter => {
  const numInteractions = Math.floor(Math.random() * 5) + 1;
  
  for (let i = 0; i < numInteractions; i++) {
    const type = interactionTypes[Math.floor(Math.random() * interactionTypes.length)];
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const result = results[Math.floor(Math.random() * results.length)];
    
    mockInteractions.push({
      id: `interaction-${mockInteractions.length + 1}`,
      voterId: voter.id,
      type,
      channel,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
      result,
      sentiment: (Math.random() - 0.5) * 2, // -1 to 1
      notes: `Contacto vía ${channel}. Resultado: ${result}. ${Math.random() > 0.5 ? 'Seguimiento necesario.' : 'Contacto satisfactorio.'}`,
      userId: mockUsers[Math.floor(Math.random() * mockUsers.length)].id,
      location: Math.random() > 0.7 ? getRandomCoordinate() : undefined,
      duration: type === 'CALL' || type === 'VISIT' ? Math.floor(Math.random() * 60) + 5 : undefined
    });
  }
});

// Generate mock campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Campaña Zona Norte',
    description: 'Operación de contacto en barrios del norte de Bogotá',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-03-31T23:59:59Z',
    status: 'ACTIVE',
    targetArea: {
      type: 'Polygon',
      coordinates: [[
        [-74.1200, 4.7500],
        [-74.0500, 4.7500],
        [-74.0500, 4.8000],
        [-74.1200, 4.8000],
        [-74.1200, 4.7500]
      ]]
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'campaign-2',
    name: 'Operación Centro',
    description: 'Contacto masivo en el centro histórico de Bogotá',
    startDate: '2024-02-01T00:00:00Z',
    status: 'ACTIVE',
    targetArea: {
      type: 'Polygon',
      coordinates: [[
        [-74.0900, 4.5900],
        [-74.0600, 4.5900],
        [-74.0600, 4.6200],
        [-74.0900, 4.6200],
        [-74.0900, 4.5900]
      ]]
    },
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-02-01T08:00:00Z'
  },
  {
    id: 'campaign-3',
    name: 'Campaña Sur',
    description: 'Enfoque en localidades del sur de la ciudad',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-02-28T23:59:59Z',
    status: 'COMPLETED',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-02-28T18:00:00Z'
  }
];

// KPI calculation functions
export const calculateKPIs = () => {
  const totalVoters = mockVoters.length;
  const contactedVoters = mockVoters.filter(v => v.lastContact).length;
  const highIntentionVoters = mockVoters.filter(v => v.intentionScore >= 70).length;
  const totalInteractions = mockInteractions.length;
  const recentInteractions = mockInteractions.filter(
    i => new Date(i.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;
  
  const positiveInteractions = mockInteractions.filter(i => i.result === 'positivo').length;
  const negativeInteractions = mockInteractions.filter(i => i.result === 'negativo').length;
  const indecisiveInteractions = mockInteractions.filter(i => i.result === 'indeciso').length;
  
  const averageIntention = mockVoters.reduce((sum, v) => sum + v.intentionScore, 0) / totalVoters;
  
  const interactionsByDay = mockInteractions.reduce((acc, interaction) => {
    const date = new Date(interaction.timestamp).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const intentionByNeighborhood = neighborhoods.map(neighborhood => {
    const votersInNeighborhood = mockVoters.filter(v => v.neighborhood === neighborhood);
    const avgIntention = votersInNeighborhood.length > 0 
      ? votersInNeighborhood.reduce((sum, v) => sum + v.intentionScore, 0) / votersInNeighborhood.length
      : 0;
    
    return {
      neighborhood,
      voters: votersInNeighborhood.length,
      averageIntention: Math.round(avgIntention * 100) / 100
    };
  });
  
  return {
    totalVoters,
    contactedVoters,
    contactRate: Math.round((contactedVoters / totalVoters) * 100),
    highIntentionVoters,
    highIntentionRate: Math.round((highIntentionVoters / totalVoters) * 100),
    totalInteractions,
    recentInteractions,
    averageIntention: Math.round(averageIntention * 100) / 100,
    positiveInteractions,
    negativeInteractions,
    indecisiveInteractions,
    conversionRate: Math.round((positiveInteractions / totalInteractions) * 100),
    interactionsByDay,
    intentionByNeighborhood: intentionByNeighborhood.sort((a, b) => b.averageIntention - a.averageIntention)
  };
};

// Real-time event simulation
export const generateRealtimeEvent = () => {
  const eventTypes = [
    'new_interaction',
    'voter_updated',
    'high_intention_detected',
    'campaign_milestone',
    'system_alert'
  ];
  
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const voter = mockVoters[Math.floor(Math.random() * mockVoters.length)];
  
  switch (eventType) {
    case 'new_interaction':
      return {
        type: 'new_interaction',
        message: `Nueva interacción registrada: ${voter.namePseudo} - ${voter.neighborhood}`,
        data: {
          voterId: voter.id,
          voterName: voter.namePseudo,
          neighborhood: voter.neighborhood
        },
        timestamp: new Date().toISOString(),
        severity: 'info'
      };
      
    case 'high_intention_detected':
      return {
        type: 'high_intention_detected',
        message: `Alta intención detectada: ${voter.namePseudo} (${voter.intentionScore}%)`,
        data: {
          voterId: voter.id,
          voterName: voter.namePseudo,
          intentionScore: voter.intentionScore
        },
        timestamp: new Date().toISOString(),
        severity: 'success'
      };
      
    case 'system_alert':
      return {
        type: 'system_alert',
        message: `Pico de actividad detectado en ${voter.neighborhood}`,
        data: {
          neighborhood: voter.neighborhood,
          activity: 'high'
        },
        timestamp: new Date().toISOString(),
        severity: 'warning'
      };
      
    default:
      return {
        type: 'info',
        message: 'Sistema funcionando correctamente',
        data: {},
        timestamp: new Date().toISOString(),
        severity: 'info'
      };
  }
};

// Export calculated KPIs
export const mockKPIs = calculateKPIs();