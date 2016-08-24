import {AsyncStorage} from "react-native"
import {toJS} from "mobx"
import {merge, compose, clone} from "ramda"

const serialize = compose(JSON.stringify, toJS)
const deserialize = JSON.parse

const DEFAULT_SETTINGS = {
  game: {
    backTypes: ["LETTER", "POSITION", "COLOR"],
    cols: 3,
    interval: 1000,
    nBack: 2,
    rows: 3,
    shouldShowScore: false,
    turns: 20,
  },
}

export const getDefaultSettings = () => clone(DEFAULT_SETTINGS)

export function loadAppSettings(store) {
  return AsyncStorage.getItem("@NBack:settings")
    .then(settingsStr => {
      const settings = deserialize(settingsStr)

      store.actions.setSettings(merge(getDefaultSettings(), settings || {}))
    })
    .catch(() => store.actions.setSettings(getDefaultSettings()))
}

export function saveAppSettings(store) {
  const settingsJSON = serialize(store.settings)

  return AsyncStorage.setItem("@NBack:settings", settingsJSON)
}
