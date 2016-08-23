import React, {PropTypes} from "react"
import {Text} from "react-native"

const inlineStyles = getInlineStyles()

export function GameButton({children, isPressed, onPress}) {
  return (
    <Text
      onPress={onPress}
      style={[inlineStyles.text, isPressed ? inlineStyles.pressedText : inlineStyles.unpressedText]}
    >
      {children}
    </Text>
  )
}

GameButton.propTypes = {
  children: PropTypes.string,
  isPressed: PropTypes.bool,
  onPress: PropTypes.func,
}

function getInlineStyles() {
  const horizontalMargin = 10

  return {
    text: {
      alignItems: "center",
      backgroundColor: "#eee",
      flex: 1,
      fontSize: 30,
      justifyContent: "center",
      marginLeft: horizontalMargin / 2,
      marginRight: horizontalMargin / 2,
      textAlign: "center",
    },
    pressedText: {
      color: "blue",
    },
    unpressedText: {
      color: "black",
    },
  }
}
