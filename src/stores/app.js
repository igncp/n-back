import {observable, action, computed} from "mobx"
import {merge, keys, reduce} from "ramda"

export const appStore = {
  @observable currentGame: null,
  @observable settings: null,
}

appStore.actions = {
  @action setCurrentGame: game => appStore.currentGame = populateCurrentGame(game),
  @action updateCurrentGame: game => appStore.currentGame = merge(appStore.currentGame, game),
  @action setSettings: settings => appStore.settings = settings,
}

function populateCurrentGame(game) {
  return merge(game, {
    score: computed(() => {
      const typesKeys = keys(appStore.currentGame.goodMatches)
      const allGoodMatches = reduce((sum, key) => appStore.currentGame.goodMatches[key] + sum, 0, typesKeys)
      const allBadMatches = reduce((sum, key) => appStore.currentGame.badMatches[key] + sum, 0, typesKeys)

      if (allGoodMatches === 0 && allBadMatches === 0) return 0

      return (
        allGoodMatches * 100 / (allGoodMatches + allBadMatches)
      ).toFixed(0)
    }),
  })
}
