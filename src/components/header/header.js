import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import Nav from "./nav"

const SiteHeader = styled.header`
  background-color: #5f4339;
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  h1 {
    margin: 0;
    a {
      text-decoration: none;
      color: white;
    }
  }
`

const Header = ({ siteTitle }) => (
  <SiteHeader>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
    <Nav />
  </SiteHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
