import React, {PropTypes} from "react"
import {ScrollView, View} from "react-native"
import {merge} from "ramda"

const inlineStyles = getInlineStyles()

export function StickyFooter({children, footerChildren, footerExtraStyles}) {

  return (
    <View style={inlineStyles.component}>
      <ScrollView>
        {children}
      </ScrollView>
      <View style={merge(inlineStyles.footer, footerExtraStyles || {})}>
        {footerChildren}
      </View>
    </View>
  )

}

StickyFooter.propTypes = {
  children: PropTypes.node,
  footerChildren: PropTypes.node,
  footerExtraStyles: PropTypes.object,
}

function getInlineStyles() {

  return {
    component: {
      flex: 1,
      flexDirection: "column",
    },
    footer: {
      position: "absolute",
      flex: 0.1,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }

}
