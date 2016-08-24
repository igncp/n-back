import React from "react"
import {View} from "react-native"
import {observe} from "mobx"

import {AppRouter} from "./AppRouter"
import {appStore} from "./stores/app"
import {loadAppSettings, saveAppSettings} from "./services/app-settings-manager"

const inlineStyles = getInlineStyles()

loadAppSettings(appStore)
  .then(() => {
    observe(appStore.settings, () => saveAppSettings(appStore))
  })

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
