/**
 * Main Layout Component.
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Normalize } from "styled-normalize"
import styled, { createGlobalStyle } from "styled-components"

import Header from "../header"
import Footer from "../footer"

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    font-family: 'Roboto', 'helvetica', 'arial', sans-serif;
    background-color: #ededed;
  }

  body {
    min-height: 100vh;
  }

  /* Form Elements */
  
  label {
    display: block;
    margin-bottom: 0.25rem;

  }

  input[type="text"],
  input[type="password"] {
    box-sizing: border-box;
    display: block;
    border: 1px solid #bebebe;
    margin-right: 0.25rem;
    margin-bottom: 1rem;
  }

  input[type="submit"] {
    background: #5c6bc0;
	  box-shadow: none;
    border: none;
    padding: 0.5rem;
    display: block;
    transition: color 0.2s ease-in-out;
    &:hover, &:focus {
      color: white;
    }
  }
`

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  flex: auto;
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

const FlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
        <FlexLayout>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Main id="main">{children}</Main>
          <Footer title={data.site.siteMetadata.title} />
        </FlexLayout>
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
