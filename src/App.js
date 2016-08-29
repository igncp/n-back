import React from "react"
import {View} from "react-native"

import {AppRouter} from "./AppRouter"
import {appStore} from "./stores/app"
import {bootstrap} from "./services/bootstrap"

const inlineStyles = getInlineStyles()

bootstrap(appStore)

export function App() {

  return (
    <View style={inlineStyles.component}>
      <AppRouter />
    </View>
  )

}

function getInlineStyles() {

  return {
    component: {
      flex: 1,
    },
  }

}
