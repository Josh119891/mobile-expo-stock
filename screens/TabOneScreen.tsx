import { Image, StyleSheet, Text, View } from 'react-native';
import { RootTabScreenProps, QuoteObject, QuoteResponse, Stock } from '../types';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
// import { quoteEndpoint } from '../services';
import SeeAllBtn from '../components/SeeAllBtn';

export default function TabOneScreen({ navigation, route }: RootTabScreenProps<'TabOne'>) {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  // const { uid } = route.params;
  useEffect(() => {}, []);

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
        {/* <StockCard data={left} title={"Tesla"} img={"TESLA_IMG"} />
          <StockCard data={right} title={"GameStop"} img={"GMST_IMG"} /> */}
      </View>
      <View style={[styles.separator, { backgroundColor: '#eee' }]} />
      <View style={[styles.row, { paddingHorizontal: 20 }]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your watchlist</Text>
        <SeeAllBtn />
      </View>
      <View>
        {/* {list.map((i, index) => (
            <View
              key={i["01. symbol"] || index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginHorizontal: 15,
                height: 80,
                width: "90%",
                borderColor: "grey",
                borderWidth: 0.5,
                borderRadius: 15,
                marginTop: 10,
                paddingHorizontal: 15,
              }}
            >
              <AntDesign name="star" size={30} color="orange" />
              <Text>{i.title || "title"}</Text>
              <View style={{ flexDirection: "column" }}>
                <Text>{i["01. symbol"] || "title"}</Text>

                <Text style={{ color: parseInt(i["10. change percent"], 10) > 0 ? "green" : "red" }}>{i["10. change percent"] || "123"}</Text>
              </View>
              <Text>{i["05. price"] || "123"}</Text>
            </View>
          ))} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
