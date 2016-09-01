import React from "react"
import {View, Text, Switch, Alert} from "react-native"
import {observer} from "mobx-react/native"
import {keys, remove} from "ramda"

import {appStore} from "../../stores/app"
import {getDefaultSettings} from "../../services/settings"
import {availableBackTypes} from "../../services/available-back-types"
import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {Button} from "../../components/Button"
import {PaddedView} from "../../components/PaddedView"
import {SectionTitle} from "../../components/SectionTitle"

import {BooleanSetting} from "./components/BooleanSetting"
import {IntegerSetting} from "./components/IntegerSetting"

const displayConfirmation = () => {

  Alert.alert(
    "",
    "Are you sure? This can not be undone",
    [
      {text: "Cancel", onPress: () => null, style: "cancel"},
      {text: "Yes", onPress: resetDefaultSettings},
    ]
  )

}

const resetDefaultSettings = () => appStore.actions.setSettings(getDefaultSettings())

const createAvailableTypeControl = (availableBackType) => {

  const indexOfType = appStore.settings.game.backTypes.indexOf(availableBackType)
  const isOnlyActiveType = appStore.settings.game.backTypes.length === 1 && indexOfType !== -1

  return (
    <View key={availableBackType}>
      <Text>{availableBackTypes[availableBackType].name}</Text>
      <Switch
        disabled={isOnlyActiveType}
        onValueChange={() => {

          if (indexOfType === -1) {

            appStore.actions.updateGameSettings({
              backTypes: appStore.settings.game.backTypes.concat([availableBackType]),
            })

          } else {

            appStore.actions.updateGameSettings({
              backTypes: remove(indexOfType, 1, appStore.settings.game.backTypes),
            })

          }

        }}
        value={indexOfType !== -1}
      />
    </View>
  )

}

export const Settings = observer(() => {

  return (
    <StickyFooterLinksBar
      links={[{
        name: "Dashboard",
        scene: "dashboard",
      }]}
    >
      <PaddedView>
        <SectionTitle>Settings</SectionTitle>
        <View>
          <BooleanSetting
            label="Show the score during the game"
            propPath="game.shouldShowScore"
          />

          <IntegerSetting
            label="Turns per game"
            propPath="game.turns"
          />

          <IntegerSetting
            label="Miliseconds per turn"
            propPath="game.interval"
          />

          <IntegerSetting
            label="N back"
            propPath="game.nBack"
          />

          <IntegerSetting
            label="Columns"
            propPath="game.cols"
          />

          <IntegerSetting
            label="Rows"
            propPath="game.rows"
          />

          <PaddedView horizontal={false}>
            <Text>N-Back Types:</Text>
            <View>{keys(availableBackTypes).map(createAvailableTypeControl)}</View>
          </PaddedView>

          <View>
            <Button
              onPress={displayConfirmation}
            >Reset defaults</Button>
          </View>
        </View>
      </PaddedView>
    </StickyFooterLinksBar>
  )

})
