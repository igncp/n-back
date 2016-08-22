import React, {PropTypes} from "react"
import {View} from "react-native"

const inlineStyles = getInlineStyles()

export function VerticalView({children, style}) {
  return (
    <View
      style={[inlineStyles.component, style]}
    >
      {children}
    </View>
  )
}

VerticalView.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
}

function getInlineStyles() {
  return {
    component: {
      alignItems:"center",
      flexDirection: "column",
    },
  }
}
