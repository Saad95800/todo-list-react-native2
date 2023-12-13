import React from 'react'
import { Image, Text } from 'react-native'
import { s } from './Header.style'
import HeaderLogo from '../../assets/logo.png'

export default function Header() {
  return (
    <>
        <Image style={s.img} source={HeaderLogo} resizeMode="contain" />
        <Text style={s.subtitle}>Tu as quelque chose à faire</Text>
    </>
  )
}
