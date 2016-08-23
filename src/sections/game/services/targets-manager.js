import {range, reduce, merge} from "ramda"

export const createTargetsRange = ({number, args, generators}) => {
  return range(0, number).map(() => {
    return reduce((targetAcc, generator) => merge(targetAcc, generator(args)), {}, generators)
  })
}
