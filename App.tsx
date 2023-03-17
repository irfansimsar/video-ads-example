/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Player from './components/Player';

function App(): JSX.Element {
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const togglePlayer = () => setIsPlayerOpen(!isPlayerOpen);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />

        <TouchableOpacity
          style={{backgroundColor: '#dedede', padding: 20}}
          onPress={togglePlayer}>
          <Text style={{textAlign: 'center'}}>Toggle Player</Text>
        </TouchableOpacity>

        {isPlayerOpen && <Player />}
      </ScrollView>
    </SafeAreaView>
  );
}
export default App;
