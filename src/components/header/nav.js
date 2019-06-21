import React from "react"
import styled from "styled-components"

const SRSpan = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`

const MenuToggle = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #0f0b09;
`

const MainMenu = styled.nav`
  position: absolute;
  @supports(position: fixed) {
     position: fixed; 
  }
  display: none;
  left: -200px;
  top: 0;
  height: 100%;
  overflow-y: scroll;
  overflow-x: visible;
  transition: left 0.3s ease, box-shadow: 0.3s ease;
  z-index: 999;

  .menu-close {
    position: absolute;
    right: 0;
    top: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    box-shadow: -8px 0 8px rgba(0,0,0,0.5);
    min-height: 100%;
    width: 200px;
    background: gray;
  }

  &:target, &[aria-expanded="true"] {
    display: block;
    left: 0;
    outline: none;
    box-shadow: 3px 0 12px rgba(0,0,0,0.5);
    
    .menu-close {
      z-index: 1001;
    }

    ul {
      position: relative;
      z-index: 1000;
    }

    &+ .backdrop {
      position: absolute;
      @supports(position: fixed) {
        position: fixed;
      }
      display: block;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 998;
      background: #000;
      background: rgba(0,0,0,.85);
      cursor: default;
    }
  }
`

const Nav = () => (
  <>
    <MenuToggle href="#main-menu" aria-label="Open main menu">
      <SRSpan>Open main menu</SRSpan>
      <span>MENU</span>
    </MenuToggle>
    <MainMenu id="main-menu" aria-label="Main menu">
      <a
        className="menu-close"
        href="#main-menu-toggle"
        aria-label="Close Main Menu"
      >
        <SRSpan>Close main menu</SRSpan>
        <span>CLOSE MENU</span>
      </a>
      <ul>
        <li>Home</li>
        <li>Login</li>
        <li>View Cart</li>
      </ul>
    </MainMenu>
    <a
      href="#main-menu-toggle"
      className="backdrop"
      tab-index="-1"
      aria-hidden="true"
      hidden
    />
  </>
)

export default Nav
