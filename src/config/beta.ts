export const BETA_MODE = typeof window !== 'undefined'
  && localStorage.getItem('veritas-beta-mode') === 'true';
