import {useEffect, useState} from 'react'
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import { Alert, View, ScrollView } from 'react-native';
import { s } from './app.styles.js';
import Header from './components/Header/Header.js';
import CardTodo from './components/CardTodo/CardTodo.js';
import TabBottomMenu from './components/TabBottomMenu/TabBottomMenu.js';
import ButtonAdd from './components/ButtonAdd/ButtonAdd.js';
import Dialog from "react-native-dialog"
import AsyncStorage from '@react-native-async-storage/async-storage';

let isFirstRender = true
let isLoadUpdate = false

export default function App() {

  const [selectedTabName, setSelectedTabName ] = useState('all')
  const [isAddDialogVisible, setIsAddDialogVisible ] = useState(false)
  const [inputValue, setInputValue ] = useState('')
  
  const [todoList, setTodoList] = useState([])

  useEffect(()=>{
      loadTodoList()
  }, [])

  useEffect(()=>{
    if(isLoadUpdate){
      isLoadUpdate = false
    }else{
      if(!isFirstRender){
        saveTodoList()
      }else{
        isFirstRender = false
      }        
    }
  }, [todoList])

  async function saveTodoList(){
    try{
      await AsyncStorage.setItem("@todolist", JSON.stringify(todoList))
    }catch(err){
      alert('Erreur '+ err)
    }
  }

  async function loadTodoList(){
    try{
      const stringifiedTodoList = await AsyncStorage.getItem("@todolist")
      if(stringifiedTodoList !== null){
        setTodoList(JSON.parse(stringifiedTodoList))
      }
    }catch(err){
      alert('Erreur '+ err)
    }
  }

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

  function deleteTodo(todoToDelete){
    Alert.alert("Suppression", "Supprimer cette tâche ?", [
      {
        text: "supprimer",
        style: "destructive",
        onPress: ()=>{
          setTodoList(todoList.filter(todo => todo.id !== todoToDelete.id))
        }
      },
      {
        text: "Annuler",
        style: 'cancel'
      }
    ])
  }

  function renderTodoList(){
    return getFilteredList().map((todo, i) => {
      return <View key={i} style={s.cardItem}>
                <CardTodo todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
             </View>
    })
  }

  function showAddDialog(){
    setIsAddDialogVisible(true)
  }

  function addTodo(){
    const newTodo = {
      id: Date.now(),
      title: inputValue,
      isCompleted: false
    }
    setTodoList([...todoList, newTodo])
    setIsAddDialogVisible(false)
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
          <ButtonAdd showAddDialog={showAddDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <Dialog.Container visible={isAddDialogVisible} onBackdropPress={()=>{ setIsAddDialogVisible(false)}}>
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Description>Choisi un nom pour la nouvelle tâche</Dialog.Description>
        <Dialog.Input onChangeText={setInputValue} />
        <Dialog.Button disabled={inputValue.trim().length === 0} label="Créer" onPress={()=>{ addTodo() }} />
      </Dialog.Container>
    </View>
  );
}