import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import ProductCardVert from "./productCardVert"

import { changeSort } from "../state/actions"

// Sorting Widget

const StyledSortingWidget = styled.fieldset`
  border-width: 1px;
  border-color: #5f4339;
  margin: 0 0.5rem 1rem;
  max-width: 600px;
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
        <input
          type="radio"
          id="sort-by-name"
          name="sort-type"
          value="name"
          checked={sort === "name"}
          readOnly
        />
        <label htmlFor="sort-by-name">Name</label>
      </SelectionContainer>
      <SelectionContainer>
        <input
          type="radio"
          id="sort-by-price-hi"
          name="sort-type"
          value="priceHigh"
          checked={sort === "priceHigh"}
          readOnly
        />
        <label htmlFor="sort-by-price-hi">Price (High)</label>
      </SelectionContainer>
      <SelectionContainer>
        <input
          type="radio"
          id="sort-by-price-low"
          name="sort-type"
          value="priceLow"
          checked={sort === "priceLow"}
          readOnly
        />
        <label htmlFor="sort-by-price-low">Price (Low)</label>
      </SelectionContainer>
      <SelectionContainer>
        <input
          type="radio"
          id="sort-by-rating"
          name="sort-type"
          value="rating"
          checked={sort === "rating"}
          readOnly
        />
        <label htmlFor="sort-by-rating">Rating</label>
      </SelectionContainer>
    </OptionsContainer>
  </StyledSortingWidget>
)

// Category Page

const sortingOptions = {
  name: sortByName,
  priceHigh: sortByPrice(),
  priceLow: sortByPrice(true),
  rating: sortByRating,
}

const doSort = (products, sort) => {
  if (!sort) return products
  const chosenSort = sortingOptions[sort]
  if (!chosenSort) return products
  return chosenSort(products)
}

const StylyedProductGrid = styled.div`
  margin: 0 1rem;

  & > div {
    margin-bottom: 1rem;
  }

  @media screen and (min-width: 450px) {
    display: flex;
    flex-flow: row wrap;
    margin-right: 0;

    & > div {
      flex: 0 1 calc(50% - 1rem);
      margin-right: 1rem;
    }

    @supports (display: grid) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 1rem;
      margin-right: 1rem;

      & > div {
        margin: 0;
      }
    }
  }
  @media screen and (min-width: 700px) {
    & > div {
      flex: 0 1 calc(33% - 1rem);
    }

    @supports (display: grid) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

const CategoryPage = ({ title, products, sort, changeSort }) => (
  <>
    <h2>{title}</h2>
    <SortingWidget sort={sort} changeSort={changeSort} />

    {/* Sort the products by the preferred option, if possible */}
    <StylyedProductGrid>
      {doSort(products, sort).map((p, i) => (
        <ProductCardVert key={p.fields.slug || i} product={p.fields} />
      ))}
    </StylyedProductGrid>
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

function sortByPrice(lowFirst = false) {
  return (products) => {
    // Sorting by name first makes the sort order consistent.
    // Could probably stand to use a cleaner method,
    // but this will work for the sample.
    const sorted = sortByName(products).sort((a, b) => {
      const {
        fields: { price: priceA },
      } = a
      const {
        fields: { price: priceB },
      } = b
  
      return priceA < priceB ? -1 : 1
    })
  
    return lowFirst ? sorted : sorted.reverse()
  }
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
