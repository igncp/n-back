import React, {PropTypes} from "react"
import {View} from "react-native"

const inlineStyles = getInlineStyles()

export function HorizontalView({children, style}) {

  return (
    <View
      style={[inlineStyles.component, style]}
    >
      {children}
    </View>
  )

}

HorizontalView.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
}

function getInlineStyles() {

  return {
    component: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
    },
  }

}
