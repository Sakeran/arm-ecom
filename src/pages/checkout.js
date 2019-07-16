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
    margin: 0 2rem 0.5rem 2rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #5f4339;

    li {
      display: flex;
      & > span {
        margin-left: auto;
      }
    }

    max-width: 400px;
    @media screen and (min-width: 400px) {
      margin: 0 1rem 0.5rem 0;
    }
  }

  & > div {
    font-size: 1.1rem;
    text-align: right;
    margin-right: 2rem;

    max-width: 400px;
    @media screen and (min-width: 400px) {
      margin-right: 0;
    }
  }
  @media screen and (min-width: 400px) {
    margin-left: 1rem;
  }
`

const StyledShippingForm = styled.form`
  margin: 0 1rem;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;

  label[for="name"],
  label[for="address"],
  label[for="deliveryinstructions"] {
    width: 100%;
  }

  input[name="name"],
  input[name="address"] {
    width: 100%;
  }

  textarea {
    width: 100%;
    min-height: 100px;
    margin-bottom: 1rem;
  }

  input[type="submit"] {
    width: 100%;
  }
`

const FormHalfWidth = styled.div`
  width: calc(50% - 1rem);
  box-sizing: border-box;
  input {
    width: 100%;
    box-sizing: border-box;
  }

  &:nth-of-type(2) {
    margin-left: auto;
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
    <StyledShippingForm>
      <label htmlFor="name">Name</label>
      <input name="name" type="text" />
      <label htmlFor="address">Address</label>
      <input name="address" type="text" />
      <FormHalfWidth>
        <label htmlFor="city">City</label>
        <input name="city" type="text" />
      </FormHalfWidth>
      <FormHalfWidth>
        <label htmlFor="state">State</label>
        <input name="state" type="text" />
      </FormHalfWidth>
      <label htmlFor="deliveryinstructions">Delivery Instructions</label>
      <textarea name="" />
      <input type="submit" value="Place Order" />
    </StyledShippingForm>
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
