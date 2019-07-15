import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"

import { clearCart } from "../state/actions"
import { InternalLink, PriceTag } from "../components/elements"

const NotLoggedIn = () => (
  <>
    <h2>Not Logged In</h2>
    <p>
      Please <InternalLink to="/login">log in</InternalLink> to access this
      page.
    </p>
  </>
)

const EmptyCart = () => (
  <>
    <h2>Empty Cart</h2>
    <p>You currently have no items in your shopping cart.</p>
  </>
)

const StyledOrderList = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0 4rem 0.5rem 1rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #5f4339;

    li {
      display: flex;
      & > span {
        margin-left: auto;
      }
    }
  }

  & > div {
    font-size: 1.1rem;
    text-align: right;
    margin-right: 4rem;
  }
`

const Checkout = ({ cart, clear }) => (
  <>
    <h2>Confirm Purchase</h2>
    <StyledOrderList>
      <ul>
        {cart.map(item => (
          <li key={item.slug}>
            {item.productName} <PriceTag>${item.price}</PriceTag>
          </li>
        ))}
      </ul>
      <div>
        Total:{" "}
        <PriceTag>${cart.reduce((acc, el) => acc + el.price, 0)}</PriceTag>
      </div>
    </StyledOrderList>
    <h2>Shipping Details</h2>
    <button>Place Order</button>
  </>
)

const CheckoutPage = ({ loggedIn, cart, clear }) => (
  <Layout>
    <SEO title="Checkout" />
    {loggedIn ? (
      cart.length ? (
        <Checkout cart={cart} clear={clear} />
      ) : (
        <EmptyCart />
      )
    ) : (
      <NotLoggedIn />
    )}
  </Layout>
)

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(clearCart()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutPage)
