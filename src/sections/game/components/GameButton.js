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
  const verticalPadding = 20

  return {
    text: {
      alignItems: "center",
      alignSelf: "stretch",
      backgroundColor: "#eee",
      flex: 1,
      justifyContent: "center",
      paddingBottom: verticalPadding / 2,
      paddingTop: verticalPadding / 2,
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
