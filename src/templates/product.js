import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layouts/layout"
import ProductImage from "../components/productImage"
import StarRating from "../components/starRating"
import ProductCardVert from "../components/productCardVert"

const ProductPage = ({ data: { product, recommended } }) => (
  <Layout>
    <h2>{product.fields.productName}</h2>
    <ProductImage type={product.fields.type} imageId={product.fields.imageID} />
    <p>
      Cras eu malesuada nibh. Etiam feugiat sollicitudin justo, vel tempus
      tortor volutpat ac. Praesent non nibh vulputate, gravida nibh ac,
    </p>
    Rating:
    <StarRating rating={product.fields.rating} />
    <button>Add To Cart</button>
    <h2>More Like {product.fields.productName}:</h2>
    {recommended.nodes.map(r => (
      <ProductCardVert key={r.fields.slug} product={r.fields} />
    ))}
  </Layout>
)

export default ProductPage

export const query = graphql`
  query($slug: String!, $type: String!) {
    product: products(fields: { slug: { eq: $slug } }) {
      fields {
        companyName
        imageID
        price
        productName
        rating
        slug
        type
      }
    }
    recommended: allProducts(
      limit: 3
      filter: { fields: { slug: { ne: $slug }, type: { eq: $type } } }
    ) {
      nodes {
        fields {
          imageID
          price
          productName
          rating
          slug
          type
        }
      }
    }
  }
`
