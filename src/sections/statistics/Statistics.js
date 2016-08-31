import React from "react"
import {Alert, Text, View} from "react-native"
import {observer} from "mobx-react/native"
import {keys, reduce, compose, groupBy} from "ramda"

import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {appStore} from "../../stores/app"
import {getDateFromTimestamp} from "../../services/time"
import {Button} from "../../components/Button"
import {PaddedView} from "../../components/PaddedView"
import {SectionTitle} from "../../components/SectionTitle"

const sumKeys = (obj) => compose(reduce((acc, key) => acc + obj[key], 0), keys)(obj)
const groupRoundsByNBack = groupBy((round) => round.settings.nBack)

const displayConfirmation = () => {

  Alert.alert(
    "",
    "Are you sure? This can not be undone",
    [
      {text: "Cancel", onPress: () => null, style: "cancel"},
      {text: "Yes", onPress: () => appStore.actions.setRounds([])},
    ]
  )

}

export const Statistics = observer(() => {

  const rounds = appStore.rounds.slice().reverse()
  const nBackGroups = groupRoundsByNBack(rounds)

  return (
    <StickyFooterLinksBar
      links={[{
        name: "Dashboard",
        scene: "dashboard",
      }]}
    >
      <PaddedView>
        <SectionTitle>Statistics</SectionTitle>
        <Text>Rounds: {rounds.length}</Text>
        <View>{rounds.map((round, index) => {

          const goodMatches = sumKeys(round.goodMatches)

          return (
            <View key={index}>
              <Text>{getDateFromTimestamp(round.createdAt)} - Score: {(goodMatches * 100 /
                (goodMatches + sumKeys(round.badMatches))).toFixed(0)}%</Text>
            </View>
          )

        })}</View>
        {rounds.length > 0 && (
          <View>
            <PaddedView horizontal={false}>
              <Text>NBack rounds:</Text>
              <View>{keys(nBackGroups).map((nBackGroupKey, index) => {

                return (
                  <Text key={index}>{`${nBackGroupKey} back: ${nBackGroups[nBackGroupKey]
                    .length} rounds / ${rounds.length} total rounds`}</Text>
                )

              })}</View>
            </PaddedView>
            <View>
              <Button onPress={displayConfirmation}>Clear Rounds</Button>
            </View>
          </View>
        )}
      </PaddedView>
    </StickyFooterLinksBar>
  )

})
