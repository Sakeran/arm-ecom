import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import ProductCardWide from "../components/productCardWide"

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

const StyledRecommended = styled.section``

const Recommended = ({ items }) => (
  <StyledRecommended>
    <h2>Recommended In Watches</h2>
    {items.map((item, idx) => (
      <ProductCardWide key={idx} product={item} />
    ))}
  </StyledRecommended>
)

// "Deal of the Day" section

const StyledDealOfTheDay = styled.section``

const DealOfTheDay = () => <StyledDealOfTheDay />

// Shop Sections

// TODO

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <SplashPromo fluid={data.splashBG.childImageSharp.fluid} />
    <Recommended items={data.watches.nodes} />
    <DealOfTheDay />
    {/* TODO - 'Shop' sections/sliders */}
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
    watches: allProductDataWatches(limit: 2) {
      nodes {
        fields {
          imageID
          price
          productName
          rating
        }
      }
    }
  }
`

export default IndexPage
