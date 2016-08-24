import React from "react"
import {Text} from "react-native"

import {appStore} from "../../stores/app"
import {availableBackTypes} from "../../services/available-back-types"
import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"

function getTypeScoreStr(type) {
  const {goodMatches, badMatches} = appStore.currentGame

  if (goodMatches[type] === 0 && badMatches[type] === 0) return "-"

  return `${goodMatches[type]} good of ${goodMatches[type] + badMatches[type]}`
}

export function RoundSummary() {
  const {backTypes} = appStore.settings.game

  return (
    <StickyFooterLinksBar
      links={[{
        name: "Play Again",
        scene: "game",
      }, {
        name: "Dashboard",
        scene: "dashboard",
      }, {
        name: "Settings",
        scene: "settings",
      }, {
        name: "Statistics",
        scene: "statistics",
      }]}
    >
      <Text>Summary of the round:</Text>
      <Text>Your score was: {appStore.currentGame.score.get()}!</Text>
      {backTypes.map((typesKey) => {
        return (
          <Text
            key={typesKey}
          >{availableBackTypes[typesKey].name}: {getTypeScoreStr(typesKey)}</Text>
        )
      })}
    </StickyFooterLinksBar>
  )
}
