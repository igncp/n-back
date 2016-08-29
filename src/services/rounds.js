import {merge, pick} from "ramda"

import {save, load} from "./storage"

const STORAGE_KEY = "rounds"

const whiteListCurrentGameProps = pick([
  "badMatches",
  "createdAt",
  "goodMatches",
])

const whiteListGameSettings = pick([
  "cols",
  "interval",
  "nBack",
  "rows",
  "turns",
])

export function loadRounds(store) {

  return load(STORAGE_KEY)
    .then((rounds) => store.actions.setRounds(rounds || []))

}

export const saveRounds = (store) => save(STORAGE_KEY, store.rounds.arr)

export const extractDataToPersistInRound = ({currentGame, gameSettings}) => {

  return merge(
    whiteListCurrentGameProps(currentGame),
    {settings: whiteListGameSettings(gameSettings)}
  )

}
