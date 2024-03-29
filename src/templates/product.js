import React from "react"
import { connect } from "react-redux"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import ProductImage from "../components/productImage"
import StarRating from "../components/starRating"
import ProductCardVert from "../components/productCardVert"
import { PrimaryButton, DisabledButton, SuccessButton } from "../components/elements"

import { addItem } from "../state/actions"

const MainProductContainer = styled.div`
  margin: 0 1rem 5rem 1rem;

  @supports (display: grid) {
    @media screen and (min-width: 768px) {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: minmax(30%, 400px) 1fr;
      grid-template-rows: 1fr 3fr;
      grid-template-areas: "img header" "img content";

      h2 {
        margin-top: 0;
      }
    }
  }
`

const MainProductHeader = styled.div`
  grid-area: "header";
`

const MadeByTag = styled.span`
  display: block;
  text-align: center;
  margin-bottom: 1rem;
  margin-top: -1rem;
  @supports (display: grid) {
    @media screen and (min-width: 768px) {
      text-align: left;
      margin-top: 0;
      margin-left: 1rem;
    }
  }
`

const MainProductImage = styled(ProductImage)`
  border: 1px solid black;
  max-width: 500px;
  margin: 0 auto;
  grid-area: img;
  width: 100%;
  align-self: start;
`

const MainProductContent = styled.div`
  grid-area: content;
  @supports (display: grid) {
    @media screen and (min-width: 768px) {
      margin: 0 1rem;
      display: flex;
      flex-direction: column;

      & > p {
        margin-bottom: auto;
        margin-left: 0;
      }

      & > button {
        display: block;
        width: 70%;
      }
    }
  }
`

const RatingDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`

const RecommendedContainer = styled.div`
  margin: 0 1rem;
  
  & > div {
    margin: 0 auto 1rem auto;
    max-width: 450px;
  }

  @supports (display: grid) {
    @media screen and (min-width: 768px) {
      display: flex;
      margin: 1rem 1rem 0 1rem;
      justify-content: space-around;
      @supports (justify-content: space-evenly) {
        justify-content: space-evenly;
      }

      & > div {
        max-width: unset;
        flex: 1 0 30%;
        margin: 0;

        & :not(:first-child) {
          margin-left: 1rem;
        }
      }
    }
  }
`

const ActionButton = ({ item, username, cart, addToCart }) => {
  if (username) {
    // If the item is in the cart, display succeess button.
    if (cart.find(e => e.slug === item.fields.slug)) {
      return (
        <SuccessButton>
          Item Added To Cart
        </SuccessButton>
      )
    }
    return (
      <PrimaryButton onClick={() => addToCart(item.fields)}>
        Add To Cart
      </PrimaryButton>
    )
  }

  return <DisabledButton disabled>Login to use cart</DisabledButton>
}

const ProductPage = ({
  data: { product, recommended },
  username,
  cart,
  addToCart,
}) => (
  <Layout>
    <MainProductContainer>
      <MainProductHeader>
        <h2>{product.fields.productName}</h2>
        <MadeByTag>Made By {product.fields.companyName}</MadeByTag>
      </MainProductHeader>
      <MainProductImage
        type={product.fields.type}
        imageId={product.fields.imageID}
      />
      <MainProductContent>
        <p>
          Duis rhoncus, massa eget ornare lobortis, nulla quam mattis eros, eget
          rhoncus nunc urna a justo. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Suspendisse vulputate fringilla nulla ut volutpat. Ut
          efficitur fringilla mollis. Nullam tincidunt lacus quis tortor
          malesuada, ut sollicitudin felis accumsan. In nec fermentum lorem, nec
          consequat dolor.
        </p>
        <RatingDiv>
          <span>Average Rating:</span>
          <StarRating rating={product.fields.rating} />
        </RatingDiv>
        <ActionButton
          item={product}
          username={username}
          cart={cart}
          addToCart={addToCart}
        />
      </MainProductContent>
    </MainProductContainer>
    <h2>More Like {product.fields.productName}:</h2>
    <RecommendedContainer>
      {recommended.nodes.map(r => (
        <ProductCardVert key={r.fields.slug} product={r.fields} />
      ))}
    </RecommendedContainer>
  </Layout>
)

const mapStateToProps = state => ({
  username: state.username,
  cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addItem(item)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage)

export const query = graphql`
  query($slug: String!, $type: String!) {
    product: products(fields: { slug: { eq: $slug } }) {
      fields {
        companyName
        imageID
        price
        productName
        rating
        slug
        type
      }
    }
    recommended: allProducts(
      limit: 3
      filter: { fields: { slug: { ne: $slug }, type: { eq: $type } } }
    ) {
      nodes {
        fields {
          imageID
          price
          productName
          rating
          slug
          type
        }
      }
    }
  }
`
