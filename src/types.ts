export interface PillarStrategy {
  title: string;
  primaryKeyword: string;
  searchIntent: string;
  secondaryKeywords: string[];
  briefSummary: string;
}

export interface ClusterSubtopic {
  id: string;
  title: string;
  primaryKeyword: string;
  searchIntent: string;
  secondaryKeywords: string[];
  briefSummary: string;
  internalLinkingAngle: string;
}

export interface LocalPlanning {
  isLocal: boolean;
  location: string;
  localAngleExplanation: string;
}

export interface SEOStrategyData {
  pillar: PillarStrategy;
  clusters: ClusterSubtopic[];
  localPlanning: LocalPlanning;
}

export interface ArticleOutlineNode {
  heading: string;
  points: string[];
}

export interface InternalLinkingSuggestion {
  sourceTextContext: string;
  recommendedAnchor: string;
  targetPageDescription: string;
}

export interface CTARecommendation {
  type: string;
  text: string;
  placement: string;
}

export interface GeneratedArticle {
  metadata: {
    title: string;
    primaryKeyword: string;
    searchIntent: string;
    secondaryKeywords: string[];
    targetAudience: string;
    localOptimizationNotes?: string;
  };
  outline: ArticleOutlineNode[];
  contentMarkdown: string;
  internalLinkingSuggestions: InternalLinkingSuggestion[];
  ctaRecommendations: CTARecommendation[];
  eeatJustification: string;
}

export interface KeywordAnalysis {
  keyword: string;
  frequency: number;
  status: string; // "Under-used", "Optimal", "Stuffed"
}

export interface OptimizationResult {
  originalIntentMatching: string;
  readabilityScore: string;
  analyzedKeywords: KeywordAnalysis[];
  structuralIssues: string[];
  semanticSuggestions: string[];
  optimizedContentMarkdown: string;
  nextSteps: string[];
}

export interface LocalKeywordOpportunity {
  keyword: string;
  intent: string;
  volume: string;
  relevance: string;
}

export interface LocalLandingPageSection {
  sectionTitle: string;
  contentBrief: string;
  keywordsToTarget: string[];
}

export interface HyperlocalKeywordGroup {
  neighborhood: string;
  keywords: string[];
}

export interface LocalFAQItem {
  question: string;
  answer: string;
}

export interface LocalSEOPlaybookData {
  businessName: string;
  location: string;
  service: string;
  nearbyAreas: string[];
  keywordOpportunities: LocalKeywordOpportunity[];
  landingPageOutline: LocalLandingPageSection[];
  googleBusinessProfileSuggestions: string[];
  schemaMarkup: string; // JSON-LD format
  localFAQs: LocalFAQItem[];
  hyperlocalKeywords: HyperlocalKeywordGroup[];
}

export interface SEOMetadataTitle {
  title: string;
  length: number;
  reasonForCtr: string;
}

export interface SEOMetadataDescription {
  description: string;
  length: number;
  reasonForCtr: string;
}

export interface SEOMetadataResult {
  topic: string;
  titles: SEOMetadataTitle[];
  metaDescriptions: SEOMetadataDescription[];
  urlSlugs: string[];
  openGraphTitles: string[];
  openGraphDescriptions: string[];
}

