import React from "react"
import styled from "styled-components"

import ProductImage from "./productImage"
import { PriceTag, InternalLink } from "./elements"

const StyledProductCardVert = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid #5f4339;
  padding: 0.5rem;

  h3 {
    padding-top: 1rem;
    margin: 0 0 1rem 0;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-around;
  }
`
const StyledProductImage = styled(ProductImage)`
  order: -1;
  border: 1px solid black;
`

const ProductCardVert = ({ product, className }) => (
  <StyledProductCardVert className={className}>
    <h3>{product.productName}</h3>
    <StyledProductImage type={product.type} imageId={product.imageID} />
    <div>
      <PriceTag>${product.price}</PriceTag>
      <InternalLink to="/">View Product</InternalLink>
    </div>
  </StyledProductCardVert>
)

export default ProductCardVert
