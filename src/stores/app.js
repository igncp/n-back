import {observable, action, computed} from "mobx"
import {merge} from "ramda"

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
      if (appStore.currentGame.goodMatches === 0 &&
        appStore.currentGame.badMatches === 0) return 0

      return (
        appStore.currentGame.goodMatches * 100 /
        (appStore.currentGame.badMatches + appStore.currentGame.goodMatches)
      ).toFixed(0)
    }),
  })
}
