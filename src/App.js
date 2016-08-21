import React from "react"
import {View} from "react-native"

import {AppRouter} from "./AppRouter"
import {appStore} from "./stores/app"
import {loadAppSettings} from "./services/load-app-settings"

const inlineStyles = getInlineStyles()

loadAppSettings(appStore)

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
