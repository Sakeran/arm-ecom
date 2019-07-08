import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import ProductCardVert from "./productCardVert"

import { changeSort } from "../state/actions"

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

const SortingWidget = ({ sort, changeSort }) => (
  <StyledSortingWidget>
    <legend>Sort Products</legend>
    <OptionsContainer onChange={e => changeSort(e.target.value)}>
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

const sortingOptions = {
  name: sortByName,
  price: sortByPrice,
  rating: sortByRating,
}

const doSort = (products, sort) => {
  if (!sort) return products
  const chosenSort = sortingOptions[sort]
  if (!chosenSort) return products
  return chosenSort(products)
}

const CategoryPage = ({ title, products, sort, changeSort }) => (
  <>
    <h2>{title}</h2>
    <SortingWidget sort={sort} changeSort={changeSort} />

    {/* Sort the products by the preferred option, if possible */}
    <div>
      {doSort(products, sort).map((p, i) => (
        <ProductCardVert key={i} product={p.fields} />
      ))}
    </div>
  </>
)

const mapStateToProps = state => ({
  sort: state.preferredSort,
})

const mapDispatchToProps = dispatch => ({
  changeSort: sort => dispatch(changeSort(sort)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPage)

// Available sorting functions:
// STUB

function sortByPrice(products) {
  // Sorting by name first makes the sort order consistent.
  // Could probably stand to use a cleaner method,
  // but this will work for the sample.
  return sortByName(products).sort((a, b) => {
    const {
      fields: { price: priceA },
    } = a
    const {
      fields: { price: priceB },
    } = b

    return priceA < priceB ? -1 : 1
  })
}

function sortByName(products) {
  return products.sort((a, b) => {
    const {
      fields: { productName: productNameA },
    } = a
    const {
      fields: { productName: productNameB },
    } = b

    return productNameA < productNameB ? -1 : 1
  })
}

function sortByRating(products) {
  // Sorting by name first makes the sort order consistent.
  // Could probably stand to use a cleaner method,
  // but this will work for the sample.
  return sortByName(products).sort((a, b) => {
    const {
      fields: { rating: ratingA },
    } = a
    const {
      fields: { rating: ratingB },
    } = b

    return ratingA > ratingB ? -1 : 1
  })
}
