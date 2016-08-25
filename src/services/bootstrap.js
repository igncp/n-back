import {observe} from "mobx"

import {appStore} from "../stores/app"
import {loadAppSettings, saveAppSettings} from "../services/settings"
import {loadRounds, saveRounds} from "../services/rounds"

const observeSettings = () => observe(appStore.settings, () => saveAppSettings(appStore))
const observeRounds = () => observe(appStore.rounds, () => saveRounds(appStore))

export function bootstrap() {
  return Promise.all([
    loadAppSettings(appStore).then(observeSettings),
    loadRounds(appStore).then(observeRounds),
  ])
}
