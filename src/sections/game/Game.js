import React, {Component} from "react"
import {Text, View} from "react-native"
import {observer} from "mobx-react/native"
import {Actions} from "react-native-router-flux"
import {merge, compose, reduce, pluck, flip, prop, map} from "ramda"

import {appStore} from "../../stores/app"
import {availableBackTypes} from "../../services/available-back-types"
import {getCurrentTimestamp} from "../../services/time"
import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {HorizontalView} from "../../components/HorizontalView"
import {Button} from "../../components/Button"

import {Grid} from "./components/Grid"
import {createTargetsRange} from "./services/targets-manager"

const getGenerators = compose(
  pluck("generate"),
  map(flip(prop)(availableBackTypes))
)

const generateMatches = arr => reduce((obj, key) => merge(obj, {[key]: 0}), {}, arr)

@observer
export class Game extends Component {
  constructor() {
    super()

    const {turns, backTypes} = appStore.settings.game

    appStore.actions.setCurrentGame({
      goodMatches: generateMatches(backTypes),
      badMatches: generateMatches(backTypes),
      createdAt: getCurrentTimestamp(),
      targets: createTargetsRange({
        number: turns,
        args: appStore.settings.game,
        generators: getGenerators(backTypes),
      }),
      turn: 1,
      checksDuringTurn: {},
    })
  }

  componentWillMount() {
    const {turns, interval} = appStore.settings.game

    this.intervalId = setInterval(() => {
      const {turn, badMatches, checksDuringTurn} = appStore.currentGame
      const {backTypes} = appStore.settings.game

      const newBadMatches = reduce((acc, backType) => {
        return !checksDuringTurn[backType] && this.doesTargetMatchOfType(backType)
          ? merge(acc, {[backType]: badMatches[backType] + 1})
          : acc
      }, badMatches, backTypes)

      if (turn === turns) {
        appStore.actions.updateCurrentGame({
          badMatches: newBadMatches,
        })
        this.finishGame()
        Actions.roundSummary()
      } else {
        appStore.actions.updateCurrentGame({
          badMatches: newBadMatches,
          turn: appStore.currentGame.turn + 1,
          checksDuringTurn: {},
        })
      }
    }, interval)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  finishGame() {
    clearInterval(this.intervalId)
    appStore.actions.concatRounds(appStore.currentGame)
  }

  doesTargetMatchOfType = (backType) => {
    const {nBack} = appStore.settings.game

    const currentTarget = appStore.currentGame.targets[appStore.currentGame.turn - 1]
    const previousTarget = appStore.currentGame.targets[appStore.currentGame.turn - 1 - nBack]

    if (!previousTarget) return false

    return availableBackTypes[backType].doTargetsMatch({currentTarget, previousTarget})
  }

  handleBackTypeClick = (type) => {
    const {goodMatches, badMatches} = appStore.currentGame

    if (appStore.currentGame.checksDuringTurn[type]) return

    const newChecksDuringTurn = merge(appStore.currentGame.checksDuringTurn, {[type]: true})

    if (this.doesTargetMatchOfType(type)) {
      appStore.actions.updateCurrentGame({
        goodMatches: merge(goodMatches, {[type]: goodMatches[type] + 1}),
        checksDuringTurn: newChecksDuringTurn,
      })
    } else {
      appStore.actions.updateCurrentGame({
        badMatches: merge(badMatches, {[type]: badMatches[type] + 1}),
        checksDuringTurn: newChecksDuringTurn,
      })
    }
  }

  render() {
    const {cols, rows, turns, backTypes, nBack, shouldShowScore} = appStore.settings.game
    const currentTarget = appStore.currentGame.targets[appStore.currentGame.turn - 1]

    return (
      <StickyFooterLinksBar
        links={[{
          name: "Go Back",
          scene: "dashboard",
        }]}
      >
        {shouldShowScore && (
          <Text>Score: {appStore.currentGame.score.get()}</Text>
        )}
        <Text>{nBack} Back</Text>
        <Text>Turn: {appStore.currentGame.turn} / {turns}</Text>
        <View style={{marginBottom: 20}}>
          {currentTarget ? (
            <Grid
              cols={cols}
              rows={rows}
              target={currentTarget}
            />
          ) : null}
        </View>
        <HorizontalView>
          {backTypes.map((backType) => {
            return (
              <Button
                isPressed={appStore.currentGame.checksDuringTurn[backType]}
                key={backType}
                onPress={() => this.handleBackTypeClick(backType)}
              >{availableBackTypes[backType].name}</Button>
            )
          })}
        </HorizontalView>
      </StickyFooterLinksBar>
    )
  }
}
