import React from "react"
import styled from "styled-components"

import ProductImage from "./productImage"
import { PriceTag, InternalLink } from "./elements"

const StyledProductCardWide = styled.div`
  width: 90%;
  margin: 0 auto 1rem auto;
  border: 1px solid #5f4339;
  padding: 0.5rem;
  display: flex;
`

const TextContent = styled.div`
  flex: auto;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    text-align: unset;
    margin: 0;
  }
`

const CardInfo = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  a {
    margin-left: 1rem;
  }
`

export default () => (
  <StyledProductCardWide>
    <ProductImage />
    <TextContent>
      <h3>Product Name</h3>
      <CardInfo>
        <PriceTag>$399</PriceTag>
        <InternalLink to="/">View Product</InternalLink>
      </CardInfo>
    </TextContent>
  </StyledProductCardWide>
)
