import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const ColorBand = styled.div`
  background-color: #5f4339;
  color: white;
  min-height: 4rem;
  display: flex;
  align-items: center;
  h1 {
    margin: 0;
    margin-left: 0.5rem;
    font-family: "Righteous", sans-serif;
    letter-spacing: 1px;
  }
`

const ToggleButton = styled.button`
  position: absolute;
  @supports (position: fixed) {
    position: fixed;
  }
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: 0;
  transition: fill 0.2s ease-in-out;
  fill: white;

  &:hover,
  &:focus {
    fill: black;
  }

  svg {
    width: 3rem;
    height: auto;
  }
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

  // Toggle the menu off if a click happens somewhere else
  // on the screen.
  backdropListener = e => {
    const nav = document.querySelector('#nav-menu');
    if (!nav.contains(e.target)) {
      this.toggleState()
    }
  }

  toggleState = () => {
    const menuToggled = !this.state.menuToggled
    this.setState({ menuToggled })
    if (menuToggled) {
      document.addEventListener("click", this.backdropListener)
    } else {
      document.removeEventListener("click", this.backdropListener)
    }
  }

  render() {
    return (
      <header>
        <ColorBand>
          <h1>{this.props.siteTitle}</h1>
        </ColorBand>
        <nav>
          <ToggleButton
            onClick={this.toggleState}
            aria-expanded={this.state.menuToggled}
            aria-label="Menu"
          >
            {this.state.menuToggled ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            )}
          </ToggleButton>
          <Menu id="nav-menu" aria-expanded={this.state.menuToggled}>
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
