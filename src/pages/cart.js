import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { InternalLink } from "../components/elements"

import { removeItem } from "../state/actions"
import { UAParser } from "ua-parser-js"

const NotLoggedInPage = () => (
  <>
    <h2>You are not currently logged in.</h2>
    <InternalLink to="/login">Go to login page.</InternalLink>
    <br />
    <br />
    <InternalLink to="/">Return to main page.</InternalLink>
  </>
)

const LoggedInCart = ({ username, cart }) => (
  <pre>{JSON.stringify(cart, null, 2)}</pre>
)

const CartPage = ({ username, cart }) => (
  <Layout>
    <SEO title="Cart" />
    {username ? <LoggedInCart username={username} cart={cart} /> : <NotLoggedInPage />}
  </Layout>
)

const mapStateToProps = state => ({
  username: state.username,
  cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
  removeItem: itemKey => dispatch(removeItem(itemKey)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage)
