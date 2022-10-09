import { Pressable, StyleSheet, Text, TouchableOpacity, View, PressableProps } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ChartResponse, QuoteObject, QuoteStock, RootStackScreenProps, Stock } from '../types';
import { AntDesign, Feather } from '@expo/vector-icons';
import { getDailyStock, getMonthlyStock, quoteEndpoint } from '../utils/services';
import { RoundIcon } from '../components/StyledImage';
import { ScreenTitle } from '../components/StyledText';
import { formatNum, getColor, toFix } from '../utils/numberic';
import { db } from '../database/firebase';
import { AppContext } from '../context';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
enum TIMES {
  '1d' = '1d',
  '5d' = '5d',
  '30d' = '30d',
  '90d' = '90d',
  '6m' = '6m',
  '1y' = '1y',
  'all' = 'all',
}

const StockChart = ({ navigation, route }: RootStackScreenProps<'StockChart'>) => {
  const [time, setTime] = useState<keyof typeof TIMES>(TIMES['1d']);
  const [yValues, setYValues] = useState<number[]>([]);
  const [xValues, setXValues] = useState<string[]>([]);
  const [{ uid }] = useContext(AppContext);
  const symbol = route.params.symbol;
  const [quote, setQuote] = useState<QuoteStock>({} as QuoteStock);
  const userRef = db.collection('users').doc(uid);
  const [dailyData, setDailyData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});

  const ChartButton = ({ title, onPressFunc }: { title: string; onPressFunc: PressableProps['onPress'] }) => {
    return (
      <Pressable
        onPress={onPressFunc}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          backgroundColor: 'lightgrey',
          marginRight: 10,
          padding: 5,
          borderRadius: 5,
        })}
      >
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      </Pressable>
    );
  };
  useEffect(() => {
    const init = async () => {
      try {
        const snapshot = await userRef.get();
        const stock = (snapshot.data()?.stocks as Stock[]).find((i) => i.symbol === symbol) as Stock;
        const quoteResult = await quoteEndpoint(stock);
        setQuote(quoteResult);
        const daily = await getDailyStock(symbol);
        setDailyData(daily);
        const monthly = await getMonthlyStock(symbol);
        setMonthlyData(monthly);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    init();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('Root', { screen: 'TabOne' })}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 80, marginRight: 15 }}>
          <TouchableOpacity>
            <AntDesign name={quote.follow ? 'star' : 'staro'} size={30} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="share" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const getChartData = async () => {
      try {
        let yArr = [];
        let xArr: string[] = [];
        // 如果是 1day 或 5day
        switch (time) {
          case TIMES['1d']:
          case TIMES['5d']: {
            const timeSeriesKeys = Object.keys(dailyData || {});
            let temp = 0;
            for (let i = 0; i < timeSeriesKeys.length; i++) {
              if (time === TIMES['5d'] && temp % 5 === 0) {
                xArr.push(timeSeriesKeys[i]);
              } else {
                xArr.push(timeSeriesKeys[i]);
              }
              temp++;
            }
            xArr = xArr.sort().slice(xArr.length - 4, xArr.length);
            for (let x of xArr) {
              //@ts-ignore
              yArr.push(parseInt(dailyData[x]['4. close'], 10));
            }
            break;
          }
          case TIMES['30d']:
          case TIMES['90d']:
          case TIMES['6m']:
          case TIMES['1y']:
          case TIMES['all']: {
            const timeSeriesKeys = Object.keys(monthlyData);
            let temp = 0;
            for (let i = 0; i < timeSeriesKeys.length; i++) {
              if (time === TIMES['30d'] || time === TIMES['all']) {
                xArr.push(timeSeriesKeys[i]);
              } else if (time === TIMES['90d'] && temp % 3 === 0) {
                xArr.push(timeSeriesKeys[i]);
              } else if (time === TIMES['6m'] && temp % 6 === 0) {
                xArr.push(timeSeriesKeys[i]);
              } else if (time === TIMES['1y'] && temp % 12 === 0) {
                xArr.push(timeSeriesKeys[i]);
              }
              temp++;
            }
            if (time === TIMES['all']) {
              xArr = xArr.sort();
            } else {
              xArr = xArr.sort().slice(xArr.length - 5, xArr.length);
            }
            for (let x of xArr) {
              //@ts-ignore
              yArr.push(parseInt(monthlyData[x]['4. close'], 10));
            }
            break;
          }
        }

        setYValues(yArr);
        setXValues(xArr);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getChartData();
  }, [time]);
  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: 'grey' }}>{symbol}</Text>
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <ScreenTitle>{quote.title}</ScreenTitle>
          <RoundIcon source={{ uri: quote.uri }} />
        </View>
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={[styles.chipText, { fontSize: 20 }]}>${formatNum(quote['05. price'])}</Text>

          <Text style={[styles.stockChip, { color: getColor(quote['10. change percent']) }, styles.chipText]}>{formatNum(quote['10. change percent'])}</Text>
          <Text style={[styles.stockChip, styles.chipText]}>{formatNum(quote['09. change'])}</Text>
        </View>
      </View>
      <View style={{ padding: 10, justifyContent: 'center' }}>
        <View style={styles.row}>
          {Object.keys(TIMES).map((i) => (
            <ChartButton key={i} title={i} onPressFunc={() => setTime(i as keyof typeof TIMES)} />
          ))}
        </View>
        {yValues.length > 0 ? (
          <LineChart
            data={{
              labels: xValues,
              datasets: [
                {
                  data: yValues.map((i) => Math.floor(i)),
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <ScreenTitle>Loading</ScreenTitle>
        )}

        <Pressable
          style={styles.submitBtn}
          onPress={async () => {
            const snapshot = await userRef.get();
            if (snapshot.exists && snapshot.data()?.stocks) {
              let list = snapshot.data()?.stocks;
              //@ts-ignore
              list.reduce((pre, cur) => {
                if (cur.tittle === quote.title) {
                  cur.follow = true;
                }
                pre.push(cur);
                return pre;
              }, []);
              await userRef.set({ stocks: list });
            }
          }}
        >
          <Text style={styles.submitText}>Follow</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default StockChart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockChip: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    overflow: 'hidden',
  },
  chipText: {
    fontSize: 16,
    padding: 2,
    marginRight: 10,
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: 'darkblue',
    margin: 6,
    padding: 10,
    borderRadius: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 20,
  },
});
