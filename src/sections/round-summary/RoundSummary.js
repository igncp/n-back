import React from "react"
import {Text} from "react-native"

import {appStore} from "../../stores/app"
import {availableBackTypes} from "../../services/available-back-types"
import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {PaddedView} from "../../components/PaddedView"
import {SectionTitle} from "../../components/SectionTitle"

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
      <PaddedView>
        <SectionTitle>Summary of the round</SectionTitle>
        <PaddedView horizontal={false}>
          <Text>Your score was: {appStore.currentGame.score.get()}!</Text>
        </PaddedView>
        {backTypes.map((typesKey) => {

          return (
            <Text
              key={typesKey}
            >{availableBackTypes[typesKey].name}: {getTypeScoreStr(typesKey)}</Text>
          )

        })}
      </PaddedView>
    </StickyFooterLinksBar>
  )

}
