import React, {PropTypes} from "react"
import {Text} from "react-native"

const inlineStyles = getInlineStyles()

export function SectionTitle({children}) {

  return (
    <Text style={inlineStyles.text}>{children}</Text>
  )

}

SectionTitle.propTypes = {
  children: PropTypes.node,
}

function getInlineStyles() {

  return {
    text: {
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 10,
    },
  }

}
