import React, {PropTypes, Component} from "react"
import {Text, TextInput, View} from "react-native"
import {observe} from "mobx"
import {path, last} from "ramda"

import {appStore} from "../../../stores/app"
import {getDefaultSettings} from "../../../services/settings"

const inlineStyles = getInlineStyles()

/**
 * This component saves an internal value and gets
 * synced whenever the component is blur or the store
 * updates
 */
export class IntegerSetting extends Component {
  constructor(props) {

    super()

    const propPathArr = props.propPath.split(".")

    this.state = {
      value: path(propPathArr, appStore.settings),
    }

  }

  componentWillMount() {

    this.unobserveSettings = observe(appStore, "settings", () => {

      const propPathArr = this.props.propPath.split(".")

      this.setState({
        value: path(propPathArr, appStore.settings),
      })

    })

  }

  componentWillUnmount() {

    this.unobserveSettings()

  }

  handleBlur = () => {

    const propPathArr = this.props.propPath.split(".")
    const newGameSettings = {[last(propPathArr)]: Number(this.state.value) || path(propPathArr, getDefaultSettings())}

    appStore.actions.updateGameSettings(newGameSettings)

  }

  render() {

    const {label} = this.props

    return (
      <View>
        <Text>{label}</Text>
        <TextInput
          keyboardType="numeric"
          onBlur={this.handleBlur}
          onChangeText={(value) => this.setState({value})}
          style={inlineStyles.textInput}
          value={String(this.state.value)}
        />
      </View>
    )

  }
}

IntegerSetting.propTypes = {
  label: PropTypes.string,
  propPath: PropTypes.string,
}

function getInlineStyles() {

  return {
    textInput: {
      height: 30,
    },
  }

}
