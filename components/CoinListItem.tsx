import { COLORS } from "@/constants";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CoinListItem as CoinListItemType } from '../types/coin';

interface Props {
  item: CoinListItemType;
}

export const CoinListItem: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}/>

      <View style={styles.contentContainer}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.BACKGROUND,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbolText: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: 'SFProText-Regular',
  },
  priceText: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: 'SFProText-Regular',
  },
});
