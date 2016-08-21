import React, {PropTypes} from "react"
import {Text} from "react-native"
import {Actions} from "react-native-router-flux"

const inlineStyles = getInlineStyles()

export function FooterLink({name, scene}) {
  return (
    <Text
      onPress={() => Actions[scene]()}
      style={inlineStyles.link}
    >{name}</Text>
  )
}

FooterLink.propTypes = {
  name: PropTypes.string,
  scene: PropTypes.string,
}

function getInlineStyles() {
  return {
    link: {
      flex: 1,
      textAlign: "center",
    },
  }
}
