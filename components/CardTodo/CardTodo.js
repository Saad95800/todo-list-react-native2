import React from 'react'
import { Pressable, Text, Image } from 'react-native'
import checkImg from '../../assets/check.png'
import { s } from './CardTodo.style'

export default function CardTodo({todo, updateTodo, deleteTodo}) {
  return (
    <Pressable style={s.card} onPress={()=>{ updateTodo(todo) }} onLongPress={()=>{ deleteTodo(todo) }}>
        <Text style={[s.txt, todo.isCompleted && {textDecorationLine: "line-through"}]}>{todo.title}</Text>
        {todo.isCompleted && <Image style={s.img} source={checkImg} />}
    </Pressable>
  )
}
