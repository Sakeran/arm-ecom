import React from "react"

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
    cameras: allProductDataCameras {
      nodes {
        fields {
          imageID
          price
          productName
          rating
          type
        }
      }
    }
  }
`

export default CamerasPage
