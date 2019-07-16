import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledDisclaimer = styled.div`
  background-color: orange;
  margin: 0;
  color: black;
  text-align: center;
  display: flex;
  flex-direction: column;

  a {
    margin-top: 0.5rem;
    display: inline-block;
    color: black;
  }
`

const StyledFooter = styled.footer`
  background-color: #5f4339;
  padding: 1rem 0 0 0;
  ul {
    padding: 0;
    list-style: none;
    text-align: center;

    li {
      display: inline-block;

      & + li::before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 1rem;
        position: relative;
        top: 2px;
        margin-right: 0.5rem;
        background-color: white;
      }
    }
  }
`

const StyledCopyright = styled.div`
  padding: 1rem 0 0.5rem 0;
  color: white;
  text-align: center;
`

const FooterLink = styled(Link)`
  color: white;
  display: inline-block;
  text-decoration: none;
  padding: 0.25rem 0.5rem 0 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0);

  &:hover,
  &:focus {
    border-bottom: 1px solid white;
  }
`

const Footer = ({ title }) => (
  <>
    <StyledDisclaimer>
      This is a static, example website. Its content is purely demonstrational
      and has no functionality.
      <a href="https://github.com/Sakeran">https://github.com/Sakeran</a>
    </StyledDisclaimer>
    <StyledFooter>
      <ul>
        <li>
          <FooterLink to="/">Privacy Policy</FooterLink>
        </li>
        <li>
          <FooterLink to="/">Terms and Conditions</FooterLink>
        </li>
        <li>
          <FooterLink to="/">Careers</FooterLink>
        </li>
        <li>
          <FooterLink to="/">About Us</FooterLink>
        </li>
        <li>
          <FooterLink to="/">Returns & Warranty</FooterLink>
        </li>
        <li>
          <FooterLink to="/">Affiliates</FooterLink>
        </li>
        <li>
          <FooterLink to="/">E-Gift Cards</FooterLink>
        </li>
        <li>
          <FooterLink to="/">Charity</FooterLink>
        </li>
      </ul>
      <StyledCopyright>
        © {new Date().getFullYear()}
        {` `}
        {title}
      </StyledCopyright>
    </StyledFooter>
  </>
)

export default Footer
