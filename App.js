import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { s } from './app.styles.js';
import Header from './components/Header/Header.js';

export default function App() {
  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <Text>Body</Text>
          </View>
          <View style={s.footer}>
            <Text>Footer</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}