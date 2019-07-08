import React from "react"
import styled from "styled-components"

import ProductCardVert from "./productCardVert"

// Sorting Widget

const StyledSortingWidget = styled.fieldset`
  border-width: 1px;
  border-color: #5f4339;
  margin-bottom: 1rem;
`

// This container is necessary of this implementation, due
// to a bug with flex layouts in fieldset elements.
const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #5f4339;

  & > div {
    flex: auto;
  }
`

const SelectionContainer = styled.div`
  display: flex;

  label {
    flex: auto;
    margin: 0;
    padding: 0.5rem 0;
    text-align: center;
  }

  input[type="radio"] {
    position: absolute;
    left: -10000px;
    &:focus {
      & + label {
        text-decoration: underline;
      }
    }
    &:checked {
      & + label {
        color: white;
        background-color: #5f4339;
      }
    }
  }
`

const SortingWidget = () => (
  <StyledSortingWidget>
    <legend>Sort Products</legend>
    <OptionsContainer>
      <SelectionContainer>
        <input type="radio" id="sort-by-name" name="sort-type" value="name" />
        <label htmlFor="sort-by-name">Name</label>
      </SelectionContainer>
      <SelectionContainer>
        <input type="radio" id="sort-by-price" name="sort-type" value="price" />
        <label htmlFor="sort-by-price">Price</label>
      </SelectionContainer>
      <SelectionContainer>
        <input
          type="radio"
          id="sort-by-rating"
          name="sort-type"
          value="rating"
        />
        <label htmlFor="sort-by-rating">Rating</label>
      </SelectionContainer>
    </OptionsContainer>
  </StyledSortingWidget>
)

// Category Page

const CategoryPage = ({ title, products }) => (
  <>
    <h2>{title}</h2>
    <SortingWidget />
    <div>
      {products.map(p => (
        <ProductCardVert product={p.fields} />
      ))}
    </div>
  </>
)

export default CategoryPage

// Available sorting functions:
// STUB

function sortByPrice(products) {
  return products
}

function soryByName(products) {
  return products
}

function sortByRating(products) {
  return products
}
