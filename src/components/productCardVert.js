import React from "react"
import styled from "styled-components"

import ProductImage from "./productImage"
import StarRating from "./starRating"
import { PriceTag, InternalLink } from "./elements"

const StyledProductCardVert = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  border: 1px solid #5f4339;
  padding: 0.5rem;

  h3 {
    padding-top: 1rem;
    margin: 0 0 0.5rem 0;
    text-align: center;
  }

  div:last-child {
    margin-top: 0.5rem;
    display: flex;
    align-self: stretch;
    justify-content: space-around;
  }
`
const StyledProductImage = styled(ProductImage)`
  order: -1;
  border: 1px solid black;
  align-self: stretch;
`

const StyledStarRating = styled(StarRating)`
  width: 45%;
  margin: 0 auto;
`

const ProductCardVert = ({ product, className }) => (
  <StyledProductCardVert className={className}>
    <h3>{product.productName}</h3>
    <StyledProductImage type={product.type} imageId={product.imageID} />
    <StyledStarRating rating={product.rating} />
    <div>
      <PriceTag>${product.price}</PriceTag>
      <InternalLink to={`/${product.slug || ""}`}>View Product</InternalLink>
    </div>
  </StyledProductCardVert>
)

export default ProductCardVert
