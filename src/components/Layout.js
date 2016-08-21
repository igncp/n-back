import React, {PropTypes} from "react"
import {View} from "react-native"

const inlineStyles = getInlineStyles()

export function Layout({children}) {
  return (
    <View style={inlineStyles.component}>
      {children}
    </View>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export const addLayout = Component => function(props) {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}

function getInlineStyles() {
  return {
    component: {
      marginTop: 20,
      flex: 1,
    },
  }
}
