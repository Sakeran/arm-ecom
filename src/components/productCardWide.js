import React from "react"
import styled from "styled-components"

import ProductImage from "./productImage"
import StarRating from "./starRating"
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

const StyledStarRating = styled(StarRating)`
  width: 50%;
  margin-top: 0.5rem;
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
  margin-top: 0.5rem;
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
      <StyledStarRating rating={fields.rating} />
      <CardInfo>
        <PriceTag>{`$${fields.price}`}</PriceTag>
        <InternalLink
          to={`/${fields.slug || ""}`}
          aria-label={`View product information for ${fields.productName}`}
        >
          View Product
        </InternalLink>
      </CardInfo>
    </TextContent>
  </StyledProductCardWide>
)
