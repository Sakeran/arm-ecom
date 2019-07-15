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

// Buttons

export const PrimaryButton = styled.button`
  background: #5c6bc0;
  box-shadow: none;
  border: none;
  padding: 0.5rem;
  display: block;
  transition: color 0.2s ease-in-out;
  &:hover,
  &:focus {
    color: white;
  }
`

export const SuccessButton = styled.button`
  background: #21de5e;
  box-shadow: none;
  border: none;
  padding: 0.5rem;
  display: block;
`

export const DisabledButton = styled.button`
  background: lightgray;
  box-shadow: none;
  border: none;
  padding: 0.5rem;
  display: block;
`
