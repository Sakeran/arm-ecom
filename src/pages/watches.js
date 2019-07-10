import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import CategoryPage from "../components/categoryPage"

const WatchesPage = ({ data }) => (
  <Layout>
    <SEO title="Watches" />
    <CategoryPage title="Watches" products={data.watches.nodes} />
  </Layout>
)

export const query = graphql`
  query {
    watches: allProducts(filter: { fields: { type: { eq: "watch" } } }) {
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

export default WatchesPage
