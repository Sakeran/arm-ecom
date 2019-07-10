/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")

// We expect 80 different 'products' in our faker data, and
// want to assign product types equally. Use this to track
// our current state.
let productCount = 0
function getProductType() {
  const count = productCount++
  if (count < 20) return "phone"
  if (count < 40) return "laptop"
  if (count < 60) return "watch"
  if (count < 80) return "camera"
}

// Process the nodes from the faker plugin to add some additional data.
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "Products") {
    // Product Type

    const productType = getProductType()
    actions.createNodeField({
      node,
      name: "type",
      value: productType,
    })

    // Company Name
    actions.createNodeField({
      node,
      name: "companyName",
      value: node.company.companyName,
    })

    // Product Price
    actions.createNodeField({
      node,
      name: "price",
      value: getProductPrice(productType),
    })

    // Rating (1-10)
    actions.createNodeField({
      node,
      name: "rating",
      value: 1 + Math.floor(Math.random() * 10),
    })

    // Image (1-5) - We'll have five sample images per product category
    actions.createNodeField({
      node,
      name: "imageID",
      value: 1 + Math.floor(Math.random() * 5),
    })

    // Product Name
    // The faker data gives us product names with three words.
    // For whatever reason, products with two words sound
    // more tech-y (by a very loose standard),
    // so we'll just pick out two at random.
    const leaveOut = Math.floor(Math.random() * 3)
    const name = node.commerce.productName
      .split(" ")
      .map((w, i) => (i !== leaveOut ? w : ""))
      .filter(w => !!w)
      .join(" ")

    actions.createNodeField({
      node,
      name: "productName",
      value: name,
    })

    // Product Slug
    // ( Product name + random number [1..10] )
    const slug =
      name
        .split(" ")
        .map(p => p.toLowerCase())
        .join("-") +
      "-" +
      (1 + Math.floor(Math.random() * 10)).toString()
    actions.createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

// Determine a dollar price based on the type of product.
// Limit to increments of 50, - 1
// Laptops - 399-1599
// Phones - 199-999
// Cameras - 59 - 399
// Watches - 49 - 200
function getProductPrice(type) {
  function minMaxBy50s(min, max) {
    const fMin = Math.floor(min / 50)
    const fMax = Math.floor(max / 50)
    return (fMin + Math.floor(Math.random() * (1 + fMax - fMin))) * 50
  }

  switch (type) {
    case "laptop":
      return minMaxBy50s(400, 1600) - 1
    case "phone":
      return minMaxBy50s(200, 1000) - 1
    case "camera":
      return minMaxBy50s(50, 400) - 1
    case "watch":
      return minMaxBy50s(50, 200) - 1
    default:
      return 1
  }
}

// Product Pages

exports.createPages = ({ graphql, actions }) => {
  return graphql(`
    query {
      allProducts {
        nodes {
          fields {
            slug
            type
          }
        }
      }
    }
  `).then(result => {
    const products = result.data.allProducts.nodes
    products.forEach(({ fields: { slug, type } }) => {
      actions.createPage({
        path: slug,
        component: path.resolve("./src/templates/product.js"),
        context: { slug, type },
      })
    })
  })
}
