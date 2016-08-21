import {range} from "ramda"

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min
}

const createTarget = ({cols, rows}) => {
  return {
    col: getRandomArbitrary(1, cols),
    row: getRandomArbitrary(1, rows),
  }
}

export const createTargetsRange = ({cols, rows, number}) => {
  return range(0, number).map(() => createTarget({cols, rows}))
}
