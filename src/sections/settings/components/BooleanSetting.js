import React, {PropTypes} from "react"
import {Text, Switch, View} from "react-native"
import {observer} from "mobx-react/native"
import {path, last} from "ramda"

import {appStore} from "../../../stores/app"

export const BooleanSetting = observer(({label, propPath}) => {

  const propPathArr = propPath.split(".")
  const value = path(propPathArr, appStore.settings)

  return (
    <View>
      <Text>{label}</Text>
      <Switch
        onValueChange={() => {

          if (propPathArr[0] === "game") appStore.actions.updateGameSettings({[last(propPathArr)]: !value})

        }}
        value={value}
      />
    </View>
  )

})

BooleanSetting.propTypes = {
  label: PropTypes.string,
  propPath: PropTypes.string,
}
