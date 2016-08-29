import React from "react"
import {Text} from "react-native"

import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"

export function Dashboard() {

  return (
    <StickyFooterLinksBar
      links={[{
        name: "Play",
        scene: "game",
      }, {
        name: "Settings",
        scene: "settings",
      }, {
        name: "Statistics",
        scene: "statistics",
      }]}
    >
      <Text>Dashboard</Text>
    </StickyFooterLinksBar>
  )

}
