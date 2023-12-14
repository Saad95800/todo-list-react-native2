import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'
import checkImg from '../../assets/check.png'
import { s } from './CardTodo.style'

export default function CardTodo({todo, updateTodo}) {
  return (
    <TouchableOpacity style={s.card} onPress={()=>{ updateTodo(todo) }}>
        <Text style={[s.txt, todo.isCompleted && {textDecorationLine: "line-through"}]}>{todo.title}</Text>
        {todo.isCompleted && <Image style={s.img} source={checkImg} />}
    </TouchableOpacity>
  )
}
