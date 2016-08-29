import React from "react"
import {Text, View} from "react-native"

import {appStore} from "../../stores/app"
import {getDefaultSettings} from "../../services/settings"
import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {Button} from "../../components/Button"

import {BooleanSetting} from "./components/BooleanSetting"
import {IntegerSetting} from "./components/IntegerSetting"

const resetDefaultSettings = () => appStore.actions.setSettings(getDefaultSettings())

export const Settings = () => {

  return (
    <StickyFooterLinksBar
      links={[{
        name: "Dashboard",
        scene: "dashboard",
      }]}
    >
      <Text>Settings</Text>
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

        <View>
          <Button
            onPress={resetDefaultSettings}
          >Reset defaults</Button>
        </View>
      </View>
    </StickyFooterLinksBar>
  )

}
