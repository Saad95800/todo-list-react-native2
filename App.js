import {useState} from 'react'
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { Text, View, ScrollView } from 'react-native';
import { s } from './app.styles.js';
import Header from './components/Header/Header.js';
import CardTodo from './components/CardTodo/CardTodo.js';
import TabBottomMenu from './components/TabBottomMenu/TabBottomMenu.js';


export default function App() {

  const [selectedTabName, setSelectedTabName ] = useState('all')

    const [todoList, setTodoList ] = useState([
    {id: 1, title: "Sortir le chien", isCompleted: true},
    {id: 2, title: "Aller chez le garagiste", isCompleted: false},
    {id: 3, title: "Faire les courses", isCompleted: false},
    {id: 4, title: "Appeler le vétérinaire", isCompleted: false}
  ])

  function getFilteredList(){
    switch(selectedTabName){
      case "all":
        return todoList
      case "inProgress":
        return todoList.filter(todo => !todo.isCompleted)
      case "done":
        return todoList.filter(todo => todo.isCompleted)
    }
  }


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
    return getFilteredList().map((todo, i) => {
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
            <TabBottomMenu selectedTabName={selectedTabName} setSelectedTabName={setSelectedTabName} todoList={todoList}/>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}