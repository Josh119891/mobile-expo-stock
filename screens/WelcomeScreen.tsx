import { SafeAreaView, StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { ScreenTitle } from '../components/StyledText';
import { RoundIcon } from '../components/StyledImage';
import algoliasearch from 'algoliasearch';
import { pick } from '../utils/pick';
import { RootStackScreenProps, Stock } from '../types';

// @ts-ignore
import { ALGOLIA_AID, ALGOLIA_KEY, ALGOLIA_INDEX } from '@env';
import { db } from '../database/firebase';
import Navigation from '../navigation';
import { AppContext } from '../App';
const client = algoliasearch(ALGOLIA_AID, ALGOLIA_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

const WelcomeScreen = ({ route, navigation }: RootStackScreenProps<'Welcome'>) => {
  const [showBoard, setShowBoard] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState<Stock[]>([]);
  const [temp, setTemp] = useState<Stock[]>([]);

  const docRef = db.collection('users').doc(uid);
  const [state] = useContext(AppContext);
  useEffect(() => {
    (async () => {
      // 如果该用户已经有关注的股票，在这里读取并写入list
      const doc = await docRef.get();
      if (doc.exists && doc.data()) {
        setList(doc.data()?.stocks as Stock[]);
        setTemp(doc.data()?.stocks as Stock[]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!searchText.length) {
      setTemp(list);
      return;
    }
    index.search(searchText).then(({ hits }) => {
      const stocks = [];
      for (let hit of hits) {
        for (let item of temp) {
          if (item.title === (hit as any).title) stocks.push(item);
        }
      }

      setTemp(stocks);
    });
  }, [searchText]);

  const onSubmit = async () => {
    try {
      // 把当前页面的更改，写入list里面，在一次更新到线上
      const stocks = [...list];
      for (let changed of temp) {
        for (let i = 0; i < stocks.length; i++) {
          if (stocks[i].title === changed.title) {
            stocks[i] = { ...stocks[i], follow: changed.follow };
          }
        }
      }
      await docRef.set({ stocks });
      navigation.navigate('Root', { params: { uid }, screen: 'TabOne' });
    } catch (error: any) {
      alert(error.message);
      console.log(error.message);
    }
  };
  const Board = () => {
    return (
      <View style={styles.board}>
        <View style={styles.upper}>
          <ScreenTitle>Welcome!</ScreenTitle>
          <Entypo name="cross" size={32} color="black" onPress={() => setShowBoard(false)} />
        </View>
        <Text style={styles.description}>Choose your interests to follow and trade on your terms.</Text>
        <View style={styles.searchBar}>
          <SimpleLineIcons name="magnifier" size={24} color="grey" />
          <TextInput
            value={searchText}
            style={styles.searchInput}
            onChangeText={(text) => setSearchText(text)}
            autoFocus
            maxLength={40}
            placeholder={'Search interest to follow'}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {showBoard ? <Board /> : null}
      <View style={styles.cardGrid}>
        {temp.map((item, index) => {
          return (
            <View key={item.symbol} style={styles.card}>
              <RoundIcon source={{ uri: item.uri }} />
              <Text style={{ fontWeight: 'bold' }}> {item.title}</Text>
              <Pressable
                onPress={() => {
                  const newTemp = [...temp];
                  newTemp[index] = { ...item, follow: !item.follow };
                  setTemp(newTemp);
                }}
                style={item.follow ? styles.followBtn : styles.unfollowBtn}
              >
                <Text style={item.follow ? styles.followText : styles.unfollowText}>follow</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
      <View style={styles.submitView}>
        <Pressable onPress={onSubmit} style={styles.submitBtn}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Add to watch list</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
  },
  board: {
    backgroundColor: 'white',
    height: '25%',
    width: '100%',
    padding: 20,
  },
  upper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  description: {
    color: 'grey',
    fontSize: 16,
    marginTop: 12,
    width: '85%',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 20,
    maxWidth: '80%',
  },
  cardGrid: {
    zIndex: 1,
    position: 'relative',

    flex: 1,
    display: 'flex',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    justifyContent: 'space-around',
    //垂直分布
  },

  card: {
    display: 'flex',
    height: '32%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,

    backgroundColor: 'white',
    width: '40%',
    borderRadius: 15,
  },
  unfollowBtn: {
    borderColor: 'grey',
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followBtn: {
    backgroundColor: 'black',
    borderColor: 'grey',
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  unfollowText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: 'blue',
    margin: 6,
    padding: 10,
    width: '90%',
    borderRadius: 5,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitView: {
    zIndex: 1,
    flex: 2,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
});
