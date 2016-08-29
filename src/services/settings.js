import {merge, clone} from "ramda"

import {save, load} from "./storage"

const STORAGE_KEY = "settings"
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

  return load(STORAGE_KEY)
    .then((settings) => {

      store.actions.setSettings(merge(getDefaultSettings(), settings || {}))

    })

}

export const saveAppSettings = (store) => save(STORAGE_KEY, store.settings)
