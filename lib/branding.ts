export const BRAND_CONFIG = {
  name: 'Libertraders',
  companyName: 'Libertraders Financial Group',
  colors: {
  primary: '#2563eb',       // Cor principal (ex: Azul)
    primaryHover: '#1d4ed8',  // Cor no mouse (levemente mais escura)
    primaryLight: '#f8e5cb',  // Cor de fundo leve (clara)
    secondary: '#0d0f28',     // Cor de contraste (Dark)
    accent: '#3b82f6',        // Cor de destaque secundário
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
