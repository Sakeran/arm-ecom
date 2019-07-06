import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import ProductCardWide from "../components/productCardWide"
import ProductSectionSlider from "../components/productSectionSlider"
import { InternalLink, PriceTag } from "../components/elements"

// Splash Image / Promotional Message

const StyledSplashPromo = styled.section`
  position: relative;
  overflow: hidden;

  background-color: lightgray;

  h2 {
    position: absolute;
    left: -10000px;
    top: 0;
    width: 1px;
    height: 1px;
    border: 0;
    margin: 0;
    overflow: hidden;
  }

  p {
    position: absolute;
    bottom: 2rem;
    right: 1rem;
    max-width: 75%;
    font-size: 2.5rem;
    line-height: 4rem;
    mark {
      background-color: rgba(255, 255, 255, 0.8);
    }

    @media screen and (min-width: 768px) {
      bottom: unset;
      font-size: 3.5rem;
      line-height: 4.5rem;
      top: 4rem;
      right: 4rem;
    }
  }
`

const SplashPromo = ({ fluid }) => (
  <StyledSplashPromo>
    <Img fluid={fluid} alt="" />
    {/* SR-Only Header */}
    <h2>Featured Announcement</h2>
    <p>
      <mark>Up to 30% Off Select Products</mark>
    </p>
  </StyledSplashPromo>
)

// 'Recommended' section

const StyledRecommended = styled.section`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledRecommendedItems = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-around;
    @supports (justify-content: space-evenly) {
      justify-content: space-evenly;
    }
  }
`

const Recommended = ({ items }) => (
  <StyledRecommended>
    <h2>Recommended In Watches</h2>
    <StyledRecommendedItems>
      {items.map((item, idx) => (
        <ProductCardWide key={idx} product={item} />
      ))}
    </StyledRecommendedItems>
  </StyledRecommended>
)

// "Deal of the Day" section

const StyledDealOfTheDay = styled.section`
  overflow: hidden;
  position: relative;
  width: 100%;
`

const StyledDODImage = styled(Img)`
  width: 150%;
  margin-left: -15%;

  @media screen and (min-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`

const StyledDODContent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    background-color: white;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 2.5rem;
    width: max-content;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
  }
`

const StyledDODInfo = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: auto 0 4rem 2rem;
  background-color: white;
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 1rem;

  @media screen and (min-width: 768px) {
    margin: auto 3rem 20% auto;
    width: 40%;
    min-height: 30%;
    justify-content: space-around;
  }

  p {
    color: #5f4339;
    margin-top: 0;
  }

  div {
    display: flex;
    justify-content: space-around;
    @supports (justify-content: space-evenly) {
      justify-content: space-evenly;
    }
  }
`

const DealOfTheDay = ({ fluid }) => (
  <StyledDealOfTheDay>
    <StyledDODImage fluid={fluid} alt="" />
    <StyledDODContent>
      <h2>Deal of The Day</h2>
      <StyledDODInfo>
        <p>
          Aenean suscipit, arcu in posuere lacinia, metus massa porttitor dolor,
          ut nisi eget eros.
        </p>
        <div>
          <PriceTag>$199</PriceTag>
          <InternalLink to="/">View Product</InternalLink>
        </div>
      </StyledDODInfo>
    </StyledDODContent>
  </StyledDealOfTheDay>
)

// Shop Sections

// TODO

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <SplashPromo fluid={data.splashBG.childImageSharp.fluid} />
    <Recommended items={data.watches.nodes} />
    <DealOfTheDay fluid={data.dealOfDayBG.childImageSharp.fluid} />
    <ProductSectionSlider title="Phones" products={data.phoneSlider.nodes} />
    <ProductSectionSlider title="Laptops" products={data.laptopSlider.nodes} />
    <ProductSectionSlider title="Watches" products={data.watchSlider.nodes} />
    <ProductSectionSlider title="Cameras" products={data.cameraSlider.nodes} />
  </Layout>
)

export const query = graphql`
  query {
    splashBG: file(relativePath: { eq: "splashes/laptop-user1.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    dealOfDayBG: file(relativePath: { eq: "splashes/phone-on-desk1.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    watches: allProductDataWatches(limit: 2) {
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

    phoneSlider: allProductDataPhones(limit: 9, skip: 2) {
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
    cameraSlider: allProductDataCameras(limit: 9, skip: 2) {
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
    watchSlider: allProductDataWatches(limit: 9, skip: 2) {
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
    laptopSlider: allProductDataLaptops(limit: 9, skip: 2) {
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

export default IndexPage
