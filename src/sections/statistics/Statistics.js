import React from "react"
import {Text, View} from "react-native"
import {observer} from "mobx-react/native"
import {keys, reduce, compose} from "ramda"

import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {appStore} from "../../stores/app"
import {getDateFromTimestamp} from "../../services/time"
import {Button} from "../../components/Button"

const sumKeys = obj => compose(reduce((acc, key) => acc + obj[key], 0), keys)(obj)

export const Statistics = observer(() => {
  const rounds = appStore.rounds.arr.slice().reverse()

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
            <Text>{getDateFromTimestamp(round.createdAt)} - Score: {(goodMatches * 100 / (goodMatches + sumKeys(round.badMatches))).toFixed(0)}%</Text>
          </View>
        )
      })}</View>
      <View>
        <Button
          onPress={() => appStore.actions.setRounds([])}
        >Clear Rounds</Button>
      </View>
    </StickyFooterLinksBar>
  )
})
