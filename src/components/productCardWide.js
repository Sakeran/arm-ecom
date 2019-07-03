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
  @media screen and (min-width: 768px) {
    width: 45%;
    margin: 0;
  }
`

const StyledImage = styled(ProductImage)`
  box-sizing: border-box;
  width: 40%;
  border: 1px solid black;
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

export default ({ product: { fields } }) => (
  <StyledProductCardWide>
    <StyledImage
      type={fields.type}
      imageId={fields.imageID}
      alt={fields.productName}
    />
    <TextContent>
      <h3>{fields.productName}</h3>
      <CardInfo>
        <PriceTag>{`$${fields.price}`}</PriceTag>
        <InternalLink
          to="/"
          ariaLabel={`View product information for ${fields.productName}`}
        >
          View Product
        </InternalLink>
      </CardInfo>
    </TextContent>
  </StyledProductCardWide>
)
