import React from "react"
import {Text} from "react-native"

import {appStore} from "../../stores/app"
import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"

export function RoundSummary() {
  return (
    <StickyFooterLinksBar
      links={[{
        name: "Play Again",
        scene: "game",
      }, {
        name: "Dashboard",
        scene: "dashboard",
      }, {
        name: "Statistics",
        scene: "statistics",
      }]}
    >
      <Text>RoundSummary</Text>
      <Text>Your score was: {appStore.currentGame.score.get()}!</Text>
      <Text>({appStore.currentGame.goodMatches} of {appStore.currentGame.badMatches + appStore.currentGame.goodMatches})</Text>
    </StickyFooterLinksBar>
  )
}
