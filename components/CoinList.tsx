import { CoinListItem as CoinListItemType } from '@/types/coin';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { CoinListItem } from './CoinListItem';
import { COLORS, PAGINATION } from '@/constants';

interface CoinListProps {
  coins: CoinListItemType[];
  refreshing: boolean;
  loadingMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
}

export const CoinList: React.FC<CoinListProps> = ({
  coins,
  refreshing,
  loadingMore,
  onRefresh,
  onLoadMore,
}) => {
  const renderItem = useCallback(({ item }: { item: CoinListItemType }) => (
    <CoinListItem item={item} />
  ), []);

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={COLORS.PRIMARY} />
      </View>
    );
  }, [loadingMore]);

  const keyExtractor = useCallback((item: CoinListItemType) => item.id, []);

  return (
    <FlatList
      data={coins}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onLoadMore}
      onEndReachedThreshold={PAGINATION.END_REACHED_THRESHOLD}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.PRIMARY]}
          tintColor={COLORS.PRIMARY}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={15}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
