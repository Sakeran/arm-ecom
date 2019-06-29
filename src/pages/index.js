import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

// Splash Image / Promotional Message

const StyledSplashPromo = styled.section`
  position: relative;
  overflow: hidden;

  h2 {
    position: absolute;
    left: -10000px;
    top: 0;
    width: 1px;
    height: 1px;
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

const Recommended = () => <StyledRecommended />

// "Deal of the Day" section

const StyledDealOfTheDay = styled.section``

const DealOfTheDay = () => <StyledDealOfTheDay />

// Shop Sections

// TODO

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <SplashPromo fluid={data.splashBG.childImageSharp.fluid} />
    <Recommended />
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
  }
`

export default IndexPage
