import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import CategoryPage from "../components/categoryPage"

const PhonesPage = ({ data }) => (
  <Layout>
    <SEO title="Phones" />
    <CategoryPage title="Phones" products={data.phones.nodes} />
  </Layout>
)

export const query = graphql`
  query {
    phones: allProducts(filter: { fields: { type: { eq: "phone" } } }) {
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
export default PhonesPage
