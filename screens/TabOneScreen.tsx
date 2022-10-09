import { Image, StyleSheet, Text, View } from 'react-native';
import { RootTabScreenProps, QuoteStock, QuoteResponse, Stock } from '../types';
import { SimpleLineIcons, AntDesign, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useState } from 'react';
import SeeAllBtn from '../components/SeeAllBtn';
import StockCard from '../components/StockCard';
import { db } from '../database/firebase';
import { quoteEndpoint } from '../utils/services';
import { formatNum, getColor } from '../utils/numberic';
import { pick } from '../utils/pick';
import { AppContext } from '../App';

const STORE_KEYS = ['follow', 'title', 'uri', 'symbol'];
export default function TabOneScreen({ navigation, route }: RootTabScreenProps<'TabOne'>) {
  const [watchlist, setWatchlist] = useState<Array<QuoteStock>>([]);
  const [stocks, setStocks] = useState<Array<QuoteStock>>([]);
  const [{ uid }] = useContext(AppContext);
  const docRef = db.collection('users').doc(uid);

  const unfollow = async (symbol: string) => {
    const udpateData = stocks.reduce((pre, cur) => {
      let temp = pick(cur, STORE_KEYS);
      if (cur.symbol === symbol) {
        Object.assign(temp, { follow: !cur.follow });
      }
      //@ts-ignore
      pre.push(temp);
      return pre;
    }, []);
    await docRef.set({ stocks: udpateData });
  };

  useEffect(() => {
    const init = async () => {
      const doc = await docRef.get();
      if (doc.exists && doc.data()) {
        const storeData = (doc.data()?.stocks || []) as Stock[];
        const quotes = await Promise.all(storeData.map((i) => quoteEndpoint(i)));
        setStocks(quotes);
        setWatchlist(quotes.filter((i) => i.follow).slice(0, 3));
      }
    };
    init();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topCard}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Dashboard</Text>
        <SimpleLineIcons name="magnifier" size={30} color="black" />
      </View>
      <View style={[styles.separator, { backgroundColor: '#eee' }]} />
      <View style={[styles.row, { paddingHorizontal: 20 }]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Gainers and Losers</Text>
        <SeeAllBtn />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <StockCard stock={stocks.find((i) => i.title === 'Tesla') as QuoteStock} />
        <StockCard stock={stocks.find((i) => i.title === 'GameStop') as QuoteStock} />
      </View>
      <View style={[styles.separator, { backgroundColor: '#eee' }]} />
      <View style={[styles.row, { paddingHorizontal: 20 }]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your watchlist</Text>
        <SeeAllBtn onPress={() => navigation.navigate('Welcome')} />
      </View>
      <View>
        {watchlist.map((i, index) => (
          <View
            key={i['01. symbol'] || index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginHorizontal: 15,
              height: 80,
              width: '90%',
              borderColor: 'grey',
              borderWidth: 0.5,
              borderRadius: 15,
              marginTop: 10,
              paddingHorizontal: 15,
            }}
          >
            <AntDesign name="star" size={30} color="orange" onPress={() => unfollow(i.symbol)} />
            <View style={{ flexDirection: 'column' }}>
              <Text>{i.title}</Text>
              <Text style={{ color: getColor(i['10. change percent']) }}>{formatNum(i['10. change percent'])}</Text>
            </View>
            <Text>${formatNum(i['05. price'])}</Text>
            <Feather name="more-vertical" size={24} color="black" />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff5f9',
  },
  topCard: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: 160,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
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
});
