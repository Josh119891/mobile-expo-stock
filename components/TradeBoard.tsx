import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { QuoteObject, Stock } from '../types';
import { getColor } from '../utils/numberic';
import { quoteEndpoint } from '../utils/services';

interface Props {
  stock: Stock;
}
const TradeBoard = ({ stock }: Props) => {
  const { title, symbol, uri } = stock;
  const [stockQuote, setStockQuote] = useState<QuoteObject>();
  useEffect(() => {
    const init = async () => {
      const quoteObj = await quoteEndpoint(symbol);
      setStockQuote(quoteObj);
    };
    init();
  }, []);

  return (
    <View style={styles.stockCard}>
      <Image style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 0.2 }} source={{ uri }} />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{title}</Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 10 }}>${stockQuote['05. price']}</Text>
      <View style={[styles.row, { marginTop: 10 }]}>
        <Text style={[styles.stockChip, { color: getColor(stockQuote['10. change percent']) }]}>{stockQuote['10. change percent']}</Text>
        <Text style={styles.stockChip}>{stockQuote['09. change']}</Text>
      </View>
    </View>
  );
};

export default TradeBoard;

const styles = StyleSheet.create({
  stockCard: {
    justifyContent: 'flex-start',
    borderWidth: 0.5,
    borderRadius: 15,
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
    borderRadius: 15,
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
