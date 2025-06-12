import { CoinService } from '@/services/coinService';
import { Coin, CoinListItem as CoinListItemType } from '@/types/coin';
import { ColorGenerator } from '@/utils/colorGenerator';
import { useCallback, useEffect, useState } from 'react';
import { MESSAGES, PAGINATION } from '@/constants';

interface UseCoinDataReturn {
  coins: CoinListItemType[];
  loading: boolean;
  refreshing: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  handleLoadMore: () => void;
  handleRefresh: () => void;
}

export const useCoinData = (): UseCoinDataReturn => {
  const [coins, setCoins] = useState<CoinListItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = useCallback((priceUsd: string): string => {
    const price = parseFloat(priceUsd);
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, []);

  const transformCoinsToListItems = useCallback((apiCoins: Coin[], startIndex: number): CoinListItemType[] => {
    return apiCoins.map((coin, index) => ({
      id: coin.id,
      symbol: coin.symbol,
      price: formatPrice(coin.priceUsd),
      backgroundColor: ColorGenerator.generateColorForIndex(startIndex + index),
    }));
  }, [formatPrice]);

  const loadCoins = useCallback(async (offset: number = 0, append: boolean = false) => {
    if (!append) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const response = await CoinService.getCoins(PAGINATION.ITEMS_PER_PAGE, offset);
      const newCoins = transformCoinsToListItems(response.data, offset);

      if (append) {
        setCoins(prevCoins => [...prevCoins, ...newCoins]);
      } else {
        setCoins(newCoins);
      }

      setHasMore(response.data.length === PAGINATION.ITEMS_PER_PAGE);
    } catch (err) {
      setError(MESSAGES.ERROR_LOAD_FAILED);
      console.error('Error loading coins:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, [transformCoinsToListItems]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      loadCoins(coins.length, true);
    }
  }, [loadingMore, hasMore, coins.length, loadCoins]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadCoins(0, false);
  }, [loadCoins]);

  useEffect(() => {
    loadCoins();
  }, [loadCoins]);

  return {
    coins,
    loading,
    refreshing,
    loadingMore,
    hasMore,
    error,
    handleLoadMore,
    handleRefresh,
  };
};
