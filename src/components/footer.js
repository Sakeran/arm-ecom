import React from "react"

const Footer = ({ title }) => (
  <footer>
    © {new Date().getFullYear()}
    {` `}
    {title}
  </footer>
)

export default Footer
