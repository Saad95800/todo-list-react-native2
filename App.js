import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { s } from './app.styles.js';

export default function App() {
  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Text>Header</Text>
          </View>
          <View style={s.body}>
            <Text>Body</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
          <View style={s.footer}>
            <Text>Footer</Text>
          </View> 
    </View>
  );
}