import {expect} from "chai"
import {keys} from "ramda"

import {availableBackTypes} from "../available-back-types"

describe("availableBackTypes", () => {
  it("has the expected structure", () => {
    expect(availableBackTypes).to.be.an("object")
  })

  it("types have the expected structure", () => {
    keys(availableBackTypes).map((key) => {
      expect(availableBackTypes[key]).to.have.all.keys(["generate", "doTargetsMatch", "key", "name"])
    })
  })
})
