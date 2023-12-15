import React from 'react'
import { Pressable, Text, View } from 'react-native'
import {s} from './TabBottomMenu.style'

export default function TabBottomMenu({selectedTabName, setSelectedTabName, todoList}) {

    const countByStatus = todoList.reduce((acc, todo)=>{
        todo.isCompleted ? acc.done++ : acc.inProgress++
        return acc
    },
    {all: todoList.length, inProgress: 0, done: 0}
    )

    function getTextStyle(tabName){
        return { fontWeight: 'bold', color: tabName === selectedTabName ? "#2F76E5" : "black"}
    }

  return (
    <View style={s.container}>
        <Pressable onPress={()=>{ setSelectedTabName('all') }}>
            <Text style={getTextStyle('all')}>All ({countByStatus.all})</Text>
        </Pressable>
        <Pressable onPress={()=>{ setSelectedTabName('inProgress') }}>
            <Text style={getTextStyle('inProgress')}>In progress ({countByStatus.inProgress})</Text>
        </Pressable>
        <Pressable onPress={()=>{ setSelectedTabName('done') }}>
            <Text style={getTextStyle('done')}>Done ({countByStatus.done})</Text>
        </Pressable>
    </View>
  )
}
