import React from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import ProductImage from "../components/productImage"
import { InternalLink, PriceTag, PrimaryButton } from "../components/elements"

import { removeItem } from "../state/actions"

const NotLoggedInPage = () => (
  <>
    <h2>You are not currently logged in.</h2>
    <div style={{ marginLeft: "1rem" }}>
      <InternalLink to="/login">Go to login page.</InternalLink>
      <br />
      <br />
      <InternalLink to="/">Return to main page.</InternalLink>
    </div>
  </>
)

const EmptyCartPage = () => (
  <>
    <h2>Your Cart</h2>
    <p>Your shopping cart is currently empty.</p>
  </>
)

const StyledCartItem = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  border-bottom: 1px solid #5f4339;
  padding: 0.25rem;

  & > *:first-child {
    width: 35%;
  }

  & > *:nth-child(2) {
    margin-left: 1rem;

    button {
      background: none;
      border: none;
      color: #5f4339;
      margin: 0;
      padding: 0;
      margin-top: 0.25rem;
      font-size: 1rem;
      text-decoration: underline;
    }

    span {
      font-size: 1.1rem;
      position: absolute;
      bottom: 0.25rem;
      right: 1rem;
    }
  }
`

const CartItem = ({ item, removeItem }) => (
  <StyledCartItem>
    <ProductImage type={item.type} imageId={item.imageID} />
    <div>
      {item.productName}
      <br />
      <button onClick={() => removeItem(item.slug)}>Remove From Cart</button>
      <PriceTag>${item.price}</PriceTag>
    </div>
  </StyledCartItem>
)

const StyledTotal = styled.div`
  margin-top: 0.5rem;
  margin-right: 1rem;
  text-align: right;
  font-size: 1.2rem;
`

const StyledCheckoutButton = styled(PrimaryButton)`
  width: 75%;
  margin: 1rem auto;
  text-decoration: none;
  text-align: center;
  color: black;
`

const LoggedInCart = ({ username, cart, removeItem }) => {
  if (!cart.length) {
    return <EmptyCartPage />
  }
  return (
    <>
      <h2>Your Cart</h2>
      <div>
        {cart.map(item => (
          <CartItem key={item.slug} item={item} removeItem={removeItem} />
        ))}
        <StyledTotal>
          Total:{"  "}
          <PriceTag>${cart.reduce((acc, el) => acc + el.price, 0)}</PriceTag>
        </StyledTotal>
        <StyledCheckoutButton as={Link} to="/checkout">
          Checkout
        </StyledCheckoutButton>
      </div>
    </>
  )
}

const CartPage = ({ loggedIn, username, cart, removeItem }) => (
  <Layout>
    <SEO title="Cart" />
    {loggedIn ? (
      <LoggedInCart username={username} cart={cart} removeItem={removeItem} />
    ) : (
      <NotLoggedInPage />
    )}
  </Layout>
)

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
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
