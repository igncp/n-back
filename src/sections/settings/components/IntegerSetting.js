import React, {PropTypes} from "react"
import {Text, TextInput, View} from "react-native"
import {observer} from "mobx-react/native"
import {path, last} from "ramda"

import {appStore} from "../../../stores/app"
import {getDefaultSettings} from "../../../services/settings"

const inlineStyles = getInlineStyles()

export const IntegerSetting = observer(({label, propPath}) => {
  const propPathArr = propPath.split(".")
  const value = path(propPathArr, appStore.settings)

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(newValue) => {
          const newGameSettings = {[last(propPathArr)]: Number(newValue) || path(propPathArr, getDefaultSettings())}

          appStore.actions.updateGameSettings(newGameSettings)
        }}
        style={inlineStyles.textInput}
        value={String(value)}
      />
    </View>
  )
})

IntegerSetting.propTypes = {
  label: PropTypes.string,
  propPath: PropTypes.string,
}

function getInlineStyles() {
  return {
    textInput: {
      height: 30,
    },
  }
}
