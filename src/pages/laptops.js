import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import CategoryPage from "../components/categoryPage"
import { graphql } from "gatsby"

const LaptopsPage = ({ data }) => (
  <Layout>
    <SEO title="Laptops" />
    <CategoryPage title="Laptops" products={data.laptops.nodes} />
  </Layout>
)

export const query = graphql`
  query {
    laptops: allProducts(filter: { fields: { type: { eq: "laptop" } } }) {
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
export default LaptopsPage
