import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import CategoryPage from "../components/categoryPage"

const CamerasPage = ({ data }) => (
  <Layout>
    <SEO title="Cameras" />
    <CategoryPage title="Cameras" products={data.cameras.nodes} />
  </Layout>
)

export const query = graphql`
  query {
    cameras: allProducts(filter: { fields: { type: { eq: "camera" } } }) {
      nodes {
        fields {
          type
          rating
          productName
          price
          imageID
          slug
        }
      }
    }
  }
`

export default CamerasPage
