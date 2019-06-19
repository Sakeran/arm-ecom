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
import { createGlobalStyle } from "styled-components"

import Header from "./header"
import Footer from "./footer"

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
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
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          <main>{children}</main>
          <Footer title={data.site.siteMetadata.title} />
        </div>
        <Normalize />
        <GlobalStyle />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
