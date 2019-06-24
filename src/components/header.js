import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const ColorBand = styled.div`
  background-color: red;

  h1 {
    margin: 0;
  }
`

const ToggleButton = styled.button`
  position: absolute;
  @supports (position: fixed) {
    position: fixed;
  }
  top: 0.5rem;
  right: 0.5rem;
`

const Menu = styled.div`
  box-sizing: border-box;
  background-color: purple;
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  overflow-x: visible;
  overflow-y: auto;
  max-width: 75%;
  padding-top: 1rem;
  padding-left: 1rem;
  transition: left 0.2s ease-in-out;

  &[aria-expanded="false"] {
    left: -300px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  h4 {
    margin: 1rem 0;
  }
`

class Header extends React.Component {
  state = {
    menuToggled: false,
  }

  toggleState = () => this.setState({ menuToggled: !this.state.menuToggled })

  render() {
    return (
      <header>
        <ColorBand>
          <h1>{this.props.siteTitle}</h1>
        </ColorBand>
        <nav>
          <ToggleButton onClick={this.toggleState}>MENU</ToggleButton>
          <Menu aria-expanded={this.state.menuToggled}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/">Cart</Link>
              </li>
            </ul>
            <h4>Shop By Category</h4>
            <ul>
              <li>
                <Link to="/">Phones</Link>
              </li>
              <li>
                <Link to="/">Watches</Link>
              </li>
              <li>
                <Link to="/">Laptops</Link>
              </li>
              <li>
                <Link to="/">Cameras</Link>
              </li>
            </ul>
          </Menu>
        </nav>
      </header>
    )
  }
}

export default Header
