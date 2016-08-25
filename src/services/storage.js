import {AsyncStorage} from "react-native"
import {toJS} from "mobx"
import {always, compose} from "ramda"

const KEY_PREFIX = "@NBack:"

const serialize = compose(
  JSON.stringify,
  toJS // this works fine for variables that are not from mobx
)
const deserialize = JSON.parse

export const save = (key, obj) => AsyncStorage.setItem(`${KEY_PREFIX}${key}`, serialize(obj))

export const load = key => AsyncStorage.getItem(`${KEY_PREFIX}${key}`)
  .then(deserialize)
  .catch(always(null))
