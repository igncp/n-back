import React from "react"
import {View, Text} from "react-native"

import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {SectionTitle} from "../../components/SectionTitle"
import {PaddedView} from "../../components/PaddedView"

const inlineStyles = getInlineStyles()

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
      <View style={inlineStyles.alignedView}>
        <SectionTitle style={inlineStyles.logo}>N-Back</SectionTitle>
        <PaddedView>
          <Text>This is a memory game that consist in detecting the repetition in certain features
            (position, color, etc.) with a gap of n steps.</Text>
        </PaddedView>
      </View>
    </StickyFooterLinksBar>
  )

}

function getInlineStyles() {

  return {
    alignedView: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
  }

}
