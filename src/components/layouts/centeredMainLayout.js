/**
 * Centers the page's main content in the middle of the screen.
 */

import React from "react"
import styled from "styled-components"
import Layout from "./layout"

const CenteredMain = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ({ children }) => (
  <Layout>
    <CenteredMain>{children}</CenteredMain>
  </Layout>
)
