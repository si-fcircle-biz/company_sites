// 共通型
export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface Author {
  name: string;
  role: string;
  avatar?: Image;
}

// サービス
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ServiceCategory =
  | 'development'
  | 'infrastructure'
  | 'consulting'
  | 'operation'
  | 'data';

export interface Service {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionLong: string;
  icon: string;
  category: ServiceCategory;
  heroImage: Image;
  features: Feature[];
  benefits: Benefit[];
  process: ProcessStep[];
  relatedCaseStudies: string[]; // CaseStudy IDs
  relatedIndustries: string[]; // Industry IDs
  faq: FAQ[];
  ctaText: string;
  ctaLink: string;
  metadata: SEOMetadata;
  publishedAt: Date;
  updatedAt: Date;
}

// 導入事例
export interface Client {
  name: string;
  industry: string;
  size: 'large' | 'medium' | 'small';
  logo?: Image;
}

export interface Result {
  label: string;
  value: string;
  description: string;
}

export interface Metric {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  photo?: Image;
}

export interface Technology {
  name: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: Client;
  challenge: string;
  solution: string;
  results: Result[];
  period: {
    start: Date;
    end?: Date;
  };
  services: string[]; // Service IDs
  technologies: Technology[];
  heroImage: Image;
  testimonial?: Testimonial;
  metrics: Metric[];
  metadata: SEOMetadata;
  publishedAt: Date;
}

// ニュース
export type NewsCategory = 'press' | 'release' | 'event' | 'media' | 'ir';

export interface News {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  tags: string[];
  thumbnail?: Image;
  publishedAt: Date;
  updatedAt?: Date;
  author?: Author;
  metadata: SEOMetadata;
}

// 業種別ソリューション
export interface Challenge {
  title: string;
  description: string;
  icon: string;
}

export interface IndustrySolution {
  title: string;
  description: string;
  services: string[]; // Service IDs
}

export interface Statistic {
  label: string;
  value: string;
  description: string;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  heroImage: Image;
  challenges: Challenge[];
  solutions: IndustrySolution[];
  caseStudies: string[]; // CaseStudy IDs
  relatedServices: string[]; // Service IDs
  statistics: Statistic[];
  metadata: SEOMetadata;
}

// 採用情報
export type EmploymentType = 'full-time' | 'contract' | 'part-time';

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string[];
  employmentType: EmploymentType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  applicationUrl: string;
  publishedAt: Date;
  closingDate?: Date;
}

// ナビゲーション
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface MegaMenuItem {
  title: string;
  items: NavItem[];
  cta?: {
    label: string;
    href: string;
  };
}

export interface Navigation {
  label: string;
  href: string;
  megaMenu?: MegaMenuItem;
  children?: NavItem[];
}

// パンくずリスト
export interface Breadcrumb {
  label: string;
  href: string;
}

// お問い合わせフォーム
export type ContactType = 'inquiry' | 'document' | 'support' | 'other';

export interface ContactFormData {
  type: ContactType;
  companyName: string;
  department?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  privacy: boolean;
}
