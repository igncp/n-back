import React, {Component} from "react"
import {Text, View} from "react-native"
import {observer} from "mobx-react/native"
import {Actions} from "react-native-router-flux"

import {appStore} from "../../stores/app"
import {StickyFooterLinksBar} from "../../components/StickyFooterLinksBar"
import {VerticalView} from "../../components/VerticalView"

import {Grid} from "./components/Grid"
import {GameButton} from "./components/GameButton"
import {createTargetsRange} from "./services/targets-manager"

@observer
export class Game extends Component {
  constructor() {
    super()

    const {rows, cols, turns} = appStore.settings.game

    appStore.actions.setCurrentGame({
      goodMatches: 0,
      badMatches: 0,
      targets: createTargetsRange({rows, cols, number: turns}),
      turn: 1,
      didCheckDuringTurn: false,
    })
  }

  componentWillMount() {
    const {turns, interval} = appStore.settings.game

    this.intervalId = setInterval(() => {
      const {turn, badMatches, didCheckDuringTurn} = appStore.currentGame

      const newBadMatches = this.doesCurrentTargetMatch() && !didCheckDuringTurn
        ? badMatches + 1
        : badMatches

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
          didCheckDuringTurn: false,
        })
      }
    }, interval)
  }

  componentWillUnmount() {
    this.finishGame()
  }

  finishGame() {
    clearInterval(this.intervalId)
  }

  doesCurrentTargetMatch = () => {
    const {nBack} = appStore.settings.game

    const currentTarget = appStore.currentGame.targets[appStore.currentGame.turn - 1]
    const previousTarget = appStore.currentGame.targets[appStore.currentGame.turn - 1 - nBack]

    if (!previousTarget) return false

    return (currentTarget.col === previousTarget.col && currentTarget.row === previousTarget.row)
  }

  handlePositionClick = () => {
    if (appStore.currentGame.didCheckDuringTurn) return

    if (this.doesCurrentTargetMatch()) {
      appStore.actions.updateCurrentGame({
        goodMatches: appStore.currentGame.goodMatches + 1,
        didCheckDuringTurn: true,
      })
    } else {
      appStore.actions.updateCurrentGame({
        badMatches: appStore.currentGame.badMatches + 1,
        didCheckDuringTurn: true,
      })
    }
  }

  render() {
    const {cols, rows, turns} = appStore.settings.game
    const currentTarget = appStore.currentGame.targets[appStore.currentGame.turn - 1]

    return (
      <StickyFooterLinksBar
        links={[{
          name: "Go Back",
          scene: "dashboard",
        }]}
      >
        <Text>Game</Text>
        <Text>Score: {appStore.currentGame.score.get()}</Text>
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
        <VerticalView>
          <GameButton
            isPressed={appStore.currentGame.didCheckDuringTurn}
            onPress={this.handlePositionClick}
          >Position</GameButton>
        </VerticalView>
      </StickyFooterLinksBar>
    )
  }
}
