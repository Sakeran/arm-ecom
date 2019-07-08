import React from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import styled from "styled-components"

import { logout } from "../state/actions"

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
    @media screen and (min-width: 1200px) {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
`

const ToggleButton = styled.button`
  position: absolute;
  z-index: 1000;
  @supports (position: fixed) {
    position: fixed;
  }
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: 0;
  transition: fill 0.2s ease-in-out;
  fill: black;

  &:hover,
  &:focus {
    fill: #5c6bc0;
  }

  svg {
    width: 3rem;
    height: auto;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`

const Menu = styled.div`
  z-index: 1000;
  box-sizing: border-box;
  background-color: #be9c91;
  position: fixed;
  box-shadow: 0.25rem 0 0.25rem 0 rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  overflow-x: visible;
  overflow-y: auto;
  max-width: 75%;
  padding-top: 1rem;
  transition: left 0.2s ease-in-out;

  &[aria-expanded="false"] {
    left: -300px;
    box-shadow: 0.25rem 0 0.25rem 0 rgba(0, 0, 0, 0);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a,
  button {
    box-sizing: border-box;
    display: inline-block;
    text-decoration: none;
    color: inherit;
    padding: 0.5rem 0 0.5rem 1rem;
    width: 100%;
    background: none;
    text-align: left;
    border: none;
    cursor: pointer;

    &:hover,
    &:focus {
      color: white;
      background-color: #5f4339;
    }
  }
  h4 {
    margin: 1rem 0;
    padding-left: 1rem;
    text-align: unset;
  }

  @media screen and (min-width: 768px) {
    position: relative;
    max-width: initial;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    padding: 0;
    transition: none;
    box-shadow: none;

    &[aria-expanded="false"] {
      /* Unset slide-in behavior */
      left: 0;
      box-shadow: none;
    }

    ul {
      display: flex;
      margin-left: 1rem;
      li {
        margin-right: 1rem;
        flex: 1;
        a,
        button {
          width: auto;
          padding: 0.5rem;
        }
      }
    }

    h4 {
      margin-left: auto;
    }
  }

  @media screen and (min-width: 1200px) {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
`

const NoscriptMenu = styled(Menu)`
  position: relative;
  padding-bottom: 1rem;
  width: 100%;
  max-width: initial;
  box-shadow: none;
`

const MenuLinks = ({ loggedIn, logoutDispatch }) => (
  <>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        {loggedIn ? (
          <button onClick={logoutDispatch}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
      {loggedIn && (
        <li>
          <Link to="/">Cart</Link>
        </li>
      )}
    </ul>
    <h4>Shop By Category</h4>
    <ul>
      <li>
        <Link to="/phones">Phones</Link>
      </li>
      <li>
        <Link to="/watches">Watches</Link>
      </li>
      <li>
        <Link to="/laptops">Laptops</Link>
      </li>
      <li>
        <Link to="/cameras">Cameras</Link>
      </li>
    </ul>
  </>
)

const NavColorBand = styled.nav`
  background-color: #be9c91;
`

// "Main" version of the navigation menu.
// Has two forms - slide-out and desktop (normal)
const MountedNav = props => {
  // Note that we only care about ARIA if the menu
  // is in slide-out form.
  const ariaProps = !props.menuSlideOut
    ? {} // No ARIA needed
    : {
        // use ARIA
        "aria-expanded": !props.menuHidden,
        // This bit includes the aria-hidden prop only if it is true.
        ...(!props.menuHidden ? {} : { "aria-hidden": true }),
      }

  return (
    <NavColorBand>
      <ToggleButton
        onClick={props.onToggle}
        aria-expanded={!props.menuHidden}
        aria-label="Menu"
      >
        {!props.menuHidden ? (
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
      <Menu id="nav-menu" {...ariaProps}>
        <MenuLinks
          loggedIn={props.loggedIn}
          logoutDispatch={props.logoutDispatch}
        />
      </Menu>
    </NavColorBand>
  )
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
`

class Header extends React.Component {
  state = {
    mounted: false,
    menuHidden: true,
    menuSlideOut: true,
  }

  // Checks whether the component should be in slide-out
  // form or not. This should only be referred to in
  // componentDidMount or componentWillUnmount
  checkWidth = () => {
    const width = document.body.clientWidth
    if (width >= 768) {
      this.setState({ menuSlideOut: false })
    } else {
      this.setState({ menuSlideOut: true })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.checkWidth)
    this.checkWidth()
    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkWidth)
  }

  // Toggle the menu off if a click happens somewhere else
  // on the screen.
  backdropListener = e => {
    const nav = document.querySelector("#nav-menu")
    if (!nav.contains(e.target)) {
      this.toggleState()
    }
  }

  toggleState = () => {
    const menuHidden = !this.state.menuHidden
    this.setState({ menuHidden })
    if (!menuHidden) {
      document.addEventListener("click", this.backdropListener)
    } else {
      document.removeEventListener("click", this.backdropListener)
    }
  }

  render() {
    return (
      <StyledHeader>
        <ColorBand>
          <h1>{this.props.siteTitle}</h1>
        </ColorBand>
        {/* Show the main nav only after mount. */}
        {this.state.mounted && (
          <MountedNav
            onToggle={this.toggleState}
            {...this.state}
            loggedIn={this.props.loggedIn}
            logoutDispatch={this.props.logout}
          />
        )}
        {/* Note - since this is just a static exercise project, we don't have
            the SSR required to make the noscript menu functional without JS. */}
        <noscript>
          <nav>
            <NoscriptMenu>
              <MenuLinks />
            </NoscriptMenu>
          </nav>
        </noscript>
      </StyledHeader>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
