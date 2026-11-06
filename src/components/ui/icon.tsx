import React from 'react';
import {
  House,
  UserRound,
  FolderKanban,
  FlaskConical,
  Blocks,
  Mail,
  BrainCircuit,
  Code2,
  Database,
  Cloud,
  ShieldCheck,
  Workflow,
  Cpu,
  Lightbulb,
  Sparkles,
  Layers,
  Compass,
  Microscope,
  NotebookText,
  BookOpen,
  GraduationCap,
  FolderArchive,
  Package,
  Building2,
  BriefcaseBusiness,
  Briefcase,
  Target,
  ChartNoAxesCombined,
  ChartLine,
  Users,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Download,
  Search,
  Menu,
  X,
  Maximize2,
  Copy,
  Check,
  CheckCircle2,
  MessageSquare,
  Share2,
  GitBranch,
  LucideIcon,
} from 'lucide-react';

export type IconSize = 16 | 20 | 24 | 32 | 'sm' | 'md' | 'lg' | 'xl' | 'action' | 'nav' | 'standard' | 'feature' | 'large';

export const ICON_SIZE_SCALE: Record<string, number> = {
  sm: 16,
  action: 16,
  nav: 16,
  md: 20,
  standard: 20,
  lg: 24,
  feature: 24,
  xl: 32,
  large: 32,
};

// Unified Lucide Icon Registry
const ICON_MAP: Record<string, LucideIcon> = {
  // Navigation & Identity
  house: House,
  home: House,
  'user-round': UserRound,
  user: UserRound,
  about: UserRound,
  'folder-kanban': FolderKanban,
  projects: FolderKanban,
  'flask-conical': FlaskConical,
  lab: FlaskConical,
  blocks: Blocks,
  products: Blocks,
  mail: Mail,
  contact: Mail,
  email: Mail,

  // External & Platform Semantic Matches from Lucide
  github: Code2,
  code: Code2,
  'code-2': Code2,
  git: GitBranch,
  repositories: Code2,
  linkedin: Briefcase,
  network: Users,
  x: Share2,
  twitter: Share2,

  // Technology & Systems
  'brain-circuit': BrainCircuit,
  ai: BrainCircuit,
  database: Database,
  data: Database,
  cloud: Cloud,
  'shield-check': ShieldCheck,
  security: ShieldCheck,
  workflow: Workflow,
  automation: Workflow,
  cpu: Cpu,
  hardware: Cpu,
  technology: Cpu,
  lightbulb: Lightbulb,
  ideas: Lightbulb,
  sparkles: Sparkles,
  innovation: Sparkles,
  layers: Layers,
  compass: Compass,
  research: Compass,
  microscope: Microscope,
  'notebook-text': NotebookText,
  journal: NotebookText,
  'book-open': BookOpen,
  reading: BookOpen,
  'graduation-cap': GraduationCap,
  education: GraduationCap,
  'folder-archive': FolderArchive,
  archive: FolderArchive,
  package: Package,
  materials: Package,

  // Business & Ventures
  'building-2': Building2,
  entrepreneurship: Building2,
  'briefcase-business': BriefcaseBusiness,
  briefcase: Briefcase,
  ventures: BriefcaseBusiness,
  target: Target,
  strategy: Target,
  'chart-no-axes-combined': ChartNoAxesCombined,
  analytics: ChartNoAxesCombined,
  'chart-line': ChartLine,
  finance: ChartLine,
  users: Users,
  collaboration: Users,
  'trending-up': TrendingUp,
  growth: TrendingUp,

  // Interface Actions & Status Indicators
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'external-link': ExternalLink,
  download: Download,
  search: Search,
  menu: Menu,
  x: X,
  close: X,
  'maximize-2': Maximize2,
  expand: Maximize2,
  copy: Copy,
  check: Check,
  'check-circle-2': CheckCircle2,
  'message-square': MessageSquare,
  chat: MessageSquare,
};

export type IconName = keyof typeof ICON_MAP;

export interface IconProps {
  name: IconName | string;
  size?: IconSize;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

/**
 * Professional Vector Icon Component
 * Enforces unified Lucide component imports, consistent stroke width (2),
 * and an exact sizing scale (16, 20, 24, 32px) with currentColor inheritance.
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  strokeWidth = 2,
  className = '',
  label,
}) => {
  // Resolve standard size scale (16, 20, 24, 32)
  let resolvedSize: number = 20;
  if (typeof size === 'number') {
    resolvedSize = size;
  } else if (size in ICON_SIZE_SCALE) {
    resolvedSize = ICON_SIZE_SCALE[size];
  } else {
    const parsed = parseInt(String(size), 10);
    resolvedSize = isNaN(parsed) ? 20 : parsed;
  }

  // Purely decorative icons are hidden from assistive tech.
  // When an explicit label is provided, expose as an accessible img.
  const a11yProps = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true as const, focusable: false };

  const normalized = name.toLowerCase().trim();
  const Component = ICON_MAP[normalized] || Sparkles;

  return (
    <Component
      size={resolvedSize}
      strokeWidth={strokeWidth}
      className={`shrink-0 transition-colors duration-150 ${className}`}
      {...a11yProps}
    />
  );
};

export default Icon;
