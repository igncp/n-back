import React, {PropTypes} from "react"
import {Text, View} from "react-native"
import {range, curry, is} from "ramda"

const inlineStyles = getInlineStyles()

const isNumber = is(Number)

const isTarget = ({rowIndex, colIndex}, target) =>
  (isNumber(target.row) && isNumber(target.col))
  ? (rowIndex === target.row - 1) && (colIndex === target.col - 1)
  : true

const createCellInRow = curry((rowIndex, target, colIndex) => {

  return (
    <View
      key={`col-${colIndex}`}
      style={inlineStyles.cell}
    >
      <Text style={[inlineStyles.cellText, {color: target.color || "black"}]}>
        {isTarget({rowIndex, colIndex}, target) ? target.letter || "x" : ""}
      </Text>
    </View>
  )

})

const createRow = curry((colsArr, target, rowIndex) => {

  return (
    <View
      key={`row-${rowIndex}`}
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      {colsArr.map(createCellInRow(rowIndex, target))}
    </View>
  )

})

export function Grid({cols, rows, target}) {

  const colsArr = range(0, cols)
  const rowsArr = range(0, rows)

  return (
    <View style={{height: 400}}>
      {rowsArr.map(createRow(colsArr, target))}
    </View>
  )

}

Grid.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  target: PropTypes.shape({
    col: PropTypes.number,
    row: PropTypes.number,
  }),
}

function getInlineStyles() {

  return {
    cell: {
      borderColor: "black",
      borderWidth: 1,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
    },
    cellText: {
      fontSize: 30,
    },
  }

}
