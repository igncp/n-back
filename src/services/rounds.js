import {save, load} from "./storage"

const STORAGE_KEY = "rounds"

export function loadRounds(store) {
  return load(STORAGE_KEY)
    .then(rounds => store.actions.setRounds(rounds || []))
}

export const saveRounds = (store) => save(STORAGE_KEY, store.rounds.arr)
