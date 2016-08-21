import {expect} from "chai"

import {createTargetsRange} from "../targets-manager"

describe("createTargetsRange", () => {
  const number = 10
  const cols = 2
  const rows = 4

  beforeEach(() => {
    this.targetsRange = createTargetsRange({cols, rows, number})
  })

  it("creates the expected number", () => {
    expect(this.targetsRange.length).to.eql(number)
  })

  it("all the targets have the expected shape", () => {
    this.targetsRange.map((target) => {
      expect(target).to.have.keys(["col", "row"])
    })
  })

  it("all the have the correct col and row number", () => {
    this.targetsRange.map((target) => {
      expect(target.row >= 1 && target.row <= rows).to.eql(true)
      expect(target.col >= 1 && target.col <= cols).to.eql(true)
    })
  })
})
