import React, {PropTypes} from "react"
import {View} from "react-native"
import Btn from "react-native-button"

const inlineStyles = getInlineStyles()

export function Button({
  children, isPressed, onPress,
}) {

  return (
    <View style={inlineStyles.component}>
      <Btn
        onPress={onPress}
        style={[inlineStyles.text, isPressed ? inlineStyles.pressedText : inlineStyles.unpressedText]}
      >
        {children}
      </Btn>
    </View>
  )

}

Button.propTypes = {
  children: PropTypes.string,
  isPressed: PropTypes.bool,
  onPress: PropTypes.func,
}

Button.defaultPropTypes = {
  isPressed: false,
}

function getInlineStyles() {

  const horizontalMargin = 10
  const verticalPadding = 10

  return {
    component: {
      alignItems: "center",
      alignItems: "stretch",
      flex: 1,
      justifyContent: "center",
      marginLeft: horizontalMargin / 2,
      marginRight: horizontalMargin / 2,
    },
    text: {
      paddingTop: verticalPadding / 2,
      paddingBottom: verticalPadding / 2,
      borderColor: "#eee",
      borderWidth: 2,
      fontSize: 20,
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
