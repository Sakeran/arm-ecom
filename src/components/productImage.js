/**
 * "Smart" image that displays the correct image given a product type
 *  and image ID - e.g. ("phone", 3)
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const staticQuery = graphql`
  query AllProductImages {
    allFile(filter: { relativePath: { glob: "products/**/*.jpg" } }) {
      nodes {
        name
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

const getSingleImage = (type, imageId, data) => {
  const toFind = `${type}${imageId}`
  const node = data.allFile.nodes.find(({ name }) => name === toFind)

  return node.childImageSharp.fluid
}

export default ({ type, imageId, alt, className }) => (
  <StaticQuery
    query={staticQuery}
    render={data => (
      <Img
        className={className}
        fluid={getSingleImage(type, imageId, data)}
        alt={alt || ""}
      />
    )}
  />
)
