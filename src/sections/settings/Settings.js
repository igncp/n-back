import React from "react"
import {Text} from "react-native"

import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"

export function Settings() {
  return (
    <StickyFooterLinksBar
      links={[{
        name: "Dashboard",
        scene: "dashboard",
      }]}
    >
      <Text>Settings</Text>
    </StickyFooterLinksBar>
  )
}
