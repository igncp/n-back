import {observe} from "mobx"

import {loadAppSettings, saveAppSettings} from "../services/settings"
import {loadRounds, saveRounds} from "../services/rounds"

const observeSettings = (store) => () => observe(store, "settings", () => saveAppSettings(store))
const observeRounds = (store) => () => observe(store, "rounds", () => saveRounds(store))

export function bootstrap(store) {

  return Promise.all([
    loadAppSettings(store).then(observeSettings(store)),
    loadRounds(store).then(observeRounds(store)),
  ])

}
