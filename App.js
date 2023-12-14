import {useState} from 'react'
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { Text, View, ScrollView } from 'react-native';
import { s } from './app.styles.js';
import Header from './components/Header/Header.js';
import CardTodo from './components/CardTodo/CardTodo.js';


export default function App() {

  const [todoList, setTodoList ] = useState([
    {id: 1, title: "Sortir le chien", isCompleted: true},
    {id: 2, title: "Aller chez le garagiste", isCompleted: false},
    {id: 3, title: "Faire les courses", isCompleted: false},
    {id: 4, title: "Appeler le vétérinaire", isCompleted: false}
  ])

  function updateTodo(todo){
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    }

    const indexToUpdate = todoList.findIndex((todo) => Number(todo.id) === Number(updatedTodo.id))
    const updatedTodolist = [...todoList]
    updatedTodolist[indexToUpdate] = updatedTodo
    setTodoList(updatedTodolist)

  }

  function renderTodoList(){
    return todoList.map((todo, i) => {
      return <View key={i} style={s.cardItem}>
                <CardTodo todo={todo} updateTodo={updateTodo}/>
             </View>
    })
  }

  return (
    <View style={{flexDirection: 'column', flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
          <View style={s.footer}>
            <Text>Footer</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}