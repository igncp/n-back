export function loadAppSettings(store) {
  // TODO - Persist and load these settings
  store.actions.setSettings({
    game: {
      rows: 3,
      cols: 3,
      turns: 20,
      interval: 1000,
      nBack: 2,
    },
  })
}
