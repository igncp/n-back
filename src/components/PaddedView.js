import React, {PropTypes} from "react"
import {View} from "react-native"
import {compose, ifElse, identity, merge} from "ramda"

const inlineStyles = getInlineStyles()

const createPaddingStyle = ({horizontal, vertical, padding}) => compose(
  ifElse(() => vertical === true, merge({paddingTop: padding, paddingBottom: padding}), identity),
  ifElse(() => horizontal === true, merge({paddingLeft: padding, paddingRight: padding}), identity)
)({})

export function PaddedView({children, padding, vertical, horizontal}) {

  const paddingStyle = createPaddingStyle({horizontal, vertical, padding})

  return (
    <View style={[inlineStyles.component, paddingStyle]}>
      {children}
    </View>
  )

}

PaddedView.propTypes = {
  children: PropTypes.node.isRequired,
  horizontal: PropTypes.bool,
  padding: PropTypes.number,
  vertical: PropTypes.bool,
}

PaddedView.defaultProps = {
  padding: 10,
  horizontal: true,
  vertical: true,
}

function getInlineStyles() {

  return {
    component: {
      flex: 1,
    },
  }

}
