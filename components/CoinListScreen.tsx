import { COLORS } from '@/constants';
import { useCoinData } from '@/hooks/useCoinData';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CoinList } from './CoinList';
import { ErrorState } from './ErrorState';
import { LoadingState } from './LoadingState';

export default function CoinListScreen() {
  const {
    coins,
    loading,
    refreshing,
    loadingMore,
    error,
    handleLoadMore,
    handleRefresh,
  } = useCoinData();

  // Show loading state for initial load
  if (loading && coins.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingState />
      </SafeAreaView>
    );
  }

  // Show error state if no data and there's an error
  if (error && coins.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState message={error} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CoinList
        coins={coins}
        refreshing={refreshing}
        loadingMore={loadingMore}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
});
