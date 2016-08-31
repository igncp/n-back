import React, {PropTypes} from "react"
import {View} from "react-native"
import Btn from "react-native-button"
import {merge} from "ramda"

const inlineStyles = getInlineStyles()

export function Button({
  children, isPressed, isPressedColor, onPress,
}) {

  return (
    <View style={inlineStyles.component}>
      <Btn
        onPress={onPress}
        style={[inlineStyles.text, isPressed
          ? merge(inlineStyles.pressedText, {color: isPressedColor})
          : inlineStyles.unpressedText]
        }
      >
        {children}
      </Btn>
    </View>
  )

}

Button.propTypes = {
  children: PropTypes.string,
  isPressed: PropTypes.bool,
  isPressedColor: PropTypes.string,
  onPress: PropTypes.func,
}

Button.defaultProps = {
  isPressed: false,
  isPressedColor: "blue",
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
    unpressedText: {
      color: "black",
    },
  }

}
