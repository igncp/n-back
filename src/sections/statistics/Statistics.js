import React from "react"
import {Alert, Text, View} from "react-native"
import {observer} from "mobx-react/native"
import {keys, reduce, compose, groupBy} from "ramda"

import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {appStore} from "../../stores/app"
import {getDateFromTimestamp} from "../../services/time"
import {Button} from "../../components/Button"

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

  const rounds = appStore.rounds.arr.slice().reverse()
  const nBackGroups = groupRoundsByNBack(rounds)

  return (
    <StickyFooterLinksBar
      links={[{
        name: "Dashboard",
        scene: "dashboard",
      }]}
    >
      <Text>Statistics</Text>
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
          <Text>NBack rounds:</Text>
          <View>{keys(nBackGroups).map((nBackGroupKey, index) => {

            return (
              <Text key={index}>{`${nBackGroupKey} back: ${nBackGroups[nBackGroupKey]
                .length} rounds / ${rounds.length} total rounds`}</Text>
            )

          })}</View>
          <View>
            <Button onPress={displayConfirmation}>Clear Rounds</Button>
          </View>
        </View>
      )}
    </StickyFooterLinksBar>
  )

})
