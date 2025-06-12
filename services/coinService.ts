import { CoinCapResponse } from '../types/coin';

const AUTH_KEY = process.env.EXPO_PUBLIC_COINCAP_AUTH_KEY;

const API_BASE_URL = 'https://rest.coincap.io/v3';

export class CoinService {
  static async getCoins(limit: number = 15, offset: number = 0): Promise<CoinCapResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/assets?limit=${limit}&offset=${offset}`, {
        headers: {
          authorization: `Bearer ${AUTH_KEY}`,
        }
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching coins:', error);
      throw error;
    }
  }
}
