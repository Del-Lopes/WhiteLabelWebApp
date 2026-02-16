export const BRAND_CONFIG = {
  name: 'Libertraders',
  companyName: 'Libertraders Financial Group',
  colors: {
    primary: '#2563eb', // blue-600
    primaryHover: '#1d4ed8', // blue-700
    primaryLight: '#dbeafe', // blue-50
    secondary: '#0f172a', // slate-900 (Dark Navy)
    accent: '#3b82f6', // blue-500
  },
  logo: {
    icon: '/icon.png',
    full: '/logo.png',
  },
  seo: {
    title: 'Libertraders | Inteligência em Trading Algorítmico',
    description: 'Acesse ferramentas exclusivas, robôs de trading e educação financeira de alto nível.',
  }
};

export type BrandConfig = typeof BRAND_CONFIG;
