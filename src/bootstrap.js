import React from "react"
import {AppRegistry} from "react-native"

import {App} from "./App"

function Root() {

  return <App {...this.props} />

}

export function bootstrap() {

  AppRegistry.registerComponent("NBack", () => Root)

}
