import { StyleSheet, Text, View, Image, Pressable, PressableProps } from 'react-native';
import React, { useEffect, useState } from 'react';
import { QuoteObject, QuoteStock, Stock } from '../types';
import { formatNum, getColor } from '../utils/numberic';
import { quoteEndpoint } from '../utils/services';
//@ts-ignore
const StockCard = ({ stock = {}, onPressFunc }: { stock: QuoteStock; onPressFunc: PressableProps['onPress'] }) => {
  const { title, symbol, uri } = stock;

  return (
    <Pressable style={styles.stockCard} onPress={onPressFunc}>
      <Image style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 0.2 }} source={{ uri }} />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{title}</Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>${formatNum(stock['05. price'])}</Text>
      <View style={[styles.row, { marginTop: 10 }]}>
        <Text style={[styles.stockChip, { color: getColor(stock['10. change percent']) }]}>{formatNum(stock['10. change percent'])}</Text>
        <Text style={styles.stockChip}>{formatNum(stock['09. change'])}</Text>
      </View>
    </Pressable>
  );
};

export default StockCard;

const styles = StyleSheet.create({
  stockCard: {
    justifyContent: 'flex-start',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingTop: 15,
    // marginLeft: 15,
    height: 180,
    width: '45%',
    flexDirection: 'column',
  },
  stockChip: {
    backgroundColor: 'lightgrey',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
