/**
 * Miscellaneous elements repeated throughout the project.
 */
import { Link } from "gatsby"
import styled from "styled-components"

// Price Tags
export const PriceTag = styled.span`
  font-weight: bold;
`

// Links

export const InternalLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: black;
  border-bottom: 1px solid black;
`