/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Normalize } from "styled-normalize"
import styled, { createGlobalStyle } from "styled-components"

import Header from "./header"
import Footer from "./footer"

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    font-family: 'Roboto', 'helvetica', 'arial', sans-serif;
    background-color: #ededed;
  }
`

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
`

const SkipLinks = styled.a`
  display: block;
  width: 100%;
  background: #262626;
  text-decoration: none;
  color: white;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 5rem;
  z-index: 1;
  top: -4rem;
  transition: top 0.3s ease-in;

  &:focus {
    top: 0;
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <SkipLinks href="#main">Skip to main content</SkipLinks>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Main id="main">{children}</Main>
        <Footer title={data.site.siteMetadata.title} />
        <GlobalStyle />
        <Normalize />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
