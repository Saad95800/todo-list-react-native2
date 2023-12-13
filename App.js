import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { s } from './app.styles.js';
import Header from './components/Header/Header.js';
import CardTodo from './components/CardTodo/CardTodo.js';

const TODO_LIST = [
  {id: 1, title: "Sortir le chien", isCompleted: true},
  {id: 2, title: "Aller chez le garagiste", isCompleted: false},
  {id: 3, title: "Faire les courses", isCompleted: false},
  {id: 4, title: "Appeler le vétérinaire", isCompleted: false}
]

export default function App() {
  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <CardTodo todo={TODO_LIST[0]} />
          </View>
          <View style={s.footer}>
            <Text>Footer</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}