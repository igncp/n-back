import React from "react"
import {Scene, Router, ActionConst} from "react-native-router-flux"

import {addLayout} from "./components/Layout"

import {Dashboard} from "./sections/dashboard/Dashboard"
import {Game} from "./sections/game/Game"
import {Settings} from "./sections/settings/Settings"
import {Statistics} from "./sections/statistics/Statistics"
import {RoundSummary} from "./sections/round-summary/RoundSummary"

const {REPLACE} = ActionConst

export function AppRouter() {
  return (
    <Router>
      <Scene
        hideNavBar
        key="root"
      >
        <Scene
          component={addLayout(Dashboard)}
          initial
          key="dashboard"
          type={REPLACE}
        />
        <Scene
          component={addLayout(Game)}
          key="game"
          type={REPLACE}
        />
        <Scene
          component={addLayout(Settings)}
          key="settings"
          type={REPLACE}
        />
        <Scene
          component={addLayout(RoundSummary)}
          key="roundSummary"
          type={REPLACE}
        />
        <Scene
          component={addLayout(Statistics)}
          key="statistics"
          type={REPLACE}
        />
      </Scene>
    </Router>
  )
}
