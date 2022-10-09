import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useReducer, useContext, createContext } from 'react';
import { StateType } from './types';

export const AppContext = createContext<any>({});
function reducer(state: StateType, action: { payload: StateType }) {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload };
    case 'get':
      return { ...state };
    default:
      throw new Error();
  }
}
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [state, dispatch] = useReducer(reducer, {});
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider value={[state, dispatch]}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}
