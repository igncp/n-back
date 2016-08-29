import React, {PropTypes} from "react"

import {StickyFooter} from "./StickyFooter"
import {FooterLink} from "./FooterLink"

const inlineStyles = getInlineStyles()

export function StickyFooterLinksBar({children, links}) {

  return (
    <StickyFooter
      footerChildren={links.map(({name, scene}, index) => (
        <FooterLink
          key={`link-${index}`}
          name={name}
          scene={scene}
        />
      ))}
      footerExtraStyles={inlineStyles.footer}
    >
      {children}
    </StickyFooter>
  )

}

StickyFooterLinksBar.propTypes = {
  children: PropTypes.node,
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    scene: PropTypes.string,
  })),
}

function getInlineStyles() {

  return {
    footer: {
      flexDirection: "row",
      height: 40,
      alignItems: "center",
    },
  }

}
