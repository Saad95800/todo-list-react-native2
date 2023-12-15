import React from 'react'
import {Pressable, Text} from 'react-native'
import {s} from './ButtonAdd.style'

export default function ButtonAdd({showAddDialog}) {
  return (
    <Pressable style={s.btn} onPress={()=>{showAddDialog()}}>
        <Text>+ New todo</Text>
    </Pressable>
  )
}
