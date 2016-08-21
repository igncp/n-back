import React from "react"
import {Text} from "react-native"

import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"

export function Statistics() {
  return (
    <StickyFooterLinksBar
      links={[{
        name: "Dashboard",
        scene: "dashboard",
      }]}
    >
      <Text>Statistics</Text>
    </StickyFooterLinksBar>
  )
}
