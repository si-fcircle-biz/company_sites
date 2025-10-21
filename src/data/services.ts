import { Code, Cloud, BarChart, Shield, Briefcase } from 'lucide-react';

export const services = [
  {
    id: '1',
    slug: 'app-development',
    title: 'アプリケーション開発',
    description: 'モダンな技術スタックで、スケーラブルで保守性の高いシステムを開発します',
    icon: Code,
    href: '/services/app-development',
  },
  {
    id: '2',
    slug: 'cloud-migration',
    title: 'クラウド移行支援',
    description: 'オンプレミスからクラウドへの移行を、安全かつ効率的に実現します',
    icon: Cloud,
    href: '/services/cloud-migration',
  },
  {
    id: '3',
    slug: 'data-analytics',
    title: 'データ分析・活用',
    description: 'ビッグデータを活用し、ビジネス価値を最大化するソリューションを提供します',
    icon: BarChart,
    href: '/services/data-analytics',
  },
  {
    id: '4',
    slug: 'system-operation',
    title: '運用保守サービス',
    description: '24時間365日の監視体制で、システムの安定稼働を支援します',
    icon: Shield,
    href: '/services/system-operation',
  },
  {
    id: '5',
    slug: 'consulting',
    title: 'ITコンサルティング',
    description: 'DX戦略の立案から実行まで、トータルでサポートします',
    icon: Briefcase,
    href: '/services/consulting',
  },
];
