export const PAGINATION = {
  ITEMS_PER_PAGE: 15,
  END_REACHED_THRESHOLD: 0.1,
} as const;

export const COLORS = {
  PRIMARY: '#007AFF',
  ERROR: '#FF3B30',
  TEXT_SECONDARY: '#666666',
  TEXT_PRIMARY: "#17171A",
  BACKGROUND: '#FFFFFF',
} as const;

export const MESSAGES = {
  LOADING: 'Loading cryptocurrencies...',
  ERROR_LOAD_FAILED: 'Failed to load cryptocurrency data',
} as const;
