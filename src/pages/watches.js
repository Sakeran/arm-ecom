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
    watches: allProductDataWatches {
      nodes {
        fields {
          imageID
          price
          productName
          rating
          type
          slug
        }
      }
    }
  }
`

export default WatchesPage
