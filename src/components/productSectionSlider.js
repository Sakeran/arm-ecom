/**
 * Product Slider component, primarily for use on the index page.
 * Displays as a normal grid on wider screens.
 */

import React from "react"
import styled from "styled-components"

import ProductImage from "./productImage"
import { PriceTag, InternalLink } from "./elements"

// Single Product Container

const StyledProductContainer = styled.div`
  width: 60%;
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  border: 1px solid #5f4339;
  box-sizing: border-box;
  padding: 0.5rem;
  margin: 0 0.5rem;
  scroll-snap-align: center;
  box-sizing: border-box;

  h3 {
    padding-top: 1rem;
    margin: 0 0 1rem 0;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-around;
  }

  @media screen and (min-width: 600px) {
    width: 40%;
    flex: 0 0 40%;
    margin-top: 1rem;
    @supports (display: grid) {
      width: 100%;
      margin: 0;
    }
  }

  @media screen and (min-width: 860px) {
    width: 30%;
    flex: 0 0 30%;
    @supports (display: grid) {
      width: 100%;
      margin: 0;
    }
  }
`

const StyledProductImage = styled(ProductImage)`
  order: -1;
  border: 1px solid black;
`

const ProductContainer = ({ product }) => (
  <StyledProductContainer>
    <h3>{product.productName}</h3>
    <StyledProductImage type={product.type} imageId={product.imageID} />
    <div>
      <PriceTag>${product.price}</PriceTag>
      <InternalLink to="/">View Product</InternalLink>
    </div>
  </StyledProductContainer>
)

// Main Slider Component

const SliderHeading = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
  }
`

const SectionH2 = styled.h2`
  margin-bottom: 0.5rem;
  @media screen and (min-width: 768px) {
    margin: 0 1rem;
  }
`

const ViewAllLink = styled(InternalLink)`
  display: block;
  width: max-content;
  padding: 0.25rem 0;
  margin: 0 auto 1rem auto;

  @media screen and (min-width: 768px) {
    padding: 0.25rem 0 0 0;
    margin: 0;
  }
`

const StyledSliderContainer = styled.div`
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x proximity;
  position: relative;
  z-index: 0;

  @media screen and (min-width: 600px) {
    scroll-snap-type: unset;
    overflow-x: visible;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: -10px; /* Counters the flex item "gutter" margin */
    @supports (display: grid) {
      width: 95%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
    }
  }

  @media screen and (min-width: 860px) {
    width: 80%;
    @supports (display: grid) {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 1.5rem;
    }
  }
`

const StyledSection = styled.div`
  margin: 4rem auto;
`

export default ({ title, products }) => (
  <StyledSection>
    <SliderHeading>
      <SectionH2>{`Shop ${title}`}</SectionH2>
      <ViewAllLink to="/">View All {title}</ViewAllLink>
    </SliderHeading>
    <StyledSliderContainer>
      {products.map((p, i) => (
        <ProductContainer key={i} product={p.fields} />
      ))}
    </StyledSliderContainer>
  </StyledSection>
)
