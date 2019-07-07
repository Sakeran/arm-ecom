import React from "react"

import ProductCardVert from "./productCardVert"

const CategoryPage = ({ title, products }) => (
  <>
    <h2>{title}</h2>
    <div>
      {products.map(p => (
        <ProductCardVert product={p.fields} />
      ))}
    </div>
  </>
)

export default CategoryPage
