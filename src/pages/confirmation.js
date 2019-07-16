import React from "react"

import CenteredLayout from "../components/layouts/centeredMainLayout"
import SEO from "../components/seo"

import { InternalLink } from "../components/elements"

const ConfirmationPage = ({ location: { state } }) => (
  <div>
    <SEO title={state && state.checkout ? "Order Confirmation" : "Order Status"} />
    <h2>
      {state && state.checkout
        ? "Your order was successfully placed."
        : "No order was placed."}
    </h2>
    <p>
      <InternalLink to="/">Return to home page.</InternalLink>
    </p>
  </div>
)

export default props => (
  <CenteredLayout>
    <ConfirmationPage {...props} />
  </CenteredLayout>
)
