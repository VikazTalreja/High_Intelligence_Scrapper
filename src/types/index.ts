// Types for the form data
export interface KeyDecisionMaker {
  name: string;
}

export interface Competitor {
  name: string;
  selected: boolean;
}

export interface FormData {
  companyName: string;
  keyDecisionMakers: KeyDecisionMaker[];
  projectDetails: string;
  competitors: Competitor[];
  industry?: string;
}

// Types for the LinkedIn data
export interface Experience {
  companyId?: string;
  companyUrn?: string;
  companyLink1?: string;
  logo?: string;
  title: string;
  subtitle: string;
  caption: string;
  metadata?: string;
  breakdown: boolean;
  subComponents?: any[];
}

export interface Education {
  companyLink1?: string;
  title: string;
  subtitle: string;
  caption: string;
  breakdown: boolean;
  subComponents?: any[];
}

export interface ProfileData {
  data: Array<{
    firstName: string;
    lastName: string;
    fullName: string;
    headline: string;
    connections: number;
    followers: number;
    addressCountryOnly: string;
    addressWithCountry: string;
    profilePic: string;
    profilePicHighQuality: string;
    linkedinUrl: string;
    experiences: Experience[];
    educations: Education[];
    skills: any[];
    isProcurementExecutive?: boolean;
    [key: string]: any;
  }>;
  success?: boolean;
}

export interface LinkedInProfile {
  input: {
    name: string;
  };
  searchQuery: string;
  link: string;
  title: string;
  profileData: ProfileData;
  error?: string;
}

export interface LinkedInData {
  success: boolean;
  count: number;
  results: LinkedInProfile[];
}

// Types for the company data
export interface CompanyData {
  companyName: string;
  registeredAddress?: string;
  directors?: string[];
  incorporationDate?: string;
  industry?: string;
  otherDetails?: Record<string, any>;
}

// Types for the market data
export interface MarketData {
  geminiData?: any;
  perplexityData?: any;
  synthesizedData?: string;
}

// Types for the AI insights
export interface AIInsights {
  summary?: string;
  recommendations?: string[];
  keyPoints?: string[];
  synthesizedData?: string;
}

// Error type
export interface AnalysisError {
  source: string;
  message: string;
}

// Types for procurement executives
export interface ProcurementExecutiveResult {
  query: string;
  title: string;
  profileUrl?: string;
  profileData?: any;
  error?: string;
}

export interface ProcurementExecutives {
  success: boolean;
  companyName: string;
  executivesFound: number;
  results: ProcurementExecutiveResult[];
}

// API response format from the analysis endpoint
export interface ApiResponse {
  success: boolean;
  timestamp: string;
  formData: FormData;
  linkedInData: LinkedInData | null;
  companyData: CompanyData | null;
  marketData: MarketData | null;
  aiInsights: AIInsights | null;
  procurementExecutives: ProcurementExecutives | null;
  errors: AnalysisError[];
}

// Legacy API response types (for backward compatibility)
export interface KeyDecisionMakerIntelligence {
  name: string;
  position: string;
  experience: string;
  education: string;
  achievements: string[];
  interests: string[];
}

export interface CompanyTechnicalDetails {
  registeredAddress: string;
  directors: string[];
  listingStatus: string;
  incorporationDate: string;
  industry: string;
}

export interface CompetitorEngagement {
  competitorName: string;
  engagementType: string;
  description: string;
  date: string;
}

export interface AlternateDecisionMaker {
  name: string;
  position: string;
  relevance: string;
  contactInfo: string;
} 