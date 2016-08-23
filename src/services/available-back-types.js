import {merge, mapObjIndexed} from "ramda"

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min
}

const getRandomItem = arr => arr[Math.floor(Math.random()* arr.length)]

const availableBackTypesRaw = {
  POSITION: {
    name: "Position",
    doTargetsMatch({currentTarget, previousTarget}) {
      return (currentTarget.col === previousTarget.col && currentTarget.row === previousTarget.row)
    },
    generate({cols, rows}) {
      return {
        col: getRandomArbitrary(1, cols),
        row: getRandomArbitrary(1, rows),
      }
    },
  },
  LETTER: {
    name: "Letter",
    doTargetsMatch({currentTarget, previousTarget}) {
      return currentTarget.letter === previousTarget.letter
    },
    generate() {
      return {
        letter: getRandomItem(["a", "b", "c", "d"]),
      }
    },
  },
  COLOR: {
    name: "Color",
    doTargetsMatch({currentTarget, previousTarget}) {
      return currentTarget.color === previousTarget.color
    },
    generate() {
      return {
        color: getRandomItem(["red", "blue", "green", "black", "purple"]),
      }
    },
  },
}

const addKeysToObject = mapObjIndexed((value, key) => merge(value, {key}))

export const availableBackTypes = addKeysToObject(availableBackTypesRaw)
